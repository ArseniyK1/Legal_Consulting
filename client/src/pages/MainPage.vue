<template>
  <q-page-container
    style="padding: 0 !important"
    class="overflow-hidden"
    v-if="computedRole === 'USER'"
  >
    <!--    <div-->
    <!--      class="flex justify-center items-center full-height"-->
    <!--      style="padding: 0 !important"-->
    <!--    >-->
    <!--      <q-form-->
    <!--        @submit="onSubmit"-->
    <!--        @reset="onReset"-->
    <!--        class="q-gutter-md q-pa-md request column justify-between bg-primary"-->
    <!--        ref="myForm"-->
    <!--      >-->
    <!--        <div class="column">-->
    <!--          <main-input-->
    <!--            label="Описание проблемы"-->
    <!--            v-model="description"-->
    <!--            icon="edit"-->
    <!--          />-->
    <!--        </div>-->
    <!--        <div>-->
    <!--          <q-btn label="Отправить" type="submit" color="secondary" />-->
    <!--          <q-btn-->
    <!--            label="Стереть"-->
    <!--            type="reset"-->
    <!--            color="secondary"-->
    <!--            flat-->
    <!--            class="q-ml-sm"-->
    <!--          />-->
    <!--        </div>-->
    <!--      </q-form>-->
    <!--    </div>-->
    <div
      class="row items-center q-gutter-xs q-ma-md full-width"
      style="border: 1px solid black"
    >
      <div
        class="col-shrink col-grow col-4"
        v-for="item in typeRights"
        :key="item.id"
      >
        <type-right-card
          :name="item.name"
          :description="item.description"
          :type_trouble="item.type_trouble"
        />
      </div>
    </div>
  </q-page-container>
  <q-page-container style="padding: 0 !important" class="overflow-hidden" v-else
    >asd</q-page-container
  >
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useQuasar } from "quasar";
import MainSelect from "components/ui/input/MainSelect.vue";
import DateInput from "components/ui/input/DateInput.vue";
import MainInput from "components/ui/input/MainInput.vue";
import { useAuthStore } from "stores/auth";
import { useRequestStore } from "stores/request";
import { useTypeRightsStore } from "stores/typeRight";
import TypeRightCard from "components/ui/cards/TypeRightCard.vue";

// INJECTABLE
const quasar = useQuasar();
const authStore = useAuthStore();
const requestStore = useRequestStore();
const typeRightsStore = useTypeRightsStore();
// INJECTABLE

// REFS
const name = ref(null);
const age = ref(null);
const accept = ref(false);
const myForm = ref(null);
const date = ref("");
const cost = ref("");
const role = ref("");
const description = ref("");
const typeRights = ref([]);
// REFS

// COMPUTED
const computedRole = computed({
  get: () => authStore.getRole,
  set: (val) => (role.value = val),
});
// COMPUTED

// FUNCTION
const onSubmit = () => {
  myForm.value.validate().then(async (success) => {
    if (!success) {
      quasar.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "You need to accept the license and terms first",
      });
    } else {
      const newRequest = await requestStore.createRequest(description.value);
      console.log(await requestStore.getAllOpenRequests());
      quasar.notify({
        color: "positive",
        textColor: "white",
        icon: "cloud_done",
        message: "Заяка создана!",
      });
    }
  });
};

const onReset = () => {
  name.value = null;
  age.value = null;
  accept.value = false;
};
// FUNCTION

// LIFECYCLE HOOKS
onMounted(async () => {
  computedRole.value = authStore.getRole;
  const requests = await requestStore.getAllOpenRequests();
  typeRights.value = await typeRightsStore.getAllTypeRights();
  console.log(typeRights.value);
});
onUnmounted(() => {
  computedRole.value = "";
});
</script>
<style scoped lang="scss">
.request {
  border: 0.15rem solid $accent;
  border-radius: 1rem;
  height: 30rem;
  width: 60rem;
}
</style>
