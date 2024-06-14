<template>
  <q-form class="row full-height" @submit="submitForm" ref="form" tabindex="-1">
    <q-card
      class="shadow-3 reg-form bg-dark"
      style="border-radius: 0px !important; height: auto"
    >
      <q-card-section>
        <div class="q-gutter-md">
          <div class="row">
            <div class="col-6 q-pr-sm">
              <q-input
                label="Фамилия"
                type="text"
                v-model="lastName"
                rounded
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
              >
                <template v-slot:prepend>
                  <q-icon color="dark" class="q-ml-md q-mr-sm" name="badge" />
                </template>
              </q-input>
            </div>
            <div class="col-6">
              <q-input
                label="Имя"
                type="text"
                v-model="name"
                rounded
                outlined
                bg-color="primary"
                color="info"
                label-color="dark"
              >
                <template v-slot:prepend>
                  <q-icon color="dark" class="q-ml-md q-mr-sm" name="badge" />
                </template>
              </q-input>
            </div>
          </div>
          <q-input
            label="Отчество (при наличии)"
            type="text"
            v-model="middleName"
            rounded
            outlined
            bg-color="primary"
            color="info"
            label-color="dark"
          >
            <template v-slot:prepend>
              <q-icon color="dark" class="q-ml-md q-mr-sm" name="badge" />
            </template>
          </q-input>
          <q-input
            label="Придумайте логин"
            lazy-rules="lazy-rules"
            type="login"
            v-model="login"
            rounded
            outlined
            bg-color="primary"
            color="info"
            label-color="dark"
          >
            <template v-slot:prepend>
              <q-icon color="dark" class="q-ml-md" name="abc" size="md" />
            </template>
          </q-input>
          <q-input
            label="Введите вашу почту"
            lazy-rules="lazy-rules"
            type="text"
            v-model="email"
            rounded
            outlined
            bg-color="primary"
            color="info"
            label-color="dark"
          >
            <template v-slot:prepend>
              <q-icon color="dark" class="q-ml-md q-mr-sm" name="mail" />
            </template>
          </q-input>
          <date-input
            label="Дата рождения"
            required="required"
            v-model="date"
          />
          <q-input
            :type="showPassword ? 'text' : 'password'"
            @keydown.enter.prevent="submitForm"
            label="Пароль"
            v-model="password"
            rounded
            outlined
            bg-color="primary"
            color="info"
            label-color="dark"
          >
            <template v-slot:prepend>
              <q-icon color="dark" class="q-ml-md q-mr-sm" name="pin"></q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                color="dark"
                class="cursor-pointer"
                name="visibility_off"
                @click="showPassword = !showPassword"
              ></q-icon>
            </template>
          </q-input>
          <q-checkbox
            v-model="isLawyer"
            v-if="!regByOperator"
            label="Зарегистрироваться как юрист"
            color="accent"
            class="text-primary"
          />

          <div v-if="isLawyer">
            <q-select
              rounded
              outlined
              bg-color="primary"
              color="dark"
              label-color="black"
              v-model="typeRight"
              :options="options"
              label="Отрасль права"
              popup-content-class="popup"
              style="color: black"
            >
              <template v-slot:append>
                <q-icon
                  color="dark"
                  class="q-ml-md q-mr-sm"
                  name="clear"
                  v-if="typeRight"
                  @click="typeRight = ''"
                />
              </template>
            </q-select>
            <q-toggle
              v-model="selectAll"
              label="Всё"
              color="accent"
              class="text-white"
              v-if="typeRight"
              @update:model-value="handleSelectAllChange"
            />
            <div
              v-for="item in typeProblems"
              :key="item.trouble"
              class="row"
              style="margin: 5px; width: 100%"
            >
              <div class="col-12">
                <q-toggle
                  :disable="item.disabled"
                  v-model="item.check"
                  :label="item.trouble"
                  color="accent"
                  class="text-white"
                  @update:model-value="handleCheckboxChange(item)"
                />
              </div>
            </div>
            <q-input
              v-if="selectedTypeLaw.includes('Другое')"
              v-model="etc"
              label="Отрасль права"
              outlined
              rounded
              bg-color="primary"
              color="accent"
              label-color="black"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-actions class="q-px-md text-primary">
        <q-btn
          class="gradient-btn full-width"
          label="Зарегистрироваться"
          size="lg"
          type="submit"
          unelevated
          rounded
        ></q-btn>
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup>
import { Notify, useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";
import DateInput from "components/ui/input/DateInput.vue";
import { useTypeRightsStore } from "stores/typeRight";

const authStore = useAuthStore();
const typeRightsStore = useTypeRightsStore();
const quasar = useQuasar();
const router = useRouter();
const form = ref(null);
const login = ref("");
const name = ref("ТЕСТ");
const lastName = ref("ТЕСТОВ");
const middleName = ref("ТЕСТОВИЧ");
const password = ref("test");
const showPassword = ref(false);
const isLawyer = ref(false);
const email = ref("123@gmail.com");
const date = ref("");
const selectedTypeLaw = ref([]);
const etc = ref("");
const typeRightsOptions = ref([]);
const typeRight = ref("");
const options = ref([]);
const typeProblems = ref([]);
const rights = ref([]);
const selectedCheckbox = ref(false);
const selectAll = ref(false);

const props = defineProps({
  regByOperator: {
    type: Boolean,
    default: false,
  },
});

const passRules = [
  (val) => !!val || "Введите пароль",
  (val) => val.length >= 6 || "Пароль должен быть не менее 6 символов",
];

const profile = computed(() => authStore.getProfile);

const handleCheckboxChange = (item) => {
  if (item.trouble === "Другое") {
    typeProblems.value.forEach((problem) => {
      if (problem.trouble !== "Другое") {
        problem.check = false;
        problem.disabled = item.check;
      }
    });
    if (item.check) {
      selectedTypeLaw.value = ["Другое", etc.value];
    } else {
      selectedTypeLaw.value = selectedTypeLaw.value.filter(
        (type) => type !== "Другое" && type !== etc.value
      );
    }
    selectAll.value = false;
  } else {
    typeProblems.value.forEach((problem) => {
      if (problem.trouble === "Другое") {
        problem.check = false;
        problem.disabled = false;
      }
    });
    if (item.check) {
      selectedTypeLaw.value.push(item.trouble);
    } else {
      selectedTypeLaw.value = selectedTypeLaw.value.filter(
        (type) => type !== item.trouble
      );
    }
    selectAll.value =
      selectedTypeLaw.value.length ===
      typeProblems.value.filter((problem) => problem.trouble !== "Другое")
        .length;
  }
};

const handleSelectAllChange = () => {
  typeProblems.value.forEach((problem) => {
    if (problem.trouble !== "Другое") {
      problem.check = selectAll.value;
      problem.disabled = selectAll.value;
    }
  });
  if (selectAll.value) {
    selectedTypeLaw.value = typeProblems.value
      .filter((problem) => problem.trouble !== "Другое" && problem.check)
      .map((problem) => problem.trouble);
  } else {
    selectedTypeLaw.value = [];
  }
};

const submitForm = async () => {
  form.value.validate(true).then(async () => {
    try {
      if (!props.regByOperator) {
        await authStore.registration(
          name.value,
          lastName.value,
          middleName.value,
          login.value,
          password.value,
          isLawyer.value,
          date.value,
          true,
          selectedTypeLaw.value,
          email.value
        );
      } else {
        await authStore.registration(
          name.value,
          lastName.value,
          middleName.value,
          login.value,
          password.value,
          isLawyer.value,
          date.value,
          false,
          selectedTypeLaw.value,
          email.value
        );
      }
    } catch (e) {
      Notify.create({ message: "Error" });
    }
  });
};

watch(typeProblems, () => {
  selectedCheckbox.value = typeProblems.value.some((problem) => problem.check);
});

watch(typeRight, () => {
  typeProblems.value = [];
  rights.value
    .find((el) => el.name === typeRight.value)
    ?.type_trouble.forEach((el) =>
      typeProblems.value.push({ trouble: el, check: false })
    );
  typeProblems.value.push({ trouble: "Другое", check: false });
});

onMounted(async () => {
  const data = await typeRightsStore.getAllTypeRights();
  data.forEach((el) => {
    el.type_trouble.forEach((el) => typeRightsOptions.value.push(el));
  });
  rights.value = await typeRightsStore.getAllTypeRights();
  typeRightsOptions.value.push("Другое");
  options.value = rights.value?.map((typeRight) => typeRight.name);
});
</script>

<style scoped lang="scss">
.reg-form {
  opacity: 0.98;
  width: 100%;
  height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-page {
  background: $info;
}
.gradient-btn {
  box-sizing: content-box;
  border-radius: 20px;
  //border-image: linear-gradient(130deg, #fda219 10%, #e80505 100%) 1;
  padding: 10px;
  color: white;
  background: $accent;
  border: 2px solid $accent;
  //background: $positive;
}
.gradient-btn:hover {
  transition: 0.25s ease-in-out;
  background: white;
  color: $accent;
}
</style>
