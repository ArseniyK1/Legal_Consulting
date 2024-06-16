import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({}),
  getters: {},
  actions: {
    async updateInfoUser(formData) {
      try {
        Loading.show();

        const { data } = await api({
          url: "api/user",
          method: "patch",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return data;
      } catch (e) {
        Notify.create({
          message: "Ошибка обновления данных",
          caption: e?.message || "",
          type: "negative",
          color: "secondary",
        });
        console.error(e);
      } finally {
        Loading.hide();
      }
    },

    async getAllClients() {
      try {
        const { data } = await api.get("api/user");
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
