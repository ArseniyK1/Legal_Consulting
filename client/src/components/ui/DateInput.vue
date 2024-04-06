<template>
  <q-input
    :dense="dense"
    :disable="disable"
    :label="label"
    :model-value="modelValue"
    :readonly="readonly"
    :rules="[
      (val) => !required || (required && !!val) || 'Заполните поле',
      (val) => validateDate(val) || 'Введите корректную дату',
      (val) => validateMonth(val) || ' Доступный период для выбора - 1 месяц',
    ]"
    @update:modelValue="handleInput"
    mask="##.##.####"
    ref="dateInput"
  >
    <template v-slot:prepend>
      <q-icon
        class="q-mr-sm cursor-pointer"
        :class="iconClass"
        :disable="disable || readonly"
        name="calendar_month"
        v-if="$q.screen.gt.sm"
      >
        <q-popup-proxy
          ref="qDateProxy"
          transition-hide="scale"
          transition-show="scale"
          v-if="!disable &amp;&amp; !readonly"
        >
          <q-date
            :locale="locale"
            :model-value="modelValue"
            :options="props.useOnlyMonth ? optionFnMonth : optionFn"
            @update:modelValue="selectDate"
            mask="DD.MM.YYYY"
            minimal="minimal"
          ></q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
    <template v-slot:append>
      <q-icon
        class="q-mr-xs cursor-pointer"
        name="fal fa-calendar"
        v-if="$q.screen.lt.md &amp;&amp; !modelValue"
      >
        <q-popup-proxy
          ref="qDateProxy"
          transition-hide="scale"
          transition-show="scale"
          v-if="!disable &amp;&amp; !readonly"
        >
          <q-date
            :locale="locale"
            :modelValue="modelValue"
            @update:modelValue="selectDate"
            mask="DD.MM.YYYY"
            minimal="minimal"
          ></q-date>
        </q-popup-proxy>
      </q-icon>
      <q-icon
        class="cursor-pointer"
        @click="clearValue"
        name="fal fa-times"
        size="xs"
        v-if="!!modelValue &amp;&amp; !disable &amp;&amp; !readonly &amp;&amp; !fromMdlp &amp;&amp; clearable"
      ></q-icon>
      <q-icon
        class="q-mr-sm"
        name="verified"
        color="accent"
        size="xs"
        v-show="fromMdlp"
      >
        <q-tooltip class="bg-accent text-bold">Заполнено из МДЛП</q-tooltip>
      </q-icon>
    </template>
    <template v-slot:error="val">
      <div class="text-caption text-primary q-pt-none">{{ val }}</div>
    </template>
  </q-input>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { normaliseDate } from "src/helpers/format";
import { validateMonthBeforeCurrent } from "src/helpers/date";

const props = defineProps({
  modelValue: {
    type: String,
    default: normaliseDate(new Date().toISOString()),
  },
  disable: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "Дата",
  },
  required: {
    type: Boolean,
    default: false,
  },
  iconClass: {
    type: String,
    default: "q-ml-md",
  },
  fromMdlp: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  useFuture: {
    // Использовать даты из будущего
    type: Boolean,
    default: false,
  },
  useOnlyMonth: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["update:modelValue"]);
const locale = {
  days: "Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота".split(
    ","
  ),
  daysShort: "Вс,Пн,Вт,Ср,Чт,Пт,Сб".split(","),
  months:
    "Январь,Февраль,Март,Апрель,Май,Июнь,Июль,Август,Сентябрь,Октябрь,Ноябрь,Декабрь".split(
      ","
    ),
  monthsShort: "Янв,Фев,Мар,Апр,Май,Июн,Июл,Авг,Сен,Окт,Ноя,Дек".split(","),
  firstDayOfWeek: 1,
};

const currentDate = new Date();
const currentDateCompareFormat = currentDate
  .toLocaleDateString()
  .split(".")
  .reverse()
  .join("/");
const dateInput = ref(null);
const qDateProxy = ref(null);
const error = ref(false);

const disabled = computed(() => {
  return props.disabled || props.readonly;
});
const hasError = computed(() => {
  return dateInput.value.hasError;
});
const getCurrentDate = computed(() => {
  return normaliseDate(currentDate.toISOString());
});
const validateMonth = (val) => {
  if (props.useOnlyMonth) {
    return validateMonthBeforeCurrent(val.split(".").reverse().join("-"));
  }
  return true;
};
const optionFn = (date) => {
  if (props.useFuture) return true;
  return date <= currentDateCompareFormat;
};

const optionFnMonth = (date) => {
  if (props.useFuture) return true;
  const prev = new Date(currentDateCompareFormat);
  prev.setMonth(prev.getMonth() - 1);
  return (
    prev.toISOString().split("T")[0].replaceAll("-", "/") < date &&
    date <= currentDateCompareFormat
  );
};

const selectDate = (e) => {
  emits("update:modelValue", e);
  qDateProxy.value.hide();
};
const handleInput = (val = "") => {
  emits("update:modelValue", val);
};
const validateDate = (val) => {
  if (!val && !props.required) return true;
  if (!/^\d\d\.\d\d\.\d{4}$/.test(val)) return false;
  const dateArray = val.split(".");
  const date = new Date(+dateArray[2], dateArray[1] - 1, +dateArray[0]);
  const test = [
    addZero(date.getDate()),
    addZero(date.getMonth() + 1),
    addZero(date.getFullYear()),
  ].join(".");
  if (test === val) error.value = false;
  return test === val;
};
const addZero = (val) => {
  //Добавляет новь в начале строки с числом, если оно меньше 10. Служебный метод для validateDate
  return (val < 10 ? "0" : "") + val;
};
const clearValue = () => {
  const currentDate = new Date();
  emits("update:modelValue", normaliseDate(currentDate.toISOString()));
  dateInput.value.blur();
};

onMounted(() => {
  if (!props.required) {
    emits("update:modelValue", "");
  }
});
</script>

<style></style>
