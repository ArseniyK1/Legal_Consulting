<template>
  <q-card class="my-card shadow-3" style="min-height: 300px; max-height: 600px">
    <q-card-section class="bg-grey-9 text-white">
      <div class="text-h5 q-mb-md">{{ name }}</div>
      <div class="text-subtitle1">{{ description }}</div>
    </q-card-section>

    <q-card-section
      class="q-pa-md bg-grey-10"
      style="height: 100px !important; overflow-y: auto"
    >
      <q-icon :name="icon" size="3em" class="q-mb-md" color="white" />
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
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  margin: 16px;
  height: 100%;
}

.bg-grey-10 {
  flex: 1;
  display: flex;
  flex-basis: 200px;
  padding: 0px !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.trouble-types {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 600px) {
  .my-card {
    max-width: 100%;
    margin: 8px;
  }
}
</style>
