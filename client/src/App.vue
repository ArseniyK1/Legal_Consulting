<template>
  <router-view />
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

onBeforeMount(async () => {
  try {
    const testToken = await authStore.loadProfile();
    !testToken && (await router.push("/login"));
  } catch (e) {
    await router.push("/login");
  }
});
</script>
