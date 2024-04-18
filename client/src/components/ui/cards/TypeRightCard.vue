<template>
  <q-card class="my-card">
    <q-card-section class="bg-positive text-white">
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">{{ description }}</div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat>{{ type_trouble[0] }}</q-btn>
      <q-btn flat>{{ type_trouble[1] }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  type_trouble: {
    type: Array,
    default: () => [],
  },
});

// INJECTABLE
// INJECTABLE

// REFS
// REFS

// COMPUTED

// METHODS

// WATCH

// LIFECYCLE HOOKS
onMounted(async () => {
  typeRights.value = await typeRightsStore.getAllTypeRights();
});
</script>
