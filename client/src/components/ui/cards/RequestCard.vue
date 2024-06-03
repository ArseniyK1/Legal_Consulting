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
            :icon="requestStatus.pending === request?.status ? pending : inWork"
          >
            <q-tooltip v-if="requestStatus.pending === request?.status"
              >Выполняется</q-tooltip
            >
            <q-tooltip v-if="requestStatus.accepted === request?.status"
              >Принята юристом в работу</q-tooltip
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
          <q-icon :name="path"></q-icon>
        </div>
        {{
          `Клиент: ${request?.user?.last_name} ${request?.user?.first_name} ${request?.user?.middle_name}`
        }}
      </a>
      <div class="text-h6" v-if="request?.lawyerId || request?.lawyer?.id">
        <div class="text-h5" v-if="request?.lawyerId && authStore.isAdmin">
          {{ `ID юриста:${request?.lawyerId}` }}
        </div>
        <div v-else>
          {{
            `Юрист: ${request?.user?.last_name} ${request?.user?.first_name} ${request?.user?.middle_name}`
          }}
        </div>
      </div>
    </q-card-section>

    <q-separator color="primary" />

    <q-card-actions>
      <q-btn flat class="bg-accent" @click="actionOne">Открыть</q-btn>
      <q-btn
        flat
        class="bg-accent"
        @click="actionTwo"
        v-if="request.status === 'pending'"
        >Удалить</q-btn
      >
      <q-btn
        flat
        class="bg-accent"
        @click="actionThree"
        v-if="authStore.isLawyer && !request.active"
        >Откликнуться</q-btn
      >
      <q-btn
        flat
        class="bg-accent"
        @click="actionThree"
        v-if="authStore.isOperator"
        >Привязать юриста</q-btn
      >
      <q-btn flat class="bg-accent" @click="actionThree" v-if="authStore.isUser"
        >Оставить отзыв</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { requestStatus, rolesValue } from "src/constants";
import { useAuthStore } from "stores/auth";
import { mdiTimerSand, mdiCheckOutline } from "@mdi/js";

const authStore = useAuthStore();
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  actionOne: {
    type: Function,
    default: null,
  },
  actionTwo: {
    type: Function,
    default: null,
  },
  status: {
    type: String,
    default: "Открытая",
  },
  request: {
    type: Object,
    default: () => {},
  },
});
const inWork = mdiCheckOutline;
const pending = mdiTimerSand;
</script>
