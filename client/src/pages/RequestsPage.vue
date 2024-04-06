<template>
  <q-page-container style="padding: 0 !important" class="overflow-hidden"
    >Заявки
    <div>
      {{ requests }}
    </div>
  </q-page-container>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRequestStore } from "stores/request";

// INJECTABLE
const requestStore = useRequestStore();
// INJECTABLE

// REFS
const requests = ref([]);
// REFS

// LIFECYCLE HOOKS
onMounted(async () => {
  requests.value = await requestStore.getMyRequests();
});
onUnmounted(() => {
  requests.value = [];
});
</script>
