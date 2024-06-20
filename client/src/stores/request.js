import { api } from "boot/axios";
import { defineStore } from "pinia";
import { Loading, Notify } from "quasar";
import axios from "axios";

export const useRequestStore = defineStore({
  id: "request",
  state: () => ({
    openRequests: [],
    myRequests: [],
    requests: [],
    requestInfo: {},
  }),
  getters: {
    getOpenRequests: (state) => state.openRequests,
    getRequestInfo: (state) => state.requestInfo,
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
    async doneRequest(lawyerId, requestId, issue, article) {
      try {
        const { data } = await api({
          url: "api/request/doneRequest",
          method: "patch",
          data: {
            lawyerId,
            requestId,
            issue,
            article,
          },
        });
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
    async confirmSuggestedTime(requestId) {
      try {
        const { data } = await api({
          url: "api/request/confirmSuggestedTime",
          method: "patch",
          params: { requestId },
        });
        return data;
      } catch (e) {
        console.log(e);
      }
      // this.openRequests = data;
    },
    async rejectDateMeeting(requestId) {
      try {
        const { data } = await api({
          url: "api/request/rejectDateMeeting",
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
    async getProposedRequest() {
      try {
        const { data } = await api({
          url: "api/request/getProposedRequest",
          method: "get",
        });
        return data;
      } catch (e) {
        console.log(e);
      }
      // this.openRequests = data;
    },
    async proposedLawyer(lawyerId, requestId) {
      try {
        const { data } = await api({
          url: "api/request/proposedRequest",
          method: "patch",
          params: { lawyerId, requestId },
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
        this.requestInfo = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteRequest(id) {
      try {
        const { data } = await api({
          url: `api/request/${id}`,
          method: "delete",
        });
        this.$router.go(0);
        this.requests = this.requests.filter((item) => item.id !== id);
        return data;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchMyRequestsByLawyerId() {
      try {
        const { data } = await api({
          url: `api/request/fetchMyRequests`,
          method: "get",
        });
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
