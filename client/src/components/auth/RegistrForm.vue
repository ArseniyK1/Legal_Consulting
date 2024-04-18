<template>
  <q-form class="row full-height" @submit="submitForm" ref="form" tabindex="-1">
    <q-card class="shadow-3 reg-form full-height bg-primary">
      <q-card-section>
        <div class="q-gutter-md">
          <q-input
            label="Введите ваше имя"
            type="text"
            v-model="name"
            outlined
            standout
            color="positive"
            label-color="dark"
            filled
          >
            <template v-slot:prepend>
              <q-icon class="q-ml-md" name="badge" />
            </template>
          </q-input>
          <q-input
            label="Придумайте логин"
            lazy-rules="lazy-rules"
            type="login"
            v-model="login"
            outlined
            standout
            color="positive"
            label-color="dark"
            filled
          >
            <template v-slot:prepend>
              <q-icon class="q-ml-md" name="abc" size="lg" />
            </template>
          </q-input>
          <q-input
            label="Введите вашу почту"
            lazy-rules="lazy-rules"
            type="text"
            v-model="email"
            outlined
            standout
            color="positive"
            label-color="dark"
            filled
          >
            <template v-slot:prepend>
              <q-icon class="q-ml-md" name="mail" />
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
            outlined
            standout
            color="positive"
            label-color="dark"
            filled
          >
            <template v-slot:prepend>
              <q-icon class="q-ml-md" name="pin"></q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                name="visibility_off"
                @click="showPassword = !showPassword"
              ></q-icon>
            </template>
          </q-input>
          <q-checkbox
            v-model="isTeacher"
            label="Зарегистрироваться как юрист"
            color="accent"
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
const password = ref("");
const showPassword = ref(false);
const isTeacher = ref(false);
const email = ref("");
const date = ref("");

const passRules = [
  (val) => !!val || "Введите пароль",
  (val) => val.length >= 6 || "Пароль должен быть не менее 6 символов",
];

const profile = computed(() => authStore.getProfile);

const submitForm = async () => {
  form.value.validate(true).then(async () => {
    try {
      await authStore.registration(
        name.value,
        login.value,
        password.value,
        isTeacher.value,
        date.value
      );
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
