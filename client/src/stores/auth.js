import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import axios from "axios";

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
        const { data } = await api({
          url: "http://localhost:7000/api/auth/login",
          method: "post",
          data: { username: login, password },
        });
        if (!data?.access_token) throw new Error("Ошибка авторизации");
        // console.log(data);
        const { access_token } = data;

        localStorage.setItem("user-token", access_token);

        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        this.token = access_token;

        this.router.push("/main");
        Notify.create({
          message: "Вы авторизованы",
          type: "positive",
        });
        return true;
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
        const { data } = await api({
          url: `http://localhost:7000/api/auth/profile`,
          method: "get",
        });
        const _data = { ...data };
        localStorage.setItem("user-role", _data.role);
        localStorage.setItem("user-profile", JSON.stringify(_data));
        this.roles = _data.role;
        return _data;
      } catch (e) {
        Notify.create({
          type: "negative",
          color: "secondary",
          message: "Ошибка загрузки профиля",
        });
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
      this.router.push("/login");
    },
    async registration(name, login, password, isTeacher) {
      const response = await api({
        url: "http://localhost:7000/api/user",
        method: "post",
        data: {
          login: login,
          first_name: name || null,
          password,
          isTeacher,
        },
      });
      const { data } = response;

      localStorage.setItem("user-token", data?.user?.password);
      localStorage.setItem("user-login", data?.user?.login);
      localStorage.setItem("user-name", data?.user?.first_name);
      this.token = data?.user?.password;
      this.router.push("/main");
    },
  },
});
