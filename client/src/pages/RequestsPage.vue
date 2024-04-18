<template>
  <q-page-container style="padding: 0 !important" class="overflow-hidden"
    >Заявки
    <div
      v-for="item in requests"
      :key="item.id"
      style="width: calc(100vw - 300px); margin: 0 auto"
    >
      <request-card :title="item.description" :subtitle="item.status">
        <template v-slot:subtitle>SUBTITILE</template>
      </request-card>
    </div>
  </q-page-container>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRequestStore } from "stores/request";
import RequestCard from "components/ui/cards/RequestCard.vue";

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
