import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import axios from "axios";

export const useLawyerStore = defineStore({
  id: "lawyer",
  state: () => ({
    lawyers: [],
  }),
  getters: {
    getAllLawyers: (state) => state.lawyers,
  },
  actions: {
    async getAllLawyersFunc(type_law, lawyerName, organization) {
      try {
        const { data } = await api({
          url: "api/user/allLawyer",
          method: "get",
          params: { type_law, lawyerName, organization },
        });
        return data;
      } catch (e) {
        console.log(e);
      }
      // this.lawyers = allLawyers;
    },
    async getOpenRequest() {
      try {
        const { data } = await api.get("api/request/openRequest");
        return data;
      } catch (e) {
        console.log(e);
      }
      // this.lawyers = allLawyers;
    },
  },
});
