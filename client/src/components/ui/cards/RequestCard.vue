<template>
  <q-card flat bordered class="my-card bg-dark text-primary">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h5">
            Заявка №{{ request?.id }}: "{{ request.type_right?.name }}" -
            {{ !!request?.trouble_type ? `"${request?.trouble_type}"` : "" }}
          </div>
          <div class="text-subtitle2">{{ subtitle }}</div>
          <slot name="subtitle"></slot>
        </div>
        <div class="col-auto">
          <div class="inline-block q-mr-sm">Статус заявки:</div>
          <q-btn
            color="accent"
            round
            class="cursor-inherit"
            text-color=""
            :icon="icon"
          >
            <q-tooltip v-if="requestStatus.pending === request?.status"
              >Ожидается отклик</q-tooltip
            >
            <q-tooltip v-if="requestStatus.accepted === request?.status"
              >Принята юристом в работу</q-tooltip
            >
            <q-tooltip v-if="requestStatus.canceled === request?.status"
              >Отменена</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div style="max-height: 65px; overflow: hidden">
        {{ `Краткое описание заявки: ${request?.description}` }}
      </div>
      <a
        class="text-h6"
        v-if="
          request?.user?.id &&
          (authStore.isAdmin || authStore.isLawyer || authStore.isOperator)
        "
      >
        <div>
          <q-icon></q-icon>
        </div>
        {{
          `Клиент: ${request?.user?.last_name} ${request?.user?.first_name} ${request?.user?.middle_name}`
        }}
      </a>
      <div
        class="text-h6"
        v-if="(request?.lawyerId || request?.lawyer?.id) && !lawyerVisible"
      >
        <div>
          {{
            `Юрист: ${request?.lawyer?.last_name} ${request?.lawyer?.first_name} ${request?.lawyer?.middle_name}`
          }}
        </div>
      </div>
    </q-card-section>

    <q-separator color="primary" />

    <q-card-actions>
      <q-btn
        flat
        class="bg-accent"
        @click="router.push(`/requestInfo/${request.id}`)"
        >Открыть</q-btn
      >
      <q-btn
        flat
        class="bg-accent"
        @click="deleteRequest"
        v-if="
          !request.active &&
          (authStore.isUser || authStore.isOperator) &&
          !request.proposedLawyerId
        "
        >Удалить</q-btn
      >
      <q-btn
        flat
        class="bg-accent"
        @click="respondToRequest"
        v-if="
          authStore.isLawyer &&
          !request.active &&
          request.proposedLawyerId !== 0
        "
        >Откликнуться</q-btn
      >
      <q-btn
        flat
        class="bg-accent"
        @click="visibleProposed = !visibleProposed"
        v-if="
          authStore.isOperator &&
          !request.proposedLawyerId &&
          !request.active &&
          !request.lawyerId
        "
        >Привязать юриста</q-btn
      >

      <q-btn
        flat
        class="bg-accent"
        v-if="authStore.isUser && request?.status === requestStatus.done"
        >Оставить отзыв</q-btn
      >
    </q-card-actions>
  </q-card>
  <main-dialog v-model="visibleProposed" title="Выберите юриста" width="80%">
    <select-lawyer @confirm="proposedLawyer" />
  </main-dialog>
</template>

<script setup>
import { requestStatus, rolesValue } from "src/constants";
import { useAuthStore } from "stores/auth";
import { mdiTimerSand, mdiCheckOutline, mdiCancel, mdiCheckAll } from "@mdi/js";
import { useRequestStore } from "stores/request";
import { Notify } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import MainDialog from "components/ui/dialog/MainDialog.vue";
import SelectLawyer from "components/ui/cards/SelectLawyer.vue";

const authStore = useAuthStore();
const requestStore = useRequestStore();
const router = useRouter();
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "Открытая",
  },
  request: {
    type: Object,
    default: () => {},
  },
  lawyerVisible: {
    type: Boolean,
    default: false,
  },
});
const icon = ref("");
const visibleProposed = ref(false);

const respondToRequest = async () => {
  try {
    await requestStore.respondRequest(props.request.id);
    await requestStore.getInfoByReqId(props.request.id);
    // await router.push(`/requestInfo/${props.request.id}`);
    Notify.create({
      message: "Вы успешно откликнулись на заявку",
      type: "positive",
      color: "positive",
    });
  } catch (e) {
    Notify.create(e.message);
  }
};

const deleteRequest = async () => {
  await requestStore.deleteRequest(+props.request.id);

  Notify.create({ message: "Заявка успешно удалена!", type: "positive" });
};

const proposedLawyer = async (lawyer) => {
  if (!!lawyer) {
    visibleProposed.value = false;
    const res = await requestStore.proposedLawyer(lawyer.id, props.request.id);
    if (!!res) await router.push(`/requestInfo/${props.request.id}`);
  }
  // requestStore.proposedLawyer(props.request.id, lawyer.id);
};

onMounted(() => {
  switch (props.request.status) {
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
