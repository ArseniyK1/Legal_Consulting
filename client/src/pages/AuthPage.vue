<template>
  <q-page
    class="login-page window-height window-width row items-center justify-center bg-info"
  >
    <div class="col-6">
      <q-img alt="Oops!" src="/auth-photo.svg" height="100%" />
      <q-separator vertical color="dark"></q-separator>
    </div>
    <div class="col-6" style="height: 100%">
      <div class="flex flex-center" style="height: 100%">
        <q-card class="shadow-4 bg-primary" style="width: 50%; height: 60%">
          <q-tabs
            v-model="tab"
            dense
            active-color="accent"
            indicator-color="accent"
            align="justify"
          >
            <q-tab name="registr" label="Регистрация" />
            <q-tab name="auth" label="Авторизация" />
          </q-tabs>
          <q-separator />
          <q-tab-panels
            v-model="tab"
            transition-next="jump-down"
            transition-prev="jump-down"
            animated
            class="q-pa-none shadow-3"
            bordered="bordered"
            style="height: 95%"
          >
            <q-tab-panel name="registr" class="q-pa-none">
              <registr-form />
            </q-tab-panel>

            <q-tab-panel name="auth" class="q-pa-none">
              <login-form />
            </q-tab-panel>
          </q-tab-panels>
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
</style>
