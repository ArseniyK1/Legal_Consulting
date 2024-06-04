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
    async getAllRequests(
      status = null,
      lawyer = null,
      userName = null,
      trouble_type = null,
      additional_inf = null
    ) {
      try {
        const { data } = await api({
          url: "api/request/getAllRequests",
          method: "get",
          params: {
            status: !!status ? status : null,
            lawyer: !!lawyer ? lawyer : null,
            userName: !!userName ? userName : null,
            trouble_type: !!trouble_type ? trouble_type : null,
            additional_inf: !!additional_inf ? additional_inf : null,
          },
        });
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
    async respondRequest(requestId) {
      try {
        const { data } = await api({
          url: "api/request/respondRequest",
          method: "patch",
          params: { requestId },
        });
        return data;
      } catch (e) {
        console.log(e);
      }
      // this.openRequests = data;
    },
    async offerTime(requestId, suggested_date) {
      try {
        const { data } = await api({
          url: "api/request/offerTimeConsultation",
          method: "patch",
          data: { requestId: requestId.toString(), suggested_date },
        });
        return data;
      } catch (e) {
        console.log(e);
      }
      // this.openRequests = data;
    },
    async getInfoByReqId(id) {
      try {
        const { data } = await api({
          url: `api/request/${id}`,
          method: "get",
        });
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
