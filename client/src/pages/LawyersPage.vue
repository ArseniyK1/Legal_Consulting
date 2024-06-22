<template>
  <q-page-container style="padding: 0 !important" class="overflow-auto">
    <div class="row flex justify-between">
      <div class="col-2">
        <div class="text-h2 text-dark q-pa-md">Юристы</div>
      </div>
      <div class="col-10">
        <div class="row">
          <div class="col-4">
            <q-select
              v-model="organizations"
              label="Организация юриста"
              :options="orgOptions"
              :option-label="(el) => el.short_name"
              rounded
              outlined
              bg-color="primary"
              color="info"
              label-color="dark"
              class="q-pa-md full-width"
              style="width: 50%"
            >
              <template v-slot:append>
                <q-icon
                  :name="mdiClose"
                  @click="organizations = ''"
                  class="cursor-pointer"
                  v-if="!!organizations"
                />
              </template>
            </q-select>
          </div>
          <div class="col-4">
            <q-input
              v-model="typeLaw"
              label="Спецификация юриста"
              rounded
              outlined
              bg-color="primary"
              color="info"
              label-color="dark"
              class="q-pa-md full-width"
              style="width: 50%"
            >
              <template v-slot:append>
                <q-icon
                  :name="mdiClose"
                  @click="typeLaw = ''"
                  class="cursor-pointer"
                  v-if="typeLaw.length"
                />
              </template>
            </q-input>
          </div>
          <div class="col-4">
            <q-input
              v-model="lawyerName"
              rounded
              outlined
              label="Имя юриста"
              bg-color="primary"
              color="info"
              label-color="dark"
              style="width: 50%"
              class="q-pa-md full-width"
              ><template v-slot:append>
                <q-icon
                  :name="mdiClose"
                  @click="lawyerName = ''"
                  class="cursor-pointer"
                  v-if="lawyerName.length"
                />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>
    <div class="cards-container">
      <div v-for="item in lawyers" :key="item.id" class="card-wrapper q-pa-sm">
        <lawyer-card :data="item" />
      </div>
    </div>
  </q-page-container>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useLawyerStore } from "stores/lawyer";
import { debounce } from "quasar";
import { mdiClose } from "@mdi/js";
import { useRoute } from "vue-router";
import LawyerCard from "components/ui/cards/LawyerCard.vue";
import { useOrganizationsStore } from "stores/organization";

const props = defineProps({
  height: {
    type: String,
    default: "100%",
  },
});

// INJECTABLE
const route = useRoute();
const lawyerStore = useLawyerStore();
const organizationStore = useOrganizationsStore();
// INJECTABLE

// REFS
const lawyers = ref([]);
const typeLaw = ref("");
const lawyerName = ref("");
const organizations = ref("");
const orgOptions = ref([]);
// REFS

const updateList = debounce(async () => {
  lawyers.value = await lawyerStore.getAllLawyersFunc(
    typeLaw.value,
    lawyerName.value,
    organizations.value?.id
  );
}, 500);

watch(
  () => [typeLaw.value, lawyerName.value, organizations.value],
  () => updateList()
);

// LIFECYCLE HOOKS
onMounted(async () => {
  lawyers.value = await lawyerStore.getAllLawyersFunc();
  await organizationStore.getALlOrganizations();
  orgOptions.value = organizationStore.getOrganizations;
});
</script>
<style scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-auto-rows: 1fr;
  gap: 16px;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
}

.my-card {
  flex-grow: 1;
}
</style>
