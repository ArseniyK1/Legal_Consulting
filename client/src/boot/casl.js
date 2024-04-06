import { abilitiesPlugin } from "@casl/vue";
import { useAuthStore } from "../stores/auth";
import { Ability } from "@casl/ability";

export default ({ app, store }) => {
  const authStore = useAuthStore(store);
  const abilities = JSON.parse(authStore.getAbilities);
  app.use(abilitiesPlugin, new Ability(abilities), {
    useGlobalProperties: true,
  });
};
