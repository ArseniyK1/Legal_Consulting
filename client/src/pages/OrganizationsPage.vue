<template>
  <q-page-container style="padding: 0 !important">
    <scroll-area>
      <q-dialog v-model="showAddForm">
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Добавление организации</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit="addOrganization">
              <q-input
                color="info"
                label-color="dark"
                v-model="newOrganization.name"
                label="Полное название"
              />
              <q-input
                color="info"
                label-color="dark"
                v-model="newOrganization.short_name"
                label="Короткое название"
              />
              <q-input
                color="info"
                label-color="dark"
                v-model="newOrganization.address"
                label="Адрес"
              />
              <q-input
                color="info"
                label-color="dark"
                v-model="newOrganization.inn"
                label="ИНН"
              />
              <q-input
                color="info"
                label-color="dark"
                v-model="newOrganization.contacts"
                label="Контакты"
              />
              <q-input
                color="info"
                label-color="dark"
                v-model="newOrganization.photo"
                label="Ссылка на фото"
              />

              <q-card-actions align="right">
                <q-btn label="Отмена" color="negative" v-close-popup />
                <q-btn
                  label="Добавить"
                  type="submit"
                  color="positive"
                  v-close-popup
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <div class="row q-col-gutter-md q-pa-md">
        <div class="col-4">
          <q-input
            v-model="filters.name"
            label="Название"
            rounded
            outlined
            bg-color="primary"
            color="info"
            label-color="dark"
            :icon="mdiClose"
            @input="updateList"
          >
            <template v-slot:append>
              <q-icon
                :name="mdiClose"
                @click="filters.name = ''"
                class="cursor-pointer"
                v-if="filters.name.length"
              />
            </template>
          </q-input>
        </div>
        <div class="col-4">
          <q-input
            v-model="filters.short_name"
            label="Короткое название"
            rounded
            outlined
            bg-color="primary"
            color="info"
            label-color="dark"
            :icon="mdiClose"
            @input="updateList"
          >
            <template v-slot:append>
              <q-icon
                :name="mdiClose"
                @click="filters.short_name = ''"
                class="cursor-pointer"
                v-if="filters.short_name.length"
              />
            </template>
          </q-input>
        </div>
        <div class="col-4">
          <q-input
            v-model="filters.inn"
            label="ИНН"
            rounded
            outlined
            bg-color="primary"
            color="info"
            label-color="dark"
            :icon="mdiClose"
            @input="updateList"
          >
            <template v-slot:append>
              <q-icon
                :name="mdiClose"
                @click="filters.inn = ''"
                class="cursor-pointer"
                v-if="filters.inn.length"
              />
            </template>
          </q-input>
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-3" v-for="org in orgs" :key="org.id">
          <organization-card :organization="org" />
        </div>
      </div>
    </scroll-area>
    <q-btn
      color="accent"
      rounded
      class="absolute-bottom-right q-ma-md q-pa-md"
      v-if="authStore.isLawyer || authStore.isAdmin"
      label="Добавить организацию"
      @click="showAddForm = true"
    />
  </q-page-container>
</template>

<script setup>
import { useOrganizationsStore } from "stores/organization";
import { onMounted, ref, watch } from "vue";
import { mdiClose } from "@mdi/js";
import OrganizationCard from "components/ui/cards/OrganizationCard.vue";
import ScrollArea from "components/common/ScrollArea.vue";
import { useAuthStore } from "stores/auth";
import { debounce } from "quasar";

const organizationStore = useOrganizationsStore();
const authStore = useAuthStore();
const orgs = ref([]);
const showAddForm = ref(false);
const newOrganization = ref({
  name: "",
  short_name: "",
  address: "",
  inn: "",
  contacts: "",
});
const filters = ref({
  name: "",
  short_name: "",
  inn: "",
});
async function addOrganization() {
  await organizationStore.createOrganizations(newOrganization.value);
  orgs.value = organizationStore.getOrganizations;
  newOrganization.value = {
    name: "",
    short_name: "",
    address: "",
    contacts: "",
    inn: "",
  };
}
const updateList = debounce(async () => {
  orgs.value = await organizationStore.getALlOrganizations(
    filters.value.name,
    filters.value.short_name,
    filters.value.inn
  );
}, 500);

watch(
  () => [filters.value.name, filters.value.short_name, filters.value.inn],
  () => {
    updateList();
  }
);

onMounted(async () => {
  await organizationStore.getALlOrganizations();
  orgs.value = organizationStore.getOrganizations;
});
</script>
