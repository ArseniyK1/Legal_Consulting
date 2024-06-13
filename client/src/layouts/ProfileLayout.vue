<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container>
      <q-page class="bg-secondary flex-center column">
        <div
          class="flex align-center justify-center bg-primary q-pa-md"
          style="border-radius: 1rem"
        >
          <div
            class="full-height q-my-md q-mr-md flex-center column justify-center"
          >
            <div class="text-h6 q-mb-xl">Профиль пользователя</div>
            <q-avatar size="2000%" square="square">
              <q-img :src="avatarImage" fit="contain" width="100%"></q-img>
            </q-avatar>
          </div>
          <div
            class="full-height q-mt-xs q-ml-md bg-white q-pa-md"
            style="
              min-width: 320px;
              border-radius: 1rem;
              border: 1px solid black;
            "
          >
            <q-input
              class="q-mr-xs"
              color="info"
              label="Фамилия *"
              v-model="profile.last_name"
            ></q-input>
            <q-input
              color="info"
              label="Имя *"
              v-model="profile.first_name"
            ></q-input>
            <q-input
              class="q-mr-xs"
              color="info"
              label="Отчество *"
              v-model="profile.middle_name"
            ></q-input>
            <q-input
              class="q-mr-xs"
              color="info"
              label="Почта *"
              v-model="profile.contact_email"
            ></q-input>
            <q-input
              class="q-mr-xs"
              color="info"
              label="Номер телефона"
              v-model="profile.phonenumber"
            ></q-input>
            <q-input
              class="q-ml-xs"
              color="info"
              label="Логин *"
              v-model="profile.login"
            ></q-input>
            <q-input
              class="q-ml-xs"
              color="info"
              label="Роль *"
              v-model="profile.role"
              readonly
            ></q-input>
            <q-input
              class="q-ml-xs"
              color="info"
              label="Организация *"
              v-model="profile.group"
              v-if="authStore.isLawyer"
            ></q-input>
          </div>
        </div>
        <!--        <q-separator class="q-mt-md"></q-separator>-->

        <!--        <q-separator class="q-mb-md"></q-separator>-->
        <div class="flex align-center justify-end q-mt-md">
          <q-btn
            class="q-my-xs bg-accent"
            @click="changeUserData"
            color="white"
            :icon="mdiContentSaveAllOutline"
            label="Сохранить"
            outline
            flat
            rounded
          ></q-btn>
          <q-btn
            class="q-mx-md q-my-xs bg-accent"
            @click="router.push('/main/')"
            color="white"
            flat
            rounded
            icon="close"
            label="Закрыть"
            outline
          ></q-btn>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup="props">
import { useAuthStore } from "../stores/auth";
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import avatarImage from "../assets/avatar.png";
import { mdiContentSaveAllOutline } from "@mdi/js";
import { rolesValue } from "src/constants";
import { useUserStore } from "stores/user";
import { Notify } from "quasar";
const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const props = defineProps({
  createNewUser: {
    type: Boolean,
    default: false,
  },
});

const profile = ref({
  last_name: "",
  middle_name: "",
  first_name: "",
  role: "",
  login: "",
  org: "",
  phonenumber: "",
  contact_email: "",
});

const changeUserData = async () => {
  const changeData = await userStore.updateInfoUser(
    profile.value.first_name,
    profile.value.last_name,
    profile.value.middle_name,
    profile.value.login,
    undefined,
    profile.value.phonenumber,
    undefined,
    undefined,
    profile.value.contact_email
  );
  Notify.create("success");
};

const createUser = async () => {
  router.go(-1);
};

onMounted(async () => {
  const res = await authStore.loadProfile();
  profile.value.role = res.roleId.description;
  profile.value.login = res.login;
  profile.value.first_name = res.first_name;
  profile.value.middle_name = res.middle_name;
  profile.value.last_name = res.last_name;
  profile.value.org = res.org;
  profile.value.phonenumber = res.phonenumber;
  profile.value.contact_email = res.contact_email;
  console.log(authStore.$state.roles);
  console.log(authStore.getRole);
  // if (!!router.currentRoute.value.params.id)
  //   profile.value = await userStore.getUserById(
  //     router.currentRoute.value.params.id
  //   );
  // else {
  //   await authStore.loadProfile();
  //   profile.value = authStore.getProfile;
  // }
});
</script>

<style>
.profile-tabs {
  height: calc(100vh - 490px);
}
</style>
