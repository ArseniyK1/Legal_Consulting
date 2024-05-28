<template>
  <q-card class="my-card shadow-3 row">
    <q-card-section class="bg-info text-white">
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">{{ description }}</div>
    </q-card-section>

    <q-card-actions align="center">
      <slot name="type-trouble"></slot>
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
</script>
