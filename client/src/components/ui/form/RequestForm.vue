<!---->
<template>
  <div
    class="flex justify-center items-center full-height"
    style="height: 700px !important"
  >
    <q-form
      @submit="onSubmit"
      class="q-gutter-md q-pa-md request column justify-between"
      ref="myForm"
      style="width: 100% !important; height: 100%"
    >
      <scroll-area>
        <div class="row">
          <div class="col-4" v-if="authStore.isOperator">
            <q-select
              v-model="clientName"
              label="Выберите пользователя"
              rounded
              outlined
              :options="allClients"
              :option-label="
                (opt) => (Object(opt) === opt && 'id' in opt ? opt.name : '')
              "
              class="q-ma-sm"
              bg-color="primary"
              color="info"
              label-color="dark"
              popup-content-style="border-radius: 15px"
              popup-content-class="popup"
            >
            </q-select>
          </div>
          <div class="col-2" v-if="authStore.isOperator">
            <q-btn
              label="Если пользователь на зарегистрирован нажми"
              color="accent"
              dense
              @click="registrUser = !registrUser"
              rounded
            />
            <main-dialog v-model="registrUser" title="Регистрация" width="50%">
              <registr-form reg-by-operator />
            </main-dialog>
          </div>
          <div class="col-12 q-mb-md">
            <main-input
              label="Описание проблемы"
              v-model="description"
              icon="clear"
              type="textarea"
            >
              <template v-slot:append> </template>
            </main-input>
          </div>
          <div class="col-6 q-pl-sm q-mb-md">
            <q-select
              rounded
              outlined
              bg-color="primary"
              color="info"
              label-color="dark"
              v-model="typeRight"
              :options="options"
              label="Отрасль права"
              popup-content-class="popup"
            />
          </div>
          <div
            v-for="item in typeProblems"
            :key="item.trouble"
            class="row"
            style="margin: 5px; width: 100%"
          >
            <div class="col-12">
              <q-checkbox
                :disable="selectedCheckbox && !item.check"
                v-model="item.check"
                :label="item.trouble"
                color="info"
                @update:model-value="handleCheckboxChange(item)"
              />
            </div>
          </div>
        </div>
        <div class="q-ml-md">
          <q-btn
            label="Отправить"
            type="submit"
            color="positive"
            class="q-mr-md"
            :icon="mdiSendVariant"
          />
          <q-btn
            label="Стереть"
            type="reset"
            color="negative"
            @click="resetForm"
            icon="clear"
          />
        </div>
      </scroll-area>
    </q-form>
  </div>
</template>
<script setup>
import MainInput from "components/ui/input/MainInput.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useRequestStore } from "stores/request";
import { useTypeRightsStore } from "stores/typeRight";
import ScrollArea from "components/common/ScrollArea.vue";
import { mdiSendVariant } from "@mdi/js";
import { useAuthStore } from "stores/auth";
import { useUserStore } from "stores/user";
import MainDialog from "components/ui/dialog/MainDialog.vue";
import RegistrForm from "components/auth/RegistrForm.vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
});

// INJECTABLE
const quasar = useQuasar();
const requestStore = useRequestStore();
const typeRightsStore = useTypeRightsStore();
const authStore = useAuthStore();
const userStore = useUserStore();
// INJECTABLE

// REFS
const myForm = ref(null);
const description = ref("");
const typeRight = ref("");
const options = ref([]);
const rights = ref([]);
const typeProblems = ref([]);
const selectedCheckbox = ref(false);
const allClients = ref([]);
const clientName = ref("");
const registrUser = ref(false);
// REFS

// FUNCTION
const onSubmit = () => {
  myForm.value.validate().then(async (success) => {
    if (!success) {
      quasar.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "Заполните все поля!",
      });
    } else {
      console.log(options.value, typeRight.value);
      await requestStore.createRequest(
        description.value,
        rights.value.find((el) => el.name === typeRight.value)?.id,
        typeProblems.value.find((el) => !!el.check)?.trouble
      );
      quasar.notify({
        color: "positive",
        textColor: "white",
        icon: "cloud_done",
        message: "Заяка создана!",
      });
    }
  });
};
const resetForm = () => {
  description.value = "";
  typeRight.value = "";
  typeProblems.value = [];
  selectedCheckbox.value = false;
};
const handleCheckboxChange = (item) => {
  if (item.check) {
    selectedCheckbox.value = true;
  } else {
    selectedCheckbox.value = false;
  }
};
// FUNCTION

// WATCHER
watch(typeRight, () => {
  typeProblems.value = [];
  rights.value
    .find((el) => el.name === typeRight.value)
    ?.type_trouble.forEach((el) =>
      typeProblems.value.push({ trouble: el, check: false })
    );
  typeProblems.value.push({ trouble: "Другое", check: false });
});
// WATCHER

// LIFECYCLE HOOKS
onMounted(async () => {
  if (props.modelValue?.id) {
    description.value = props.modelValue.description;
    typeRight.value = props.modelValue.typeRight;
  }
  rights.value = await typeRightsStore.getAllTypeRights();
  const allClient = await userStore.getAllClients();
  allClient.forEach((el) =>
    allClients.value.push({
      name: `${el.last_name} ${el.first_name} ${el.middle_name}`,
      id: el.id,
    })
  );
  options.value = rights.value?.map((typeRight) => typeRight.name);
});
</script>

<style lang="scss">
.popup {
  max-height: 250px;
  border-radius: 0 0 15px 15px;
  box-shadow: none;
  background: $primary;
  border: 1.5px solid #e0e0e0;
}
</style>
