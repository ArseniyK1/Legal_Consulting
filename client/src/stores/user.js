import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import axios from "axios";
import { normaliseDate } from "src/helpers/format";
import { rolesValue } from "src/constants";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({}),
  getters: {},
  actions: {
    async updateInfoUser(
      first_name,
      last_name,
      middle_name,
      login,
      password,
      phonenumber,
      photo,
      date_of_birth,
      contact_email
    ) {
      try {
        Loading.show();
        const { data } = await api({
          url: "api/user",
          method: "patch",
          data: {
            first_name: first_name && first_name,
            last_name: last_name && last_name,
            middle_name: middle_name && middle_name,
            login: login && login,
            password: password && password,
            phonenumber: phonenumber && phonenumber,
            photo: photo && photo,
            date_of_birth: date_of_birth && date_of_birth,
            contact_email: contact_email && contact_email,
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
