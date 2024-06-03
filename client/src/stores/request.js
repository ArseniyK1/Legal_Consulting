import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import axios from "axios";

export const useRequestStore = defineStore({
  id: "request",
  state: () => ({
    openRequests: [],
    myRequests: [],
  }),
  getters: {
    getOpenRequests: (state) => state.openRequests,
  },
  actions: {
    async getAllOpenRequests() {
      try {
        const { data } = await api.get("api/request/openRequest");
        return data;
      } catch (e) {
        console.log(e);
      }
      this.openRequests = data;
    },
    async getMyRequests() {
      try {
        const { data } = await api.get("api/request/getMyRequest");
        return data;
      } catch (e) {
        Notify.create({ message: e });
      }
      // this.openRequests = data;
    },
    async getAllRequests() {
      try {
        const { data } = await api.get("api/request/getAllRequests");
        return data;
      } catch (e) {
        Notify.create({ message: e });
      }
      // this.openRequests = data;
    },
    async createRequest(description, type_right, trouble_type) {
      try {
        const { data } = await api.post("api/request", {
          description,
          type_right,
          trouble_type,
        });
        return data;
      } catch (e) {
        console.log(e);
      }
      // this.openRequests = data;
    },
  },
});
