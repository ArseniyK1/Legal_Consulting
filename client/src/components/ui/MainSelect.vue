<template>
  <q-select
    class="with-bg"
    :dense="dense"
    :disable="disable"
    :input-debounce="2000"
    :label="label"
    :loading="isLoading"
    :model-value="modelValue"
    :multiple="multiple"
    :options="options"
    :readonly="readonly"
    :use-input="!modelValue?.[inputLabel]"
    @input-value="handleSearch"
    @popup-hide="showSelect = false"
    @popup-show="showSelect = true"
    @update:model-value="updateModel"
    flat="flat"
    hide-dropdown-icon="hide-dropdown-icon"
    option-value="id"
    popup-content-class="scroll commonSelect"
    ref="commonInput"
    transition-duration="100"
    transition-hide="fade"
    transition-show="fade"
    color="info"
  >
    <template v-slot:prepend>
      <q-icon
        class="q-mr-sm"
        :class="noIconMargin ? 'q-ml-none' : 'q-ml-md'"
        :name="icon"
        v-if="$q.screen.gt.sm &amp;&amp; showIcon"
      />
    </template>
    <!--    <template v-slot:append>-->
    <!--      <slot name="append"></slot>-->
    <!--      <div-->
    <!--        class="text-body2 ellipsis"-->
    <!--        v-show="!modelValue?.[inputLabel] &amp;&amp; !!appendText?.value"-->
    <!--      >-->
    <!--        {{ appendText?.text || appendText?.value }}-->
    <!--      </div>-->
    <!--      <q-icon-->
    <!--        class="q-mr-sm cursor-pointer"-->
    <!--        @click="handleClear"-->
    <!--        name="fal fa-times"-->
    <!--        size="xs"-->
    <!--        v-show="(modelValue?.[inputLabel] || modelValue?.length) &amp;&amp; !fromMdlp &amp;&amp; !readonly"-->
    <!--      ></q-icon>-->
    <!--      <q-icon-->
    <!--        class="q-mr-sm"-->
    <!--        name="verified"-->
    <!--        color="accent"-->
    <!--        size="xs"-->
    <!--        v-show="fromMdlp"-->
    <!--      >-->
    <!--        <q-tooltip class="bg-accent text-bold">Заполнено из МДЛП</q-tooltip>-->
    <!--      </q-icon>-->
    <!--    </template>-->
    <template v-slot:selected-item="scope">
      <slot :event="scope.itemProps" :item="scope.opt" name="selected-item"
        ><span class="ellipsis" v-if="!multiple">{{
          scope?.opt?.[inputLabel]
        }}</span>
        <q-chip
          class="q-ma-xs q-mr-xs q-py-sm"
          :color="
            [
              'secondary',
              'accent',
              'positive',
              'primary',
              'purple',
              'grey',
              'teal',
              'blue',
            ][scope.index] || 'secondary'
          "
          :label="scope.opt?.[inputLabel]"
          :tabindex="scope.tabindex"
          @remove="scope.removeAtIndex(scope.index)"
          dense="dense"
          icon-remove="fal fa-times"
          outline="outline"
          removable="removable"
          text-color="secondary"
          v-else
        ></q-chip>
      </slot>
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey"
          >Отсутствуют результаты ввода</q-item-section
        >
      </q-item>
    </template>
    <template v-slot:option="scope">
      <slot
        :event="scope.itemProps"
        :item="scope.opt"
        :popupStyle="popupStyle"
        name="option"
      >
        <q-item :style="popupStyle" v-bind="scope.itemProps">
          <q-item-section>{{ scope.opt[optionLabel] }}</q-item-section>
        </q-item>
      </slot>
    </template>
    <q-tooltip :delay="300" v-if="modelValue?.[inputLabel]">{{
      modelValue?.[inputLabel]
    }}</q-tooltip>
  </q-select>
</template>

<script setup="props, emits">
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: [Object, Array],
    default: null,
  },
  label: {
    type: String,
    default: "Поле поиска",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: true,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
  path: {
    type: String,
    default: "",
  },
  params: {
    type: Object,
    default: () => ({}),
  },
  optionLabel: {
    type: String,
    default: "name",
  },
  inputLabel: {
    type: String,
    default: "name",
  },
  noIconMargin: {
    type: Boolean,
    default: false,
  },
  fromMdlp: {
    type: Boolean,
    default: false,
  },
  appendText: {
    type: Object,
    default: () => ({}),
  },
  queryName: {
    type: String,
    default: "name",
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
});
const emits = defineEmits(["update:modelValue", "mounted"]);

const isLoading = ref(false);
const options = ref([]);
const searchValue = ref("");
const showSelect = ref(false);
const debounce = ref(false);
const commonInput = ref(null);

const popupStyle = computed(
  () => "width: " + commonInput.value?.$el?.clientWidth + "px"
);
// const updateList = async () => {
//   try {
//     if (props.disable) return (isLoading.value = true);
//     const data = await commonStore.dynamicList({
//       path: props.path,
//       params: {
//         ...props.params,
//         [props.queryName]: props?.appendText?.value || searchValue.value,
//       },
//     });
//     options.value = [...data];
//   } catch (e) {
//     console.error(e);
//   } finally {
//     isLoading.value = false;
//   }
// };
const handleInput = (val) => {
  emits("update:modelValue", val);
};
const handleClear = () => {
  emits("update:modelValue", null);
};
const handleSearch = (val) => {
  searchValue.value = val;
  if (debounce.value) return;
  debounce.value = true;
  setTimeout(() => {
    // updateList();
    debounce.value = false;
  }, 700);
};
const updateModel = (val) => {
  searchValue.value = "";
  emits("update:modelValue", val);
  commonInput.value.blur();
};
const updateInputValue = (val) => {
  commonInput.value?.updateInputValue(val);
};
// defineExpose({ updateList, updateInputValue });

// watch(
//   () => props.disable,
//   () => updateList()
// );
// watch(
//   () => props.params?.division_id,
//   () => updateList()
// );
onMounted(() => {
  if (props.appendText?.value && !props.disable) commonInput.value?.showPopup();
  emits("mounted");
  // if (!props.disable) updateList();
  // this.updateAddressList()
});
</script>

<style>
.commonSelect {
  max-height: 250px;
  border-radius: 0 0 15px 15px;
  box-shadow: none;
  border: 1.5px solid #e0e0e0;
}
</style>
