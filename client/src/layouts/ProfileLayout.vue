<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container>
      <q-page class="bg-secondary flex-center column">
        <div
          class="flex align-center justify-center bg-primary q-pa-md"
          style="border-radius: 1rem"
        >
          <div class="full-height q-mr-md flex-center column justify-center">
            <div class="text-h6 q-mb-xl">Профиль пользователя</div>
            <q-avatar size="2000%" square>
              <q-img :src="profile.photo || avatarImage" width="100%"></q-img>
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
            <q-select
              class="q-ml-xs"
              color="info"
              :option-label="(el) => el.short_name"
              :options="orgOptions"
              label="Организация *"
              v-model="profile.org"
              v-if="authStore.isLawyer"
            ></q-select>
            <q-file v-model="photo" label="Новое фото профиля" color="info">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
        </div>
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

<script setup>
import { useAuthStore } from "stores/auth";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import avatarImage from "../assets/avatar.png";
import { mdiContentSaveAllOutline } from "@mdi/js";
import { useUserStore } from "stores/user";
import { Notify } from "quasar";
import { useOrganizationsStore } from "stores/organization";

const authStore = useAuthStore();
const organizationStore = useOrganizationsStore();
const router = useRouter();
const userStore = useUserStore();

const profile = ref({
  last_name: "",
  middle_name: "",
  first_name: "",
  role: "",
  login: "",
  org: "",
  phonenumber: "",
  contact_email: "",
  photo: "",
});
const photo = ref(null);
const orgOptions = ref([]);

const changeUserData = async () => {
  const formData = new FormData();
  formData.append("first_name", profile.value.first_name);
  formData.append("last_name", profile.value.last_name);
  formData.append("middle_name", profile.value.middle_name);
  formData.append("login", profile.value.login);
  formData.append("phonenumber", profile.value.phonenumber);
  formData.append("contact_email", profile.value.contact_email);

  if (photo.value) {
    formData.append("photo", photo.value);
    console.log(URL.createObjectURL(photo.value));
    profile.value.photo = URL.createObjectURL(photo.value);
  }

  if (authStore.isLawyer && profile.value.org?.id) {
    formData.append("organization", String(+profile.value.org?.id));
  }

  try {
    const changeData = await userStore.updateInfoUser(formData);
    if (changeData) {
      profile.value.photo = changeData.photo;

      Notify.create("Чтобы изменения вступили в силу обновите страницу!");
    }
  } catch (error) {
    Notify.create("Произошла ошибка при обновлении профиля!");
  }
};

onMounted(async () => {
  const res = await authStore.loadProfile();
  profile.value = res;
  profile.value.role = res.roleId.description;
  profile.value.login = res.login;
  profile.value.first_name = res.first_name;
  profile.value.middle_name = res.middle_name;
  profile.value.last_name = res.last_name;
  profile.value.org = res.organization;
  profile.value.phonenumber = res.phonenumber;
  profile.value.contact_email = res.contact_email;
  profile.value.photo = `http://localhost:7000/uploads/${res.photo}`; // Загрузите URL-адрес фото при загрузке профиля

  if (authStore.isLawyer) {
    await organizationStore.getALlOrganizations();
    orgOptions.value = organizationStore.getOrganizations;
    if (profile.value.org?.id) {
      profile.value.org = orgOptions.value.find(
        (org) => org.id === +profile.value.org?.id
      );
    }
  }
});
</script>
