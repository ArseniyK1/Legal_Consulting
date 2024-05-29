<template>
  <q-card class="my-card shadow-3 column justify-between" style="height: 100%">
    <q-card-section class="bg-info text-white">
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">{{ description }}</div>
    </q-card-section>

    <q-card-section class="col q-pa-none overflow-hidden">
      <div class="q-gutter-sm scroll">
        <slot name="type-trouble"></slot>
      </div>
    </q-card-section>
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

<style scoped>
.scroll {
  overflow-y: auto;
  height: 100%;
}
</style>
