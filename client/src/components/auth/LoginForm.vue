<template>
  <q-form
    class="row full-height"
    @submit="submitForm"
    ref="form"
    tabindex="-1"
    style="border-radius: 15px !important"
  >
    <q-card
      class="login-form full-height bg-dark"
      style="border-radius: 0px !important"
    >
      <q-card-section>
        <div class="q-gutter-sm">
          <q-input
            label="Введите ваш логин"
            lazy-rules="lazy-rules"
            type="login"
            :rules="[(val) => !!val || 'Заполните логин!']"
            v-model="login"
            rounded
            outlined
            bg-color="primary"
            color="info"
            label-color="dark"
          >
            <template v-slot:prepend>
              <q-icon name="face" color="dark" />
            </template>
          </q-input>
          <q-input
            :type="showPassword ? 'text' : 'password'"
            @keydown.enter.prevent="submitForm"
            label="Пароль"
            outlined
            :rules="[(val) => !!val || 'Заполните пароль!']"
            v-model="password"
            rounded
            bg-color="primary"
            color="info"
            label-color="dark"
          >
            <template v-slot:prepend>
              <q-icon name="pin" color="dark"></q-icon>
            </template>
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="showPassword ? 'visibility' : 'visibility_off'"
                @click="showPassword = !showPassword"
                color="dark"
              ></q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <q-card-actions class="q-px-md text-primary">
        <q-btn
          class="gradient-btn full-width"
          label="Войти"
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
const password = ref("");
const showPassword = ref(false);

const passRules = [
  (val) => !!val || "Введите пароль",
  (val) => val.length >= 6 || "Пароль должен быть не менее 6 символов",
];

const profile = computed(() => authStore.getProfile);

const submitForm = async () => {
  form.value.validate(true).then(async () => {
    try {
      await authStore.login(login.value, password.value);
    } catch (e) {
      Notify.create({ message: "Error" });
    }
  });
};
</script>

<style scoped lang="scss">
.login-form {
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
