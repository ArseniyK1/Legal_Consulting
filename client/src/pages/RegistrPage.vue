<template>
  <q-page
    class="login-page window-height window-width row items-center justify-center"
  >
    <div class="column z-top">
      <div class="row">
        <div class="col">
          <div class="text-h4 text-white q-mt-md montserrat-medium">
            UniLecta
          </div>
          <div class="text-body-2 text-white q-mb-xs" style="margin-top: -7px">
            Регистрация
          </div>
        </div>
      </div>
      <q-form
        class="row"
        @submit="submitAuthentication"
        ref="form"
        tabindex="-1"
      >
        <q-card class="q-pa-lg shadow-3" bordered="bordered">
          <q-card-section>
            <div class="q-gutter-md">
              <q-input
                label="Логин"
                lazy-rules="lazy-rules"
                type="login"
                v-model="login"
              >
                <template v-slot:append>
                  <q-icon name="face" />
                </template>
              </q-input>
              <q-input
                :type="showPassword ? 'text' : 'password'"
                @keydown.enter.prevent="submitAuthentication"
                label="Пароль"
                v-model="password"
              >
                <template v-slot:append>
                  <q-icon
                    class="cursor-pointer"
                    name="password"
                    @click="showPassword = !showPassword"
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
    </div>
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";
import { version as ver } from "../../package.json";
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
const version = ref(ver);

const profile = computed(() => authStore.getProfile);

const submitAuthentication = async () => {
  form.value.validate(true).then(async (outcome) => {
    if (outcome) {
      try {
        await authStore.login(login.value, password.value);
      } catch (e) {
        console.error(e);
      } finally {
      }
      // console.debug(`Пользователь ${this.user.username} успешно вошел в программу`)
    }
  });
};
onMounted(() => {
  quasar.notify({ type: "positive", message: "Токен получен!" });
});
</script>

<style scoped lang="scss">
.login-page {
  background: $info;
  .login-card {
    opacity: 0.98;
    display: flex;
    flex-direction: column;
    border: 1px solid red !important;
  }
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
