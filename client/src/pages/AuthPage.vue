<!--<template>-->
<!--  <q-page-->
<!--    class="login-page window-height window-width row items-center justify-center bg-info"-->
<!--  >-->
<!--    <div>-->
<!--      <div class="row">-->
<!--        <div class="col">-->
<!--          <div class="text-h4 text-white q-ml-md montserrat-medium">-->
<!--            <span class="text-accent">Юридический</span> консалтинг-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="q-pa-md">-->
<!--        <q-card>-->
<!--          <q-tabs-->
<!--            v-model="tab"-->
<!--            dense-->
<!--            active-color="accent"-->
<!--            indicator-color="accent"-->
<!--            align="justify"-->
<!--          >-->
<!--            <q-tab name="registr" label="Регистрация" />-->
<!--            <q-tab name="auth" label="Авторизация" />-->
<!--          </q-tabs>-->
<!--          <q-separator />-->
<!--          <q-tab-panels-->
<!--            v-model="tab"-->
<!--            transition-next="jump-down"-->
<!--            transition-prev="jump-down"-->
<!--            animated-->
<!--            class="q-pa-none shadow-3 login-card"-->
<!--            bordered="bordered"-->
<!--          >-->
<!--            <q-tab-panel name="registr" class="q-pa-none">-->
<!--              <registr-form />-->
<!--            </q-tab-panel>-->

<!--            <q-tab-panel name="auth" class="q-pa-none">-->
<!--              <login-form />-->
<!--            </q-tab-panel>-->
<!--          </q-tab-panels>-->
<!--        </q-card>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="absolute-right" style="width: 28%; height: 100vh">-->
<!--      <q-img-->
<!--        alt="Oops!"-->
<!--        src="public/auth.svg"-->
<!--        width="100%"-->
<!--        height="100%"-->
<!--        style="border-radius: 15px"-->
<!--      />-->
<!--    </div>-->
<!--  </q-page>-->
<!--</template>-->
<!--<script setup>-->
<!--import { Notify, useQuasar } from "quasar";-->
<!--import { onMounted, ref } from "vue";-->

<!--import { useRouter } from "vue-router";-->
<!--import LoginForm from "components/auth/LoginForm.vue";-->
<!--import RegistrForm from "components/auth/RegistrForm.vue";-->

<!--const quasar = useQuasar();-->
<!--const router = useRouter();-->
<!--const name = ref("");-->
<!--const tab = ref("auth");-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.login-card {-->
<!--  opacity: 0.98;-->

<!--  width: 50rem;-->
<!--  height: 25rem;-->
<!--}-->

<!--.login-page {-->
<!--  background: $info;-->
<!--}-->
<!--.gradient-btn {-->
<!--  box-sizing: content-box;-->
<!--  border: double 4px transparent;-->
<!--  border-radius: 20px;-->
<!--  background-image: linear-gradient(white, white),-->
<!--    linear-gradient(130deg, #696984 10%, $info 100%);-->
<!--  /*border-image: linear-gradient( 130deg, #FDA219 10%, #E80505 100%) 1;*/-->
<!--  padding: 10px;-->
<!--  background-origin: border-box;-->
<!--  background-clip: padding-box, border-box;-->
<!--  color: $dark;-->
<!--}-->
<!--</style>-->

<template>
  <q-page
    class="login-page window-height window-width row items-center justify-center bg-info"
  >
    <div style="width: 60vw">
      <div class="row q-gutter-xl">
        <div class="col">
          <div class="text-h4 text-white q-ml-md montserrat-medium">
            <span class="text-accent">Юридический</span> консалтинг
          </div>
        </div>
      </div>

      <div
        class="q-pa-md row bg-white justify-between"
        style="border-radius: 1rem"
      >
        <div class="col-6">
          <q-img
            alt="Oops!"
            src="public/auth.svg"
            height="100%"
            style="border-radius: 15px"
          />
        </div>
        <div class="col-6">
          <q-card class="shadow-0" style="height: 100%">
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
    </div>
    <div class="absolute-right" style="width: 28%; height: 100vh"></div>
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
