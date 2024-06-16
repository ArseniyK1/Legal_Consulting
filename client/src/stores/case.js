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
    async getMyCase() {
      try {
        const { data } = await api.get("api/case/myCases");
        this.cases = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async addCase(number, issue, description, article) {
      try {
        const { data } = await api({
          method: "post",
          url: "api/case",
          data: {
            number,
            issue,
            description,
            article,
          },
        });
        this.cases = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteCase(id) {
      try {
        const { data } = await api.delete(`api/case/${id}`);
        this.cases = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async getCasesByLawyer(id) {
      try {
        const { data } = await api.get(`api/case/lawyer/${id}`);
        this.cases = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
