<template>
  <q-form class="row full-height" @submit="submitForm" ref="form" tabindex="-1">
    <q-card
      class="shadow-3 reg-form full-height bg-dark"
      style="border-radius: 0px !important"
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
            v-model="isTeacher"
            v-if="!regByOperator"
            label="Зарегистрироваться как юрист"
            color="accent"
            class="text-primary"
          />
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
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";
import DateInput from "components/ui/input/DateInput.vue";

const authStore = useAuthStore();
const quasar = useQuasar();
const router = useRouter();
const form = ref(null);
const login = ref("");
const name = ref("");
const lastName = ref("");
const middleName = ref("");
const password = ref("");
const showPassword = ref(false);
const isTeacher = ref(false);
const email = ref("");
const date = ref("");

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
          isTeacher.value,
          date.value,
          true
        );
      } else {
        await authStore.registration(
          name.value,
          lastName.value,
          middleName.value,
          login.value,
          password.value,
          isTeacher.value,
          date.value
        );
      }
    } catch (e) {
      Notify.create({ message: "Error" });
    }
  });
};
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
