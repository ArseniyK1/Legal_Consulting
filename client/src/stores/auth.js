import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import axios from "axios";
import { normaliseDate } from "src/helpers/format";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: localStorage.getItem("user-token") || "",
    type: localStorage.getItem("user-login") || "test",
    userName: localStorage.getItem("user-name") || "",
    profile: localStorage.getItem("user-profile") || "",
    roles: localStorage.getItem("user-role") || "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.type === "admin",
    getToken: (state) => state.token,
    getUserId: (state) => state.userId,
    getProfile: (state) => state.profile,
    getRole: (state) => state.roles,
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
        localStorage.setItem("user-role", _data.role);
        localStorage.setItem("user-profile", JSON.stringify(_data));
        this.roles = _data.role;
        return _data;
      } catch (e) {
        // Notify.create({
        //   type: "negative",
        //   color: "secondary",
        //   message: "Ошибка загрузки профиля",
        // });
        console.log(e);
      }
    },
    async logout() {
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-name");
      localStorage.removeItem("user-login");
      localStorage.removeItem("user-role");
      localStorage.removeItem("user-profile");
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
      date_of_birth
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
      localStorage.setItem("user-token", access_token?.access_token);
      localStorage.setItem("user-login", data?.login);
      localStorage.setItem("user-name", data?.first_name);
      this.token = access_token?.access_token;
      this.router.push("/main");
    },
  },
});
