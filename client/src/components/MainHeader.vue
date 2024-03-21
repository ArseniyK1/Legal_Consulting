<template>
  <q-toolbar class="flex justify-between">
    <div class="row">
      <q-btn
        class="burger-button q-mt-sm"
        @click="toggleLeftDrawer"
        aria-label="Menu"
        color="primary"
        dense="dense"
        flat="flat"
        icon="menu"
        round="round"
      ></q-btn>
      <div class="col q-ml-sm">
        <q-toolbar-title
          class="q-pt-xs text-h6 montserrat-medium gradient-logo"
          @click="$router.push('/')"
          style="cursor: pointer; max-width: 165px"
          v-if="$q.screen.gt.xs"
          >UniLecta</q-toolbar-title
        >
        <div
          class="text-caption text-secondary montserrat-medium"
          style="margin-top: -10px; background: fff"
          v-if="$q.screen.gt.xs"
        >
          {{ version }}
        </div>
      </div>
    </div>
    <div class="q-mx-md" style="flex: 1 1 200px; max-width: 600px">
      <q-input
        class="q-mx-md"
        @blur="search = $route.query ? $route.query.search : ''"
        dense="dense"
        bg-color="secondary"
        outlined="outlined"
        placeholder="Поиск"
        rounded="rounded"
        shadow-text="  Для поиска нажмите Enter"
        v-model="search"
        ><template v-slot:prepend
          ><transition
            :duration="100"
            appear="appear"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
            ><q-icon key="iconSearch" name="search" v-if="!search"></q-icon
            ><q-icon
              class="cursor-pointer"
              @click.stop="clearSearch"
              key="iconClear"
              name="times"
              v-else
            ></q-icon></transition
        ></template>
      </q-input>
    </div>
    <q-btn class="q-mr-sm" flat="flat" round="round">
      <q-avatar class="avatar-button" style="background: #f06543">
        <q-icon name="person"></q-icon>
        <q-menu
          :offset="[22, 6]"
          square="square"
          style="
            border-radius: 0 0 0px 10px;
            border: 1.5px solid #e0e0e0;
            box-shadow: none;
            z-index: 999;
          "
          transition-duration="100"
          transition-hide="slide-up"
          transition-show="slide-down"
        >
          <q-list bordered separator style="max-width: 318px">
            <q-item @click="goToProfile" clickable="clickable" v-ripple>
              <q-item-section avatar="avatar">
                <q-icon color="secondary" name="user"></q-icon>
              </q-item-section>
              <q-item-section>Открыть профиль</q-item-section>
            </q-item>
            <q-separator></q-separator>
            <q-separator></q-separator>
            <q-item @click="logout" clickable="clickable" v-ripple>
              <q-item-section avatar="avatar">
                <q-icon
                  color="secondary"
                  name="fal fa-right-from-bracket"
                ></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Выйти</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-avatar>
    </q-btn>
  </q-toolbar>
</template>
<script setup>
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
import { version as ver } from "../../package.json";

const props = defineProps({
  //Отображение меню на экране. В мобильной версии его можно скрыть
  showMenu: {
    type: Boolean,
    default: true,
  },
  //Отвечает за отображение расширенного меню. По дефолту в десктопной версии false, чтобы меню отображалось иконками
  fullWidthMenu: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:showMenu", "update:fullWidthMenu"]);

const authStore = useAuthStore();

const { logout } = authStore;

const quasar = useQuasar();
const router = useRouter();

const search = ref("");
const isFilter = ref(false);
const nameUser = ref("");
const version = ver;
const html = ref(document.documentElement);
// const profile = authStore.getProfile;
// const hasRoles = computed(() => !!profile.roles?.length);
const isMobile = computed(() => quasar.screen.lt.md);
const fullScreenIcon = computed(() =>
  quasar.fullscreen.isActive ? "fal fa-compress" : "fal fa-expand"
);

const goToProfile = () => router.push("/profile");
const toggleLeftDrawer = () => {
  if (isMobile.value) {
    emits("update:showMenu", !props.showMenu);
    return;
  }
  emits("update:fullWidthMenu", !props.fullWidthMenu);
};

//doSearch и clearSearch необходимо будет написать при появлении первых таблиц
const doSearch = () => {
  const query = search.value ? { search: search.value } : {};
  router.replace({ path: router.currentRoute.value.path, query });
};

const clearSearch = () => {
  router.replace({ path: router.currentRoute.value.path, query: {} });
  search.value = "";
};

watch(
  () => isMobile.value,
  (value) => {
    if (value) {
      emits("update:fullWidthMenu", false);
      emits("update:showMenu", false);
      return;
    }
    emits("update:showMenu", true);
    emits("update:fullWidthMenu", false);
  }
);
onMounted(async () => {
  if (isMobile.value) {
    emits("update:showMenu", false);
    emits("update:fullWidthMenu", false);
  }
  search.value = router.currentRoute.value.query.search || "";
});
</script>

<style>
.gradient-logo {
  background: linear-gradient(219deg, #fd7819 10%, #ff0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: table;
}
.avatar-button {
  transition: ease-in 0.1s;
}
.avatar-button:hover {
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.4);
  transition: ease-out 0.1s;
}
.burger-button {
  height: 25px;
  transition: linear 0.2s;
}

.red-border {
  outline: 4px solid var(--q-primary);
}
</style>
