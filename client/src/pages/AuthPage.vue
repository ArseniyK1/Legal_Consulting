<template>
  <q-page
    class="login-page window-height window-width row items-center justify-center bg-secondary"
  >
    <div class="col-6">
      <div style="margin: 0 auto; width: 80%" class="auth-image">
        <q-img alt="Oops!" src="/test1.svg" height="100%" />
      </div>
    </div>
    <div class="col-6 trq" style="height: 100%">
      <div class="flex flex-center" style="height: 100%">
        <q-card
          class="shadow-4 bg-dark relative-position"
          style="width: 50%; height: 65%; border-radius: 1rem"
        >
          <q-tabs
            v-model="tab"
            dense
            active-color="white"
            indicator-color="accent"
            align="justify"
            class="text-white"
          >
            <q-tab name="registr" label="Регистрация" />
            <q-tab name="auth" label="Авторизация" />
          </q-tabs>
          <q-separator />
          <q-tab-panels
            v-model="tab"
            animated
            class="q-pa-none shadow-3"
            bordered="bordered"
            style="height: 100%; border-radius: 0 0 1rem 1rem !important"
          >
            <q-tab-panel name="registr" class="q-pa-none">
              <registr-form />
            </q-tab-panel>

            <q-tab-panel name="auth" class="q-pa-none">
              <login-form />
            </q-tab-panel>
          </q-tab-panels>
          <!--          <div-->
          <!--            style="position: absolute; top: -3rem; left: 10px; max-width: 400px"-->
          <!--            class="text-h3"-->
          <!--          >-->
          <!--            <strong class="text-warning text-h3">Ю</strong>КО-->
          <!--          </div>-->
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { Notify, useQuasar } from "quasar";
import { onMounted, ref } from "vue";

import { useRouter } from "vue-router";
import LoginForm from "components/auth/LoginForm.vue";
import RegistrForm from "components/auth/RegistrForm.vue";

const quasar = useQuasar();
const router = useRouter();
const name = ref("");
const tab = ref("auth");
</script>

<style scoped lang="scss">
* {
  font-size: 1rem;
}

.login-card {
  opacity: 0.98;
  width: 50rem;
  height: 25rem;
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

@media (max-width: 1440px) {
  .auth-image {
    display: none;
  }
  .trq {
    width: 100% !important;
  }
}
</style>
