<template>
  <q-layout view="hHh lpR lFf">
    <q-header class="bg-info text-white">
      <main-header
        v-model:fullWidthMenu="fullWidthMenu"
        v-model:showMenu="showMenu"
      />
    </q-header>

    <q-drawer
      :dense="!fullWidthMenu"
      :elevated="fullWidthMenu"
      :width="220"
      :mini="!fullWidthMenu"
      mini-to-overlay
      overlay
      persistent
      v-model="showMenu"
      value="false"
    >
      <main-menu :full="fullWidthMenu" :is-mobile="isMobile" />
    </q-drawer>

    <q-page-container class="as">
      <div :style="isMobile ? '' : 'padding-left: 57px'">
        <router-view v-slot="{ Component }">
          <component
            style="height: calc(100vh - 50px)"
            class="bgDarkPage"
            :is="Component"
          ></component>
        </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import MainMenu from "components/MainMenu.vue";
import { Notify, useQuasar } from "quasar";
import MainHeader from "components/MainHeader.vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";

// INJECTABLE
const quasar = useQuasar();
const authStore = useAuthStore();
const router = useRouter();
// INJECTABLE

// REFS
const fullWidthMenu = ref(false);
const showMenu = ref(true);
// REFS

const isMobile = computed(() => quasar.screen.lt.md);

onMounted(async () => {
  if (isMobile.value) {
    showMenu.value = false;
    fullWidthMenu.value = true;
  }
  try {
    const testToken = await authStore.loadProfile();
    !testToken && (await router.push("/login"));
  } catch (e) {
    await router.push("/login");
  }
});
</script>

<style lang="scss">
.bgDarkPage {
  background: #6096ba;
}

*::-webkit-scrollbar {
  width: 6px; /* ширина scrollbar */
}
*::-webkit-scrollbar-track {
  background-color: #9a9a9a;
  width: 3px;
  opacity: 0.75;
  right: 3px;
}
*::-webkit-scrollbar-thumb {
  background-color: #555555;
  border-radius: 20px; /* закругления плашки */
}
</style>
