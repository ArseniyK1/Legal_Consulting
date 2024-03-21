<template>
  <div class="text-h3 text-accent q-mt-none q-pt-none q-ml-md q-mb-md">
    Обьявления
  </div>
  <div class="row q-col-gutter-md">
    <div class="col-6" v-for="item in notifys" v-bind:key="item.id">
      <q-card class="my-card" flat>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Обьявление</div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ item.title }}</div>
            <div class="text-caption text-black">
              {{ item.description }}
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat>
            <q-icon name="event" class="q-mr-sm"></q-icon> ДО
            {{ item.datetime }}0 ПО МСК</q-btn
          >
          <q-btn square color="info" icon="checklist">Прочитал!</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
  <q-btn-dropdown
    class="absoluteBtn q-btn-dropdown absolute-bottom-right q-pa-md q-ma-md"
    dense
    rounded
    square
    color="accent"
    dropdown-icon="add"
    v-show="isTeacherComputed === 'TEACHER'"
  >
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md w-25"
      style="width: 40rem; background: #e6e6e6; height: 20rem"
      bordered
    >
      <q-input
        filled
        v-model="name"
        label="Название обьявления *"
        lazy-rules
        square
        color="info"
        :rules="[
          (val) => (val && val.length > 0) || 'Укажите название обьявления',
        ]"
      />

      <q-input
        v-model="date"
        filled
        type="date"
        hint="Дата мероприятия"
        color="info"
      />

      <q-input
        filled
        v-model="desc"
        label="Описание обьявления *"
        lazy-rules
        square
        color="info"
        :rules="[
          (val) => (val && val.length > 0) || 'Укажите описание обьявления',
        ]"
      />

      <div>
        <q-btn
          label="Создать"
          type="submit"
          color="accent"
          class="text-center"
        />
      </div>
    </q-form>
  </q-btn-dropdown>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "stores/auth";
import { useQuasar } from "quasar";

const authStore = useAuthStore();
const quasar = useQuasar();

const notifys = ref([
  {
    title: "Опрос",
    id: 1,
    description:
      "Уважаемые студенты! Просим пройти опрос “Мониторинг удовлетворенности качеством образовательного процесса”. Опрос анонимный.",
    datetime: "7:30",
  },
  {
    title: "Молодежь современной России",
    id: 2,
    description:
      "Просим принять участие во Всероссийском опросе “Молодежь современной России: мой взгляд на риски и возможности”. Обращаем внимание, что данный опрос полностью анонимный и не требует предоставления персональных данных. Сроки проведения Всероссийского опроса - до 31 января 2024 года. Также поделитесь ссылкой с родителями и предложите пройти опрос. Благодарим заучастие.",
    datetime: "12:30",
  },
  {
    title: "Хакатон 2024",
    id: 3,
    description: "Просим принять участие в “Хакатон в политехе 2024”",
    datetime: "16:30",
  },
]);

const isTeacher = ref("USER");
const name = ref(null);
const desc = ref(null);
const age = ref(null);
const accept = ref(false);
const date = ref(null);
const isTeacherComputed = computed(() => isTeacher.value);

const onSubmit = () => {
  notifys.value.push({
    title: name.value,
    description: desc.value,
    datetime: String(date.value),
  });
};
const onReset = () => {
  name.value = null;
  age.value = null;
  accept.value = false;
};
onMounted(() => {
  isTeacher.value = authStore.getRole;
  console.log(isTeacher.value);
});
onUnmounted(() => (isTeacher.value = "USER"));
</script>
<style>
.page {
  height: calc(100vh - 100px) !important;
  background: #21ba45;
}

.my-card {
  border: 1px solid black;
  margin-left: 15px;
}

.absoluteBtn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
