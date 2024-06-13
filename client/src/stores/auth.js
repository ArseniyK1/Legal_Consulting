import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import axios from "axios";
import { normaliseDate } from "src/helpers/format";
import { rolesValue } from "src/constants";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.getItem("user-token") || "",
    type: localStorage.getItem("user-login") || "",
    userName: localStorage.getItem("user-name") || "",
    profile: localStorage.getItem("user-profile") || "",
    roles: localStorage.getItem("user-role") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getUserId: (state) => state.userId,
    getProfile: (state) => state.profile,
    getRole: (state) => state.roles,
    isLawyer: (state) => state.roles === rolesValue.lawyer,
    isOperator: (state) => state.roles === rolesValue.operator,
    isUser: (state) => state.roles === rolesValue.user,
    isAdmin: (state) => state.type === rolesValue.admin,
    getId: (state) => state.profile,
  },
  actions: {
    async login(login, password) {
      try {
        Loading.show();
        const { data } = await api.post("api/auth/login", {
          username: login,
          password,
        });

        if (!data?.access_token) throw new Error("Ошибка авторизации");
        const { access_token } = data;

        localStorage.setItem("user-token", access_token);

        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        this.token = access_token;

        this.router.push("/main");
        await this.loadProfile();
        !!!JSON.parse(localStorage.getItem("user-profile"))?.id &&
          Notify.create({
            message: "Вы авторизованы",
            type: "positive",
          });
        return data;
      } catch (e) {
        Notify.create({
          message: "Ошибка авторизации",
          caption: e?.message || "",
          type: "negative",
          color: "secondary",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },
    async loadProfile() {
      try {
        const { data } = await api.get("api/auth/profile");
        const _data = { ...data };
        localStorage.setItem("user-role", _data.roleId.value);
        localStorage.setItem("user-profile", JSON.stringify(_data));
        this.roles = _data.roleId.value;
        return _data;
      } catch (e) {
        Notify.create({
          type: "negative",
          color: "secondary",
          message: "Ошибка загрузки профиля",
        });
        console.log(e);
      }
    },
    async logout() {
      // localStorage.removeItem("user-token");
      // localStorage.removeItem("user-name");
      // localStorage.removeItem("user-login");
      // localStorage.removeItem("user-role");
      // localStorage.removeItem("user-profile");
      localStorage.clear();
      delete api.defaults.headers.common["Authorization"];
      this.token = "";
      this.roles = "";
      this.router.push("/login");
    },
    async registration(
      name,
      lastName,
      middleName,
      login,
      password,
      isLawyer,
      date_of_birth,
      regByOperator = false
    ) {
      // Ensure date_of_birth is a Date instance
      const { data } = await api.post("api/user", {
        login: login,
        first_name: name || null,
        last_name: lastName || null,
        middle_name: middleName || null,
        password,
        isLawyer,
        date_of_birth: normaliseDate(date_of_birth),
      });
      const access_token = await this.login(login, password);
      !regByOperator &&
        localStorage.setItem("user-token", access_token?.access_token);
      !regByOperator && localStorage.setItem("user-login", data?.login);
      !regByOperator && localStorage.setItem("user-name", data?.first_name);
      !regByOperator ? (this.token = access_token?.access_token) : "";
      !regByOperator && this.router.push("/main");
    },
  },
});
