import { api } from "boot/axios";
import { defineStore } from "pinia";
import { normaliseDate } from "src/helpers/format";

export const useTypeRightsStore = defineStore({
  id: "typeRights",
  state: () => ({}),
  getters: {},

  actions: {
    async createTypeRights(name, description, icon, type_trouble) {
      const { data } = await api.post("api/type-right/create", {
        name,
        description,
        icon,
        type_trouble,
      });
    },
    async getAllTypeRights() {
      try {
        const { data } = await api.get("api/type-right");
        return data;
      } catch (e) {
        console.log(e);
      }
      // this.lawyers = allLawyers;
    },
  },
});
