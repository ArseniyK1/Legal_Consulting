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
    async getAllLawyersFunc() {
      try {
        const { data } = await api.get("api/user/allLawyer");
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
