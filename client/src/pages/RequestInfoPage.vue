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
                  </span>
                  <span
                    v-else-if="requestStatus.done === request?.status"
                    class="text_style"
                  >
                    Завершена
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
                        @click="infoUser = true"
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
                        @click="infolawyer = true"
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
                  authStore.isLawyer &&
                  !!!request.date_meeting &&
                  !!!request.suggested_date_meeting &&
                  (request.lawyerId === authStore.getIdUser ||
                    request.lawyer?.id === authStore.getIdUser)
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
                      <!--                      <q-btn-->
                      <!--                        label="Согласиться с предложенным временем"-->
                      <!--                        v-if="authStore.isUser && !!request.date_meeting"-->
                      <!--                        class="q-mt-sm"-->
                      <!--                        color="accent"-->
                      <!--                        @click="offerTime"-->
                      <!--                      />-->
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div
                class="col-6"
                v-if="
                  !!!request.date_meeting &&
                  !!request.suggested_date_meeting &&
                  authStore.isUser
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
                    Юриcт предложил дату консультации!
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
                  <q-item-section
                    class="q-mt-xl flex justify-end items-end bg-dark"
                  >
                    <q-item-label caption class="flex justify-between">
                      <q-btn
                        rounded
                        label="Согласиться"
                        color="positive"
                        class="q-pa-sm"
                        @click.prevent="confirmSuggestedTime"
                      />
                      <q-btn
                        rounded
                        label="Отклонить"
                        class="q-ml-md q-pa-sm"
                        color="negative"
                        @click="rejectDateMeeting"
                      />
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div
                class="col-3"
                v-if="
                  (authStore.isLawyer || authStore.isOperator) &&
                  !!request.user?.phonenumber?.length &&
                  request.lawyer?.phonenumber === 'null'
                "
              >
                <div class="col-4" v-if="authStore.isLawyer">
                  <q-item>
                    <q-item-section>
                      <q-item-label>Телефон клиента: </q-item-label>
                      <q-item-label caption class="text_style">{{
                        request.user.phonenumber
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
              <div
                class="col-3"
                v-if="authStore.isUser && showPhoneNumberLawyer"
              >
                <q-item>
                  <q-item-section>
                    <q-item-label>Телефон юриста: </q-item-label>
                    <q-item-label caption class="text_style">{{
                      request.lawyer?.phonenumber
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
              <div class="col-6" v-if="!!request.date_meeting">
                <q-item
                  class="bg-warning text-black q-ma-md"
                  style="border-radius: 1rem"
                  ><q-item-section
                    ><q-item-label
                      class="text_style text-bold text-center"
                      v-if="request.lawyer?.contact_email"
                      >{{
                        `Почта юриста: ${request.lawyer?.contact_email}`
                      }}</q-item-label
                    >
                    <q-item-label
                      class="text_style text-center text-h1 q-pa-xl text-bold"
                    >
                      За один час до консультации появится номер телефона
                      юриста!
                    </q-item-label>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label
                      >Утвержденная дата консультации:
                    </q-item-label>
                    <q-item-label caption class="text_style"
                      >{{ normaliseDate(request.date_meeting) }}
                    </q-item-label> </q-item-section
                  ><q-item-section>
                    <q-item-label
                      >Утвержденное время консультации:
                    </q-item-label>
                    <q-item-label caption class="text_style"
                      >{{
                        new Date(request.date_meeting).toLocaleTimeString(
                          "en-US",
                          {
                            hour12: false,
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-list>
        </q-card-section></scroll-area
      >
    </q-card>
    <main-dialog
      v-model="infolawyer"
      title="Информация о юристе"
      width="1300px"
    >
      <lawyer-info-card :data="request?.lawyer" />
    </main-dialog>
    <main-dialog v-model="infoUser" title="Информация о клиенте" width="1300px">
      <lawyer-info-card :data="request?.user" />
    </main-dialog>
    <main-dialog
      v-model="solutionDialog"
      title="Выложить решение"
      width="900px"
    >
      <q-card>
        <q-card-section>
          <q-form @submit="submitForm">
            <q-input
              v-model="issue"
              label="Решение"
              color="info"
              type="textarea"
            />
            <q-input v-model="article" label="Статья" color="info" />

            <q-card-actions align="right">
              <q-btn label="Отмена" color="negative" v-close-popup />
              <q-btn
                label="Выложить"
                type="submit"
                color="positive"
                v-close-popup
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </main-dialog>
    <q-btn
      v-if="showSolutionButton && authStore.isLawyer && request.active"
      label="Выложить решение"
      class="q-ma-xl absolute-bottom-right"
      color="accent"
      @click="openSolutionDialog"
    />
  </q-page>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
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
import MainDialog from "components/ui/dialog/MainDialog.vue";
import LawyerInfoCard from "components/ui/cards/LawyerInfoCard.vue";

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
const infolawyer = ref(false);
const infoUser = ref(false);
const showPhoneNumber = ref(false);
const showPhoneNumberLawyer = ref(false);
const showSolutionButton = ref(false);
const solutionDialog = ref(false);
const issue = ref("");
const article = ref("");

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
  date.setMinutes(minutes);
  const timestamp = date.toISOString();
  const res = await requestStore.offerTime(request.value.id, timestamp);
  const reqId = +route.params.id;
  await requestStore.getInfoByReqId(reqId);
  if (!!res?.request) {
    request.value = requestStore.getRequestInfo.request;
  } else {
    request.value = requestStore.getRequestInfo;
  }
  Notify.create("Вы успешно предложили время");
};
async function submitForm() {
  await requestStore.doneRequest(
    request.value.lawyerId,
    request.value.id,
    issue.value,
    article.value
  );
  await this.$router.push({ name: "requests" });
  Notify.create({ message: "Заявка успешно завершена" });
}
function isConsultationDue(consultationDate) {
  console.log(request.value);
  if (consultationDate === null) {
    throw new Error("Дата консультации не может быть null");
  }
  const consultation = new Date(consultationDate);
  const current = new Date();
  const diff = consultation.getTime() - current.getTime();
  console.log(diff < 3600000);
  if (diff < 3600000) {
    console.log("123321313");
    return true;
  } else {
    console.log(1);
    return false;
  }
}

const confirmSuggestedTime = async () => {
  const res = await requestStore.confirmSuggestedTime(request.value.id);
  const reqId = +route.params.id;
  await requestStore.getInfoByReqId(reqId);
  if (!!res?.request) {
    request.value = requestStore.getRequestInfo.request;
  } else {
    request.value = requestStore.getRequestInfo;
  }
};
const openSolutionDialog = () => {
  solutionDialog.value = true;
};
const rejectDateMeeting = async () => {
  await requestStore.rejectDateMeeting(request.value.id);
  const reqId = +route.params.id;
  await requestStore.getInfoByReqId(reqId);
  if (!!res?.request) {
    request.value = requestStore.getRequestInfo.request;
  } else {
    request.value = requestStore.getRequestInfo;
  }
};

const unsubscribe = requestStore.$subscribe(async (mutation, state) => {
  if (mutation.type === "requestInfo") {
    const reqId = +route.params.id;
    console.log(1);
    const newRes = await requestStore.getInfoByReqId(reqId);
  }
});

const requestValueComputed = computed(() => requestStore.getRequestInfo);
watch(
  () => request.value?.suggested_date_meeting,
  (newValue) => {
    if (newValue) {
      // Update the suggestedDateMeeting value
      suggestedDateMeeting.value = formatDate(newValue);

      // Update the showPhoneNumberLawyer value
      showPhoneNumberLawyer.value = isConsultationDue(newValue);
    }
  }
);

onMounted(async () => {
  const reqId = +route.params.id;
  const res = await requestStore.getInfoByReqId(reqId);
  if (!!res?.request) {
    request.value = requestStore.getRequestInfo.request;
    proposedLawyer.value = res.proposedLawyer;
  } else {
    request.value = requestStore.getRequestInfo;
  }
  suggestedDateMeeting.value = formatDate(
    request.value?.suggested_date_meeting
  );
  dateMeeting.value = formatDate(request.value?.date_meeting);
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
  const currentTime = new Date();

  if (!!request.value.date_meeting) {
    const currentTime = new Date();
    const currentTimeUTC = Date.UTC(
      currentTime.getUTCFullYear(),
      currentTime.getUTCMonth(),
      currentTime.getUTCDate(),
      currentTime.getUTCHours(),
      currentTime.getUTCMinutes(),
      currentTime.getUTCSeconds()
    );
    const consultationTime = new Date(request.value.date_meeting);
    const consultationTimeUTC = Date.UTC(
      consultationTime.getUTCFullYear(),
      consultationTime.getUTCMonth(),
      consultationTime.getUTCDate(),
      consultationTime.getUTCHours(),
      consultationTime.getUTCMinutes(),
      consultationTime.getUTCSeconds()
    );
    const timeDifference = consultationTimeUTC - currentTimeUTC;
    if (timeDifference >= 0 && timeDifference <= 60 * 60 * 1000) {
      showPhoneNumber.value = true;
    }

    if (consultationTimeUTC <= currentTimeUTC) {
      console.log(consultationTimeUTC, currentTimeUTC);
      showSolutionButton.value = true;
    }
  } else {
    showSolutionButton.value = false;
  }
  showPhoneNumberLawyer.value = isConsultationDue(
    request.value.suggested_date_meeting
  );
});
onUnmounted(() => unsubscribe());
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
