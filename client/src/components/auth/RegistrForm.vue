<template>
  <q-form class="row" @submit="submitForm" ref="form" tabindex="-1">
    <q-card class="shadow-3 reg-form">
      <q-card-section>
        <div class="q-gutter-md">
          <q-input
            label="Введите ваше имя"
            outlined
            lazy-rules="lazy-rules"
            type="text"
            v-model="name"
            color="black"
          >
            <template v-slot:prepend>
              <q-icon name="face" />
            </template>
          </q-input>
          <q-input
            label="Введите ваш логин"
            outlined
            lazy-rules="lazy-rules"
            type="login"
            v-model="login"
            color="black"
          >
            <template v-slot:prepend>
              <q-icon name="face" />
            </template>
          </q-input>
          <q-input
            :type="showPassword ? 'text' : 'password'"
            @keydown.enter.prevent="submitForm"
            label="Пароль"
            v-model="password"
            outlined
            color="black"
          >
            <template v-slot:prepend>
              <q-icon name="password"></q-icon>
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
          unelevated="unelevated"
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

const authStore = useAuthStore();
const quasar = useQuasar();
const router = useRouter();
const form = ref(null);
const login = ref("");
const name = ref("");
const password = ref("");
const showPassword = ref(false);
const isTeacher = ref(false);

const passRules = [
  (val) => !!val || "Введите пароль",
  (val) => val.length >= 6 || "Пароль должен быть не менее 6 символов",
];

const profile = computed(() => authStore.getProfile);

console.log(false && false);

const submitForm = async () => {
  form.value.validate(true).then(async () => {
    try {
      await authStore.registration(
        name.value,
        login.value,
        password.value,
        isTeacher.value
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
  border: double 4px transparent;
  border-radius: 20px;
  background-image: linear-gradient(white, white),
    linear-gradient(130deg, #696984 10%, $info 100%);
  /*border-image: linear-gradient( 130deg, #FDA219 10%, #E80505 100%) 1;*/
  padding: 10px;
  background-origin: border-box;
  background-clip: padding-box, border-box;
  color: $dark;
}
</style>
