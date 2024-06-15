<template>
  <q-page-container style="padding: 0 !important" class="overflow-hidden">
    <scroll-area>
      <div class="q-mt-md">
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
                <div class="text-h6">{{ `Дело №${caseItem.id}` }}</div>
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
      <main-dialog v-model="dialogOpen" width="50%" title="Добавление дела">
        <q-card class="bg-transparent" style="box-shadow: none">
          <q-card-section>
            <q-form @submit="addCase">
              <q-input
                v-model="newCase.title"
                label="Название"
                rounded
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
                class="q-pa-md"
              />
              <q-input
                v-model="newCase.description"
                label="Описание"
                type="textarea"
                rounded
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
                class="q-pa-md"
              />
              <q-input
                v-model="newCase.date"
                label="Дата"
                mask="date"
                :rules="['date']"
                rounded
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
                class="q-pa-md"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="newCase.date"
                        @input="() => $refs.qDateProxy.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <div class="q-mt-md">
                <q-btn label="Добавить" type="submit" color="primary" />
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
const newCase = ref({
  title: "",
  description: "",
  date: "",
});
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

function addCase() {
  cases.value.push({ ...newCase.value, id: Date.now() });
  closeDialog();
  $q.notify({
    message: "Дело успешно добавлено",
    type: "positive",
  });
}

onMounted(async () => {
  await caseStore.getAllCase();
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
