<template>
  <q-scroll-area
    style="height: 100%; max-width: 100%"
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
  >
    <slot></slot>
  </q-scroll-area>
</template>

<script setup>
const thumbStyle = {
  right: "1px",
  borderRadius: "5px",
  backgroundColor: "#3f3c35",
  width: "5px",
  opacity: 1,
};

const barStyle = {
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "9px",
  opacity: 0.2,
};
</script>
