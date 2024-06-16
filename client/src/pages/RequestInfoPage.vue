<!---->
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
                    <q-item-label>ФИО юриста: </q-item-label>
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
              <div
                class="col-3"
                v-if="request.proposedLawyerId && authStore.isOperator"
              >
                <q-item>
                  <q-item-section>
                    <q-item-label>Статус подтверждения заявки: </q-item-label>
                    <q-item-label caption class="text_style"
                      >{{
                        request.proposedLawyerId === 0
                          ? `${
                              proposedLawyer.last_name
                            } ${proposedLawyer.first_name
                              .split("")[0]
                              .toUpperCase()}. ${proposedLawyer.middle_name
                              .split("")[0]
                              .toUpperCase()}. подтвердил`
                          : `${
                              proposedLawyer.last_name
                            } ${proposedLawyer.first_name
                              .split("")[0]
                              .toUpperCase()}. ${proposedLawyer.middle_name
                              .split("")[0]
                              .toUpperCase()}. пока не подтвердил`
                      }}
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
              <div
                class="col-4"
                v-if="
                  (authStore.isOperator || authStore.isLawyer) &&
                  !!!request.date_meeting &&
                  (request.lawyerId === JSON.parse(authStore.getId)?.id ||
                    request.lawyer?.id === JSON.parse(authStore.getId)?.id)
                "
              >
                <q-item>
                  <q-item-section>
                    <q-item-label>Предложить дату консультации: </q-item-label>
                    <q-item-label caption>
                      <q-input
                        v-model="suggestedDateMeeting"
                        mask="##.##.####"
                        :readonly="authStore.isUser"
                        color="info"
                        label-color="dark"
                        bg-color="white"
                        label="Выберите дату"
                        outlined
                        rounded
                      >
                        <template v-slot:append>
                          <q-icon
                            name="event"
                            class="cursor-pointer q-ml-md q-mr-sm"
                            color="dark"
                            disable
                          >
                            <q-popup-proxy
                              cover
                              class="bg-info"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="suggestedDateMeeting"
                                :locale="locale"
                                class="bg-primary"
                                color="info"
                                text-color="white"
                                mask="DD.MM.YYYY"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    label="Закрыть"
                                    color="primary"
                                    class="bg-info"
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                      <q-input
                        v-model="time"
                        mask="time"
                        :readonly="authStore.isUser"
                        label="Выберите время"
                        class="q-mt-sm"
                        outlined
                        bg-color="white"
                        color="info"
                        rounded
                        label-color="dark"
                      >
                        <template v-slot:append>
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
                              <q-time v-model="time" color="info" format24h>
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
                        v-if="authStore.isLawyer || authStore.isOperator"
                        class="q-mt-sm q-mr-sm"
                        color="accent"
                        @click="offerTime"
                      />
                      <q-btn
                        label="Согласиться с предложенным временем"
                        v-if="authStore.isUser && !!request.date_meeting"
                        class="q-mt-sm"
                        color="accent"
                        @click="offerTime"
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div
                class="col-6"
                v-if="
                  !request.date_meeting &&
                  authStore.isUser &&
                  JSON.parse(authStore.getId).id === request.user.id
                "
              >
                <q-item
                  class="flex items-center justify-center q-pa-md q-ma-md relative-position"
                  style="border: 0.2rem solid #f06543; border-radius: 1rem"
                >
                  <div
                    class="q-pl-xs q-pr-xs bg-dark"
                    style="position: absolute; top: -1rem; left: 15px"
                  >
                    Юриcт предложил дату консультации!!!
                  </div>

                  <q-item-section class="q-mt-md">
                    <q-item-label>Предложенная дата: </q-item-label>
                    <q-item-label caption class="text_style"
                      >{{ normaliseDate(request.suggested_date_meeting) }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section class="q-mt-md">
                    <q-item-label>Предложенное время: </q-item-label>
                    <q-item-label caption class="text_style">
                      {{
                        new Date(
                          request.suggested_date_meeting
                        ).toLocaleTimeString("en-US", {
                          hour12: false,
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section class="q-mt-xl flex justify-end items-end">
                    <div>
                      <q-btn
                        rounded
                        label="Подтвердить выбор"
                        color="positive"
                        @click.prevent="confirmSuggestedTime"
                      />
                    </div>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-4" v-if="!!request.date_meeting">
                <q-item>
                  <q-item-section>
                    <q-item-label
                      >Утвержденная дата консультации:
                    </q-item-label>
                    <q-item-label caption>
                      <q-input
                        v-model="dateMeeting"
                        mask="##.##.####"
                        :readonly="authStore.isUser"
                        color="info"
                        label-color="dark"
                        bg-color="white"
                        label="Выберите дату"
                        outlined
                        rounded
                      >
                        <!--                        <template v-slot:append>-->
                        <!--                          <q-icon-->
                        <!--                            name="event"-->
                        <!--                            class="cursor-pointer q-ml-md q-mr-sm"-->
                        <!--                            color="dark"-->
                        <!--                            disable-->
                        <!--                          >-->
                        <!--                            <q-popup-proxy-->
                        <!--                              cover-->
                        <!--                              class="bg-info"-->
                        <!--                              transition-show="scale"-->
                        <!--                              transition-hide="scale"-->
                        <!--                            >-->
                        <!--                              <q-date-->
                        <!--                                v-model="dateMeeting"-->
                        <!--                                class="bg-primary"-->
                        <!--                                :locale="locale"-->
                        <!--                                color="info"-->
                        <!--                                text-color="white"-->
                        <!--                                mask="DD.MM.YYYY"-->
                        <!--                              >-->
                        <!--                                <div class="row items-center justify-end">-->
                        <!--                                  <q-btn-->
                        <!--                                    v-close-popup-->
                        <!--                                    label="Закрыть"-->
                        <!--                                    color="primary"-->
                        <!--                                    class="bg-info"-->
                        <!--                                  />-->
                        <!--                                </div>-->
                        <!--                              </q-date>-->
                        <!--                            </q-popup-proxy>-->
                        <!--                          </q-icon>-->
                        <!--                        </template>-->
                      </q-input>
                      <q-input
                        v-model="dateMeetingTime"
                        mask="time"
                        :readonly="authStore.isUser"
                        label="Выберите время"
                        class="q-mt-sm"
                        outlined
                        bg-color="white"
                        color="info"
                        rounded
                        label-color="dark"
                      >
                        <!--                        <template v-slot:append>-->
                        <!--                          <q-icon-->
                        <!--                            name="access_time"-->
                        <!--                            class="cursor-pointer q-mr-sm q-ml-md"-->
                        <!--                            color="black"-->
                        <!--                          >-->
                        <!--                            <q-popup-proxy-->
                        <!--                              cover-->
                        <!--                              transition-show="scale"-->
                        <!--                              transition-hide="scale"-->
                        <!--                            >-->
                        <!--                              <q-time-->
                        <!--                                v-model="dateMeetingTime"-->
                        <!--                                color="info"-->
                        <!--                                format24h-->
                        <!--                              >-->
                        <!--                                <div class="row items-center justify-end">-->
                        <!--                                  <q-btn-->
                        <!--                                    v-close-popup-->
                        <!--                                    label="Закрыть"-->
                        <!--                                    color="info"-->
                        <!--                                    flat-->
                        <!--                                  />-->
                        <!--                                </div>-->
                        <!--                              </q-time>-->
                        <!--                            </q-popup-proxy>-->
                        <!--                          </q-icon>-->
                        <!--                        </template>-->
                      </q-input>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-list>
        </q-card-section></scroll-area
      >
    </q-card>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRequestStore } from "stores/request";
import { locale, requestStatus } from "src/constants";
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
import { date, Notify } from "quasar";
import { formatDate, normaliseDate } from "src/helpers/format";

const route = useRoute();
const requestStore = useRequestStore();
const authStore = useAuthStore();
const request = ref(null);
const icon = ref("");
const time = ref("");
const suggestedDateMeeting = ref("");
const dateMeeting = ref("");
const dateMeetingTime = ref("");
const proposedLawyer = ref({});

const offerTime = async () => {
  if (!suggestedDateMeeting.value || !time.value) {
    Notify.create({ message: "Введите дату и(или) время!", type: "negative" });
    return;
  }

  const [day, month, year] = suggestedDateMeeting.value.split(".");
  const formattedDate = `${month}/${day}/${year}`;
  const date = new Date(formattedDate);

  const [hours, minutes] = time.value.split(":").map(Number);
  date.setHours(hours);
  console.log(date);
  date.setMinutes(minutes);

  const timestamp = date.toISOString();

  console.log(timestamp);

  const res = await requestStore.offerTime(request.value.id, timestamp);
  const reqId = +route.params.id;
  request.value = await requestStore.getInfoByReqId(reqId);
};

const confirmSuggestedTime = async () => {
  await requestStore.confirmSuggestedTime(request.value.id);
  const reqId = +route.params.id;
  request.value = await requestStore.getInfoByReqId(reqId);
};

onMounted(async () => {
  const reqId = +route.params.id;
  const res = await requestStore.getInfoByReqId(reqId);
  if (!!res?.request) {
    request.value = res.request;
    proposedLawyer.value = res.proposedLawyer;
  } else {
    request.value = res;
  }
  suggestedDateMeeting.value = formatDate(
    request.value?.suggested_date_meeting
  );
  console.log("ASD", suggestedDateMeeting.value);
  dateMeeting.value =
    request.value?.date_meeting && formatDate(request.value?.date_meeting);
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

<style scoped lang="scss">
.text_style {
  font-size: 1rem;
  line-height: 15px;
  color: #000;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 10px;
  background: white;
}
.gradient-wow {
  background: linear-gradient(white, white),
    linear-gradient(130deg, #696984 10%, $info 100%);
}
</style>
