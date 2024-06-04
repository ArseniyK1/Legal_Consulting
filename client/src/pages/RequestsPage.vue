<template>
  <q-page-container style="padding: 0 !important" class="overflow-hidden">
    <scroll-area>
      <q-card v-if="authStore.isLawyer || authStore.isOperator">
        <q-tabs
          v-model="tab"
          dense
          class="text-white bg-dark"
          active-color="white"
          indicator-color="accent"
          active-bg-color="dark"
          align="justify"
        >
          <q-tab name="all" label="Все" />
          <q-tab name="myRequest" label="Мои" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="all" class="bg-secondary">
            <div class="row">
              <div class="col-4">
                <main-input
                  :icon="mdiClose"
                  dense
                  label="Имя пользователя"
                  :model-value="userInput"
                  @update:model-value="handleInputUserName"
                />
              </div>
              <div class="col-3 q-pl-sm q-pr-sm">
                <q-select
                  :options="options"
                  :icon="mdiClose"
                  dense
                  label="Статус"
                  :model-value="statusInput"
                  @update:model-value="handleInputStatus"
                  rounded
                  outlined
                  bg-color="primary"
                  color="info"
                  label-color="dark"
                />
              </div>
              <div class="col-4">
                <main-input
                  :icon="mdiClose"
                  dense
                  label="Тип проблемы"
                  :model-value="troubleTypeInput"
                  @update:model-value="handleInputTroubleType"
                />
              </div>
              <div class="col-1">
                <q-btn
                  label="Сбросить"
                  class="q-ml-md"
                  color="red-5"
                  :icon="mdiClose"
                  @click="resetFilters"
                ></q-btn>
              </div>
            </div>
            <div
              v-for="item in requests"
              :key="item.id"
              style="width: calc(100vw - 300px); margin: 1rem auto"
            >
              <request-card :request="item"> </request-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="myRequest" class="bg-secondary">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <div
        v-for="item in requests"
        v-else
        :key="item.id"
        style="width: calc(100vw - 300px); margin: 1rem auto"
      >
        <request-card :request="item"> </request-card>
      </div>
    </scroll-area>
  </q-page-container>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRequestStore } from "stores/request";
import RequestCard from "components/ui/cards/RequestCard.vue";
import { useAuthStore } from "stores/auth";
import MainInput from "components/ui/input/MainInput.vue";
import { mdiClose, mdiCancel } from "@mdi/js";
import { debounce } from "quasar";
import MainSelect from "components/ui/input/MainSelect.vue";
import { requestStatus } from "src/constants";
import ScrollArea from "components/common/ScrollArea.vue";

// INJECTABLE
const requestStore = useRequestStore();
const authStore = useAuthStore();
// INJECTABLE

// REFS
const requests = ref([]);
const tab = ref("all");
const userInput = ref("");
const statusInput = ref("");
const troubleTypeInput = ref("");
const options = ["В работе", "Ожидает отклика", "Отменена", "Завершена"];
// REFS

// FUNCTION
const handleInputUserName = (event) => {
  userInput.value = event;
};

const handleInputStatus = (event) => {
  switch (event) {
    case "В работе":
      statusInput.value = "accepted";
      break;
    case "Ожидает отклика":
      statusInput.value = "pending";
      break;
    case "Отменена":
      statusInput.value = "canceled";
      break;
    case "Завершена":
      statusInput.value = "done";
      break;
  }
};

const handleInputTroubleType = (event) => {
  troubleTypeInput.value = event;
};
const updateList = debounce(async () => {
  if (authStore.isOperator || authStore.isLawyer) {
    requests.value = await requestStore.getAllRequests(
      statusInput.value,
      null,
      userInput.value,
      troubleTypeInput.value
    );
  } else {
    requests.value = await requestStore.getMyRequests();
  }
}, 500);
const resetFilters = () => {
  statusInput.value = "";
  userInput.value = "";
  troubleTypeInput.value = "";
};
// FUNCTION

// WATCH
watch(
  () => [userInput.value, statusInput.value, troubleTypeInput.value],
  () => updateList()
);

// LIFECYCLE HOOKS
onMounted(async () => {
  if (authStore.isOperator || authStore.isLawyer) {
    requests.value = await requestStore.getAllRequests();
  } else {
    requests.value = await requestStore.getMyRequests();
  }
});
onUnmounted(() => {
  requests.value = [];
});
</script>
