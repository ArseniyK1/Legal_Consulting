<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="flex align-center justify-center full-height">
          <div class="full-height q-my-md q-mr-md">
            <q-avatar size="2000%" square="square" style="border-radius: 15px">
              <q-img :src="avatarImage" fit="contain" width="100%"></q-img>
            </q-avatar>
          </div>
          <div class="full-height q-mt-xs q-ml-md" style="min-width: 320px">
            <q-input
              class="q-mr-xs"
              color="secondary"
              label="Фамилия *"
              v-model="profile.second_name"
              readonly
            ></q-input>
            <q-input
              class="q-ml-xs"
              color="secondary"
              label="Имя *"
              v-model="profile.first_name"
              readonly
            ></q-input>
            <q-input
              class="q-mr-xs"
              color="secondary"
              label="Отчество *"
              v-model="profile.middle_name"
              readonly
            ></q-input>
            <q-input
              class="q-ml-xs"
              color="secondary"
              label="Логин *"
              v-model="profile.login"
              readonly
            ></q-input>
            <q-input
              class="q-ml-xs"
              color="secondary"
              label="Роль *"
              v-model="profile.role"
              readonly
            ></q-input>
            <q-input
              class="q-ml-xs"
              color="secondary"
              label="Группа *"
              v-model="profile.group"
              readonly
            ></q-input>
          </div>
        </div>
        <q-separator class="q-mt-md"></q-separator>

        <q-separator class="q-mb-md"></q-separator>
        <div class="flex align-center justify-center">
          <q-btn
            class="q-mx-md q-my-xs"
            @click="router.push('/main/')"
            color="secondary"
            icon="check"
            label="Сохранить"
            outline="outline"
            rounded="rounded"
          ></q-btn>
          <q-btn
            class="q-mx-md q-my-xs"
            @click="router.push('/main/')"
            color="secondary"
            icon="close"
            label="Закрыть"
            outline="outline"
            rounded="rounded"
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
const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

const props = defineProps({
  createNewUser: {
    type: Boolean,
    default: false,
  },
});

const profile = ref({
  second_name: "",
  middle_name: "",
  first_name: "",
  role: "",
  login: "",
  group: "",
});

const changeUserData = () => {};
// userStore.changeUserData(
//   {
//     roles: profile.value.roles,
//     name: profile.value.name,
//     lastName: profile.value.full_name.last_name,
//     firstName: profile.value.full_name.first_name,
//     middleName: profile.value.full_name.middle_name,
//     caption: profile.value.caption,
//     type: profile.value.type,
//     phoneNumber: profile.value.mobil_phone,
//     active: profile.value.active,
//     mdlpOrganizationId: profile.value.mdlp_organization_id,
//     ssn: String(profile.value.ssn).replace(/[^0-9]/g, ""),
//     canConfirmDivisionOrder: profile.value.can_confirm_division_order,
//     canConfirmOrder: profile.value.can_confirm_order,
//     isEgisso: profile.value.is_egisso,
//     avatar: "",
//     thmbAvatart: "",
//   },
//   router.currentRoute.value.params.id === undefined
//     ? authStore.getUserId
//     : profile.value.id
// );

const createUser = async () => {
  // const user = await userStore.createNewUser(
  //   profile.value.name,
  //   profile.value.full_name.last_name,
  //   profile.value.full_name.first_name,
  //   profile.value.full_name.middle_name,
  //   profile.value.type,
  //   +profile.value.organization.id,
  //   profile.value.active,
  //   profile.value.roles,
  //   String(profile.value.ssn).replace(/[^0-9]/g, "")
  // );
  // if (user?.userid) {
  //   await router.push(`/profile/id/${user.userid}`);
  //   profile.value = await userStore.getUserById(
  //     router.currentRoute.value.params.id
  //   );
  //   return;
  // }
  router.go(-1);
};

onMounted(async () => {
  const res = await authStore.loadProfile();
  profile.value.role = res.role;
  profile.value.login = res.username;
  profile.value.first_name = res.user.first_name;
  profile.value.middle_name = res.user.middle_name;
  profile.value.second_name = res.user.second_name;
  profile.value.group = res.user.group;

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
