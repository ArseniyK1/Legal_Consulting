<template>
  <q-page padding>
    <q-card
      v-if="request"
      class="my-card full-height bg-dark text-white text-h5"
      flat
    >
      <scroll-area
        ><q-card-section>
          <div class="text-h6">
            <q-btn
              color="accent"
              round
              dense
              class="cursor-inherit"
              text-color=""
              :icon="icon"
            >
            </q-btn>
            Информация о заявке №{{ request.id }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>
                  Статус:
                  <span
                    v-if="requestStatus.pending === request?.status"
                    class="text_style"
                  >
                    Ожидается отклик
                  </span>
                  <span
                    v-else-if="requestStatus.accepted === request?.status"
                    class="text_style"
                  >
                    Принята юристом в работу
                  </span>
                  <span
                    v-else-if="requestStatus.canceled === request?.status"
                    class="text_style"
                  >
                    Отменена
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>Описание проблемы: </q-item-label>
                <q-item-label class="text_style">{{
                  request.description
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item v-if="!!request.additional_inf">
              <q-item-section>
                <q-item-label>Доп. информация: </q-item-label>
                <q-item-label class="text_style">{{
                  request.additional_inf
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <!-- Add more fields as needed -->
            <div class="row">
              <div class="col-3">
                <q-item>
                  <q-item-section>
                    <q-item-label>ФИО клиента: </q-item-label>
                    <q-item-label
                      caption
                      class="text_style flex justify-between"
                      ><div>
                        {{ request.user.first_name }}
                        {{ request.user.last_name }}
                        {{ request.user.middle_name }}
                      </div>
                      <q-icon
                        :name="mdiEyeOutline"
                        class="cursor-pointer"
                        size="sm"
                      >
                        <q-tooltip>Подробная информация</q-tooltip>
                      </q-icon>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-3" v-if="request.lawyerId || request.lawyer?.id">
                <q-item>
                  <q-item-section>
                    <q-item-label>ФИО адвоката: </q-item-label>
                    <q-item-label
                      caption
                      class="text_style flex justify-between"
                      ><div>
                        {{ request.lawyer?.first_name }}
                        {{ request.lawyer?.last_name }}
                        {{ request.lawyer?.middle_name }}
                      </div>
                      <q-icon
                        :name="mdiEyeOutline"
                        class="cursor-pointer"
                        size="sm"
                      >
                        <q-tooltip>Подробная информация</q-tooltip>
                      </q-icon>
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-select
                  model-value=""
                  display-value="Привязать юриста"
                  rounded
                  class="q-mt-md"
                  bg-color="primary"
                  color="info"
                  label-color="white"
                  v-if="
                    (!request.lawyerId || !request.lawyer?.id) &&
                    (authStore.isOperator || authStore.isAdmin)
                  "
                ></q-select>
              </div>
              <div class="col-3" v-if="request.type_right?.id">
                <q-item>
                  <q-item-section>
                    <q-item-label>Отрасль права: </q-item-label>
                    <q-item-label caption class="text_style"
                      >{{ request.type_right?.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-3" v-if="request.trouble_type">
                <q-item>
                  <q-item-section>
                    <q-item-label>Тип проблемы: </q-item-label>
                    <q-item-label caption class="text_style"
                      >{{ request.trouble_type }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-4">
                <q-item>
                  <q-item-section>
                    <q-item-label>Дата консультации: </q-item-label>
                    <q-item-label caption>
                      <date-input
                        :model-value="dateMeeting"
                        @update:model-value="dateMeeting = $event"
                        :readonly="!authStore.isLawyer && !authStore.isOperator"
                        bg-color="white"
                        use-future
                      />
                      <q-input
                        v-model="time"
                        mask="time"
                        :rules="['time']"
                        label="Выберите время"
                        class="q-mt-sm"
                        outlined
                        bg-color="white"
                        color="info"
                        rounded
                        label-color="dark"
                      >
                        <template v-slot:prepend>
                          <q-icon
                            name="access_time"
                            class="cursor-pointer q-mr-sm q-ml-md"
                            color="black"
                          >
                            <q-popup-proxy
                              cover
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-time v-model="time" color="info">
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Закрыть"
                                    color="info"
                                    flat
                                  />
                                </div>
                              </q-time>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-btn
                        label="Предложить выбранное время"
                        class="q-mt-sm"
                        color="accent"
                        @click="offerTime"
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-list> </q-card-section
      ></scroll-area>
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRequestStore } from "stores/request";
import { requestStatus } from "src/constants";
import {
  mdiCancel,
  mdiCheckAll,
  mdiCheckOutline,
  mdiTimerSand,
  mdiEyeOutline,
} from "@mdi/js";
import ScrollArea from "components/common/ScrollArea.vue";
import { useAuthStore } from "stores/auth";
import DateInput from "components/ui/input/DateInput.vue";
import { Notify } from "quasar";
import { formatDate } from "src/helpers/format";

const route = useRoute();
const requestStore = useRequestStore();
const authStore = useAuthStore();
const request = ref(null);
const icon = ref("");
const time = ref("10:56");
const dateMeeting = ref("2024/07/04");

const offerTime = async () => {
  if (!dateMeeting.value || !time.value) {
    // Show an error message or take appropriate action if date or time is not entered
    Notify.create({ message: "Введите дату и(или) время!", type: "negative" });
    return;
  }

  const date = new Date(dateMeeting.value);
  const [hours, minutes] = time.value.split(":").map(Number);
  date.setHours(hours, minutes, 0, 0);

  const timestamp = date.toISOString();
  const res = await requestStore.offerTime(request.value.id, timestamp);
  console.log(res);
};

onMounted(async () => {
  const reqId = +route.params.id;
  request.value = await requestStore.getInfoByReqId(reqId);
  const test = formatDate(request.value.date_meeting);
  dateMeeting.value = test;
  console.log(dateMeeting.value);

  switch (request.value.status) {
    case requestStatus.pending:
      icon.value = mdiTimerSand;
      break;
    case requestStatus.accepted:
      icon.value = mdiCheckOutline;
      break;
    case requestStatus.canceled:
      icon.value = mdiCancel;
      break;
    case requestStatus.done:
      icon.value = mdiCheckAll;
      break;
  }
});
</script>

<style>
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
