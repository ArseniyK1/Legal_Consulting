import { api } from "boot/axios";
import { defineStore } from "pinia";
import { normaliseDate } from "src/helpers/format";

export const useOrganizationsStore = defineStore({
  id: "organizations",
  state: () => ({
    organizations: [],
  }),
  getters: {
    getOrganizations(state) {
      return state.organizations;
    },
  },
  actions: {
    async createOrganizations({
      name,
      short_name,
      address,
      contacts,
      inn,
      photo,
    }) {
      console.log(name, short_name, address, contacts, inn, photo);
      const { data } = await api.post("api/organization", {
        name,
        short_name,
        address,
        contacts,
        inn,
        photo,
      });
      const orgs = await this.getALlOrganizations();
      this.organizations = orgs;

      return data;
    },
    async getALlOrganizations(name = null, short_name = null, inn = null) {
      try {
        const { data } = await api({
          url: "api/organization",
          method: "get",
          params: {
            name: !!name ? name : null,
            short_name: !!short_name ? short_name : null,
            inn: !!inn ? inn : null,
          },
        });
        this.organizations = data;
        return data;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
