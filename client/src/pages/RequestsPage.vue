<template>
  <q-page-container style="padding: 0 !important" class="overflow-hidden">
    <q-scroll-area
      style="height: 100%; max-height: 100%"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <div
        v-for="item in requests"
        :key="item.id"
        style="width: calc(100vw - 300px); margin: 1rem auto"
      >
        <request-card :request="item"> </request-card>
      </div>
    </q-scroll-area>
  </q-page-container>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRequestStore } from "stores/request";
import RequestCard from "components/ui/cards/RequestCard.vue";
import { useAuthStore } from "stores/auth";

// INJECTABLE
const requestStore = useRequestStore();
const authStore = useAuthStore();
// INJECTABLE

// REFS
const requests = ref([]);
// REFS

// LIFECYCLE HOOKS
onMounted(async () => {
  if (authStore.isOperator) {
    requests.value = await requestStore.getAllRequests();
  } else {
    requests.value = await requestStore.getMyRequests();
  }
});
onUnmounted(() => {
  requests.value = [];
});
</script>
