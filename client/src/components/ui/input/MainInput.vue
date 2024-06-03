<template>
  <q-input
    :dense="dense"
    :input-class="inputClass"
    :label="label"
    :lazy-rules="lazyRules"
    :readonly="readonly"
    :rules="rules"
    :type="type"
    v-model="value"
    rounded
    outlined
    bg-color="primary"
    color="info"
    label-color="dark"
  >
    <template v-slot:error>
      <slot name="error"></slot>
    </template>
    <template v-slot:append>
      <slot name="append"></slot>
      <q-icon
        :style="modelValue ? 'opacity: 1' : 'opacity: 0'"
        @click="clear"
        :name="icon"
        size="xs"
        style="cursor: pointer; transition: linear.2s"
      ></q-icon>
    </template>
  </q-input>
</template>

<script setup="props, emits, expose">
import { computed, onBeforeUnmount, onUnmounted } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  dense: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "Количество",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
  lazyRules: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});

const emits = defineEmits(["update:modelValue", "blur"]);

defineExpose({
  close,
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emits("update:modelValue", val);
  },
});

onUnmounted(() => {
  clear();
});

const clear = () => {
  value.value = "";
};
</script>

<style>
input[type="number"] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
