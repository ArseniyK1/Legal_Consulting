import { api } from "boot/axios";
import { defineStore } from "pinia";

export const useCaseStore = defineStore({
  id: "case",
  state: () => ({
    cases: [],
  }),
  getters: {
    getAllCases: (state) => state.cases,
  },
  actions: {
    async getAllCase() {
      try {
        const { data } = await api.get("api/case");
        this.cases = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
