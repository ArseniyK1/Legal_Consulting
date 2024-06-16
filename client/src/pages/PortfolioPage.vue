<template>
  <q-page-container style="padding: 0 !important">
    <scroll-area>
      <div class="q-mt-md" v-if="cases.length">
        <div class="row q-col-gutter-md q-ml-sm q-mr-md">
          <div v-for="caseItem in cases" :key="caseItem.id" class="col-md-12">
            <q-card class="bg-dark text-white">
              <q-card-section class="row flex items-center">
                <q-icon
                  :name="mdiBriefcase"
                  class="q-mr-sm q-mt-xs"
                  size="md"
                  color="accent"
                />
                <div class="text-h6">
                  {{
                    `Дело №${caseItem.number ? caseItem.number : caseItem.id}`
                  }}
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
        </div>
      </div>
      <div
        class="text-center full-width"
        v-else
        style="height: 90vh !important"
      >
        <div class="flex column justify-center items-center full-height">
          <q-icon :name="mdiBriefcase" class="" size="md" color="accent" />
          <div class="text-h6 text-black">Нет дел</div>
        </div>
      </div>
      <main-dialog v-model="dialogOpen" width="50%" title="Добавление дела">
        <q-card class="bg-transparent" style="box-shadow: none">
          <q-card-section>
            <q-form @submit="addCase">
              <q-input
                v-model="number"
                label="Номер дела"
                rounded
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
                class="q-pa-md"
              />
              <q-input
                v-model="description"
                label="Описание *"
                type="textarea"
                rounded
                :rules="[
                  (val) => (val && val.length > 0) || 'Это обязательно поле!',
                ]"
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
                class="q-pa-md"
              />
              <q-input
                v-model="issue"
                label="Результат *"
                rounded
                :rules="[
                  (val) => (val && val.length > 0) || 'Это обязательно поле!',
                ]"
                type="textarea"
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
                class="q-pa-md"
              />
              <q-input
                v-model="article"
                label="Статья "
                rounded
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
                class="q-pa-md"
              />

              <div class="q-mt-md q-ml-md">
                <q-btn
                  label="Добавить"
                  type="submit"
                  color="accent"
                  @click.prevent="addCase"
                />
                <q-btn
                  label="Отмена"
                  @click="closeDialog"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </main-dialog>
    </scroll-area>
    <div class="row justify-end absolute-bottom-right">
      <q-btn
        label="Добавить дело"
        color="accent"
        @click="openDialog"
        class="q-ma-md q-pa-md"
        rounded
        :icon="mdiFolderPlusOutline"
      />
    </div>
  </q-page-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import MainDialog from "components/ui/dialog/MainDialog.vue";
import ScrollArea from "components/common/ScrollArea.vue";
import { mdiFolderPlusOutline, mdiBriefcase } from "@mdi/js";
import { useCaseStore } from "stores/case";

const $q = useQuasar();
const caseStore = useCaseStore();

const dialogOpen = ref(false);

const number = ref("");
const issue = ref("");
const description = ref("");
const article = ref("");
const cases = ref([]);

function openDialog() {
  dialogOpen.value = true;
}

function closeDialog() {
  dialogOpen.value = false;
  newCase.value = {
    title: "",
    description: "",
    date: "",
  };
}

const addCase = async () => {
  const res = await caseStore.addCase(
    number.value,
    issue.value,
    description.value,
    article.value
  );

  if (!!res) {
    await caseStore.getAllCase();
    cases.value = caseStore.getAllCases;
    closeDialog();
    $q.notify({
      message: "Дело успешно добавлено",
      type: "positive",
    });
  }
};

onMounted(async () => {
  await caseStore.getMyCase();
  cases.value = caseStore.getAllCases;
});
</script>
<style scoped>
.text_style {
  font-size: 1rem;
  line-height: 15px;
  color: #000;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 10px;
  background: white;
}
</style>
