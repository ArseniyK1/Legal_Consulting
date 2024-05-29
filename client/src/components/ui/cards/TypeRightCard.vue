<template>
  <q-card
    class="my-card shadow-3 column justify-between"
    style="min-height: 300px; max-height: 600px"
  >
    <q-card-section class="bg-info text-white">
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">{{ description }}</div>
    </q-card-section>

    <q-card-section class="q-pa-none trouble-types-section">
      <div class="trouble-types">
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
</script>

<style scoped>
.my-card {
  display: flex;
  flex-direction: column;
}

.bg-info {
  flex: 0 0 auto;
}
.trouble-types-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0;
  height: 100% !important;
}

.trouble-types {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
}
</style>
