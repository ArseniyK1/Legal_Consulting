<template>
  <q-card
    flat
    bordered
    class="my-card"
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
  >
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ title }}</div>
          <div class="text-subtitle2">{{ subtitle }}</div>
          <slot name="subtitle"></slot>
        </div>
        <div class="col-auto">
          <q-btn
            color="accent"
            round
            :icon="
              status === 'Открытая' ? 'pending_actions' : 'hourglass_bottom'
            "
          >
            <q-tooltip v-if="status === 'Открытая'">Открыта</q-tooltip>
            <q-tooltip v-if="status === 'Выполняется'">Выполняется</q-tooltip>
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Удалить</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Оставить отзыв</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Поделиться</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam,
      dignissimos.
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat @click="actionOne">Действие</q-btn>
      <q-btn flat @click="actionTwo">Открыть</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
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
});
</script>
