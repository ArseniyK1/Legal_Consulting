<template>
  <div class="column justify-between main-menu bg-info full-height">
    <q-list class="q-mt-md text-white">
      <q-item
        class="z-max"
        :key="index"
        :to="route"
        clickable="clickable"
        v-for="({ title, caption, route, icon }, index) in menu"
      >
        <q-item-section avatar="avatar">
          <q-icon :name="icon"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-white">{{ title }}</q-item-label>
        </q-item-section>
        <q-tooltip
          :delay="600"
          :offset="[10, 0]"
          anchor="center right"
          self="center left"
        >
          <div>{{ title }}</div>
          <div class="text-open-sans">{{ caption }}</div>
        </q-tooltip>
      </q-item>
      <q-separator v-if="full"></q-separator>
    </q-list>
    <q-slide-transition>
      <div>
        <q-separator></q-separator>
        <q-item clickable="clickable">
          <q-item-section avatar="avatar" @click="logoutHandler">
            <q-icon name="logout" color="white"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-white">Выход </q-item-label>
            <q-tooltip>Выйти из аккаунта</q-tooltip>
          </q-item-section>
        </q-item>
      </div>
    </q-slide-transition>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useAuthStore } from "stores/auth";
import { mdiHome, mdiFileSign, mdiAccountGroupOutline } from "@mdi/js";

const authStore = useAuthStore();

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false,
  },
  full: {
    type: Boolean,
    default: false,
  },
});

const menu = [
  {
    title: "Главная",
    caption: "Главная страница",
    icon: mdiHome,
    route: "/main/",
  },
  {
    title: "Юристы",
    caption: "Страница с юристами",
    icon: mdiAccountGroupOutline,
    route: "/lawyers/",
  },
  {
    title: "Заявки",
    caption: "Страница с заявками",
    icon: mdiFileSign,
    route: "/requests/",
  },
  {
    title: "Предметы",
    caption: "Страница с предметами",
    icon: "library_books",
    route: "/objects/",
  },
];

const logoutHandler = () => {
  authStore.logout();
};
</script>

<style>
.main-menu {
  height: calc(100vh - 51px);
}
</style>
