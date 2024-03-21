<template>
  <q-layout view="hHh lpR lFf">
    <q-header class="bg-info text-white">
      <!--      <q-toolbar>-->
      <!--        <q-btn dense flat round icon="menu" @click="showMenu = !showMenu" />-->
      <!--        <div class="text-h6 montserrat-medium q-ml-md">UniLecta</div>-->

      <!--        <q-toolbar-title> </q-toolbar-title>-->
      <!--      </q-toolbar>-->
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

    <q-page-container>
      <div :style="isMobile ? '' : 'padding-left: 57px'">
        <q-page-container>
          <router-view v-slot="{ Component }">
            <component :is="Component"></component>
          </router-view>
        </q-page-container>
      </div>
    </q-page-container>

    <!--    <q-footer elevated class="bg-grey-8 text-white">-->
    <!--      <q-toolbar> </q-toolbar>-->
    <!--    </q-footer>-->
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import MainMenu from "components/MainMenu.vue";
import { useQuasar } from "quasar";
import MainHeader from "components/MainHeader.vue";
import { useAuthStore } from "stores/auth";

const quasar = useQuasar();
const authStore = useAuthStore();

const fullWidthMenu = ref(false);
const showMenu = ref(true);
const isMobile = computed(() => quasar.screen.lt.md);

onMounted(async () => {
  if (isMobile.value) {
    showMenu.value = false;
    fullWidthMenu.value = true;
  }
  await authStore.loadProfile();
});
</script>
