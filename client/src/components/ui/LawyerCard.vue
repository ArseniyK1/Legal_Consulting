<template>
  <q-card class="my-card bg-dark" flat bordered>
    <q-img src="public/lawyer.svg" />

    <q-card-section>
      <q-btn
        fab
        color="accent"
        icon="verified"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      >
        <q-tooltip>Аккаунт подтвержден</q-tooltip>
      </q-btn>

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis text-white">{{ title }}</div>
      </div>

      <q-rating :model-value="rating" :max="5" size="32px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1 text-white">{{ subtitle }}</div>
      <div class="text-caption text-grey">
        Small plates, salads & sandwiches in an intimate setting.
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="event" class="bg-white" color="gray" />
      <q-btn flat color="primary">Подробнее</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  noLocation: {
    type: Boolean,
    default: false,
  },
  noStars: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

// REFS

// REFS
</script>
