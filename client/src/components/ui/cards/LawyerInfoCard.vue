<template>
  <div class="page-padding">
    <q-card
      v-if="data"
      class="my-card full-height bg-secondary text-white text-h5 row"
      flat
    >
      <q-card-section class="col-4">
        <q-img
          :src="computedPhoto"
          class="lawyer-image"
          style="max-height: 400px"
        />
      </q-card-section>
      <q-card-section class="col-8">
        <q-list class="row">
          <q-item class="col-3">
            <q-item-section>
              <q-item-label>Фамилия:</q-item-label>
              <q-item-label class="text_style">{{
                data.last_name
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-3">
            <q-item-section>
              <q-item-label>Имя:</q-item-label>
              <q-item-label class="text_style">{{
                data.first_name
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-3">
            <q-item-section>
              <q-item-label>Отчество:</q-item-label>
              <q-item-label class="text_style">{{
                data.middle_name
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="col-3" v-if="data.roleId?.description">
            <q-item-section>
              <q-item-label>Роль:</q-item-label>
              <q-item-label class="text_style">{{
                data.roleId?.description
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="data.date_of_birth" class="col-4">
            <q-item-section>
              <q-item-label>Дата рождения:</q-item-label>
              <q-item-label class="text_style">{{
                formattedDateOfBirth
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="data.contact_email" class="col-4">
            <q-item-section>
              <q-item-label>Email:</q-item-label>
              <q-item-label class="text_style">{{
                data.contact_email
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-if="
              data.phonenumber &&
              (authStore.isOperator ||
                +JSON.parse(authStore.getId)?.id === data.id)
            "
            class="col-4"
          >
            <q-item-section>
              <q-item-label>Телефон:</q-item-label>
              <q-item-label class="text_style">{{
                data.phonenumber
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="data.education" class="col-4">
            <q-item-section>
              <q-item-label>Образование:</q-item-label>
              <q-item-label class="text_style">{{
                data.education
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="data.work_experience" class="col-4">
            <q-item-section>
              <q-item-label>Стаж работы:</q-item-label>
              <q-item-label class="text_style">{{
                data.work_experience
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-if="data.type_law" class="col-6">
            <q-item-section>
              <q-item-label>Типы права:</q-item-label>
              <q-item-label class="text_style">
                <ul>
                  <li v-for="(type, index) in data.type_law" :key="index">
                    {{ type }}
                  </li>
                </ul>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />
      <q-card-section
        style="max-height: 400px"
        class="overflow-auto"
        v-if="cases?.length"
      >
        Портфолио
        <div v-for="caseItem in cases" :key="caseItem.id" class="col-md-12">
          <q-card class="bg-dark text-white q-my-sm">
            <q-card-section class="row flex items-center">
              <q-icon
                :name="mdiBriefcase"
                class="q-mr-sm q-mt-xs"
                size="md"
                color="accent"
              />
              <div class="text-h6">
                {{ `Дело №${caseItem.number ? caseItem.number : caseItem.id}` }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="text-bold">Суть дела:</div>
              <div class="text_style">
                {{ caseItem.description }}
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-bold">Результат:</div>
              <div class="text_style">
                {{ caseItem.issue }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useCaseStore } from "stores/case";
import { mdiFolderPlusOutline, mdiBriefcase, mdiDelete } from "@mdi/js";
import ScrollArea from "components/common/ScrollArea.vue";
import { useAuthStore } from "stores/auth";
const caseStore = useCaseStore();
const authStore = useAuthStore();
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
const cases = ref([]);
// Вычисляемое свойство для форматированной даты рождения
const formattedDateOfBirth = computed(() => {
  if (!props.data.date_of_birth) return "Неизвестно";
  const date = new Date(props.data.date_of_birth);
  return date.toLocaleDateString();
});
const computedPhoto = computed(() => {
  return props.data?.photo?.length
    ? `http://localhost:7000/uploads/${props.data?.photo}`
    : "public/lawyer.svg";
});

onMounted(async () => {
  await caseStore.getCasesByLawyer(props.data.id);
  cases.value = caseStore.getAllCases;
});
</script>

<style scoped>
.my-card {
  max-width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
}

.lawyer-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-right: 20px;
}

.text_style {
  font-size: 1rem;
  line-height: 1.5;
  color: #000;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 10px;
  background: white;
  margin-top: 5px;
  text-align: left;
}
</style>
