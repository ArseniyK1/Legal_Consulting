<template>
  <div
    class="flex justify-between main-menu bg-info"
    style="flex-direction: column"
  >
    <q-list class="q-mt-md" style="color: white">
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
    icon: "home",
    route: "/main/",
  },
  {
    title: "Лекции",
    caption: "Страница с курсами",
    icon: "school",
    route: "/lectures/",
  },
  {
    title: "Обьявления",
    caption: "Страница с обьявлениями",
    icon: "notifications",
    route: "/notify/",
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
