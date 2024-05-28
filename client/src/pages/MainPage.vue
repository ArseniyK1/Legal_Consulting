<template>
  <q-page-container style="padding: 0 !important" class="overflow-hidden">
    <q-scroll-area
      style="height: 100%; max-width: 100%"
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
      ><div class="row items-center q-ma-md" style="flex: 1 1 0">
        <div
          class="col-4 q-pa-md"
          style="height: 100% !important; flex-basis: 33%"
          v-for="item in typeRights"
          :key="item.id"
        >
          <div v-if="computedRole === 'USER'" class="text-h3">USER</div>
          <div class="text-h3" v-else>LAYER</div>
          <type-right-card
            style="min-height: 300px"
            :name="item.name"
            :description="item.description"
            :type_trouble="item.type_trouble"
          >
            <template v-slot:type-trouble>
              <q-btn
                rounded
                class="bg-warning"
                :label="trouble"
                v-for="trouble in item.type_trouble"
                :key="trouble"
              ></q-btn>
            </template>
          </type-right-card>
        </div>
      </div>
    </q-scroll-area>
    <q-btn
      icon="add_circle"
      label="Создать заявку"
      rounded
      style="height: 3.5rem"
      class="absolute-bottom-right q-ma-md text-center"
      color="accent"
      @click="nickname = !nickname"
    >
      <main-dialog title="Создание заявки" v-model="nickname">
        <div
          class="flex justify-center items-center full-height q-pa-md q-ma-md"
          style="padding: 0 !important"
        >
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md q-pa-md request column justify-between bg-primary"
            ref="myForm"
          >
            <div class="column">
              <main-input
                label="Описание проблемы"
                v-model="description"
                icon="edit"
              />
              <q-select
                rounded
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
                v-model="model"
                :options="options"
                label="Filled"
              />
            </div>
            <div>
              <q-btn label="Отправить" type="submit" color="secondary" />
              <q-btn
                label="Стереть"
                type="reset"
                color="secondary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </main-dialog>
    </q-btn>
  </q-page-container>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/auth";
import { useRequestStore } from "stores/request";
import { useTypeRightsStore } from "stores/typeRight";
import TypeRightCard from "components/ui/cards/TypeRightCard.vue";
import MainDialog from "components/ui/dialog/MainDialog.vue";
import MainInput from "components/ui/input/MainInput.vue";

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
const nickname = ref(false);
const model = ref("");
const options = ref([]);
// REFS

const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#F2C037",
  width: "5px",
  opacity: 1,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#027be3",
  width: "9px",
  opacity: 0.2,
};

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
  role.value = authStore.getRole;
  const requests = await requestStore.getAllOpenRequests();
  typeRights.value = await typeRightsStore.getAllTypeRights();
  options.value = typeRights.value?.map((typeRight) => typeRight.name);
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
