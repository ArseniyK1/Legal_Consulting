<template>
  <q-page-container style="padding: 0 !important" class="overflow-hidden">
    <div class="row full-height">
      <div class="absolute-bottom-right q-mr-md q-mb-sm" style="z-index: 111">
        <q-btn-dropdown
          rounded
          label="Показать фильтры"
          class="q-pa-md"
          color="accent"
        >
          <div
            class="q-gutter-md full-height flex column justify-start q-pa-lg"
          >
            <main-input
              :icon="mdiClose"
              dense
              label="Имя пользователя"
              :model-value="userInput"
              @update:model-value="handleInputUserName"
            />
            <q-select
              :options="options"
              :icon="mdiClose"
              dense
              label="Статус"
              :option-label="
                (opt) => (Object(opt) === opt && 'id' in opt ? opt.name : '')
              "
              v-model="statusInput"
              rounded
              outlined
              bg-color="primary"
              color="info"
              label-color="dark"
            >
            </q-select>
            <main-input
              :icon="mdiClose"
              dense
              label="Тип проблемы"
              :model-value="troubleTypeInput"
              @update:model-value="handleInputTroubleType"
            />
            <q-btn
              label="Сбросить"
              class="q-ml-md"
              color="red-5"
              :icon="mdiClose"
              @click="resetFilters"
            ></q-btn>
          </div>
        </q-btn-dropdown>
      </div>
      <div class="col-12">
        <scroll-area>
          <q-card v-if="authStore.isLawyer || authStore.isOperator">
            <q-tabs
              v-model="tab"
              dense
              class="text-black bg-primary"
              active-color="black"
              indicator-color="accent"
              active-bg-color="primary"
              align="justify"
            >
              <q-tab
                name="all"
                label="Все заявки"
                v-if="authStore.isOperator"
              />
              <q-tab
                name="myRequest"
                label="Мои заявки"
                v-if="authStore.isLawyer"
              />
              <q-tab
                name="pendingConfirm"
                label="Ожидающие подтверждения"
                v-if="authStore.isLawyer"
              />
            </q-tabs>
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="all" class="bg-secondary">
                <div
                  v-for="item in requests"
                  :key="item.id"
                  style="width: calc(100% - 32px); margin: 1rem auto"
                >
                  <request-card :request="item"> </request-card>
                </div>
              </q-tab-panel>

              <q-tab-panel name="myRequest" class="bg-secondary">
                <div
                  v-for="item in myRequest"
                  :key="item.id"
                  style="width: calc(100% - 32px); margin: 1rem auto"
                >
                  <request-card :request="item" lawyer-visible> </request-card>
                </div>
              </q-tab-panel>
              <q-tab-panel name="pendingConfirm" class="bg-secondary"
                ><div
                  v-for="item in requests"
                  :key="item.id"
                  style="width: calc(100% - 32px); margin: 1rem auto"
                >
                  <request-card :request="item"> </request-card></div
              ></q-tab-panel>
            </q-tab-panels>
          </q-card>
          <div
            v-for="item in requests"
            v-else
            :key="item.id"
            style="width: calc(100% - 32px); margin: 1rem auto"
          >
            <request-card :request="item"> </request-card>
          </div>
        </scroll-area>
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, ref, watch } from "vue";
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
const tab = ref("");
const userInput = ref("");
const statusInput = ref("");
const troubleTypeInput = ref("");
const visibleFilter = ref(false);
const options = [
  { id: 1, name: "В работе", dbName: requestStatus.accepted },
  { id: 2, name: "Ожидает отклика", dbName: requestStatus.pending },
  { id: 3, name: "Отменена", dbName: requestStatus.canceled },
  { id: 4, name: "Завершена", dbName: requestStatus.done },
];
const myRequest = ref([]);
// REFS

// FUNCTION
const handleInputUserName = (event) => {
  userInput.value = event;
};

const handleInputTroubleType = (event) => {
  troubleTypeInput.value = event;
};

const updateAllRequests = debounce(async () => {
  requests.value = await requestStore.getAllRequests(
    statusInput.value?.dbName,
    null,
    userInput.value,
    troubleTypeInput.value
  );
}, 500);

const updateMyRequests = debounce(async () => {
  myRequest.value = await requestStore.fetchMyRequestsByLawyerId();
}, 500);

const updateList = () => {
  if (tab.value === "all") {
    updateAllRequests();
  } else if (tab.value === "myRequest") {
    updateMyRequests();
  }
};

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
  myRequest.value = await requestStore.fetchMyRequestsByLawyerId();
});
onBeforeMount(() => {
  authStore.isLawyer ? (tab.value = "myRequest") : (tab.value = "all");
});
onUnmounted(() => {
  requests.value = [];
});
</script>
