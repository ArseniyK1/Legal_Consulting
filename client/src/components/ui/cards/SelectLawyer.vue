<template>
  <div style="padding: 0 !important; position: relative">
    <div class="row flex items-center">
      <div class="col-6">
        <div class="row">
          <q-input
            v-model="typeLaw"
            label="Спецификация юриста"
            rounded
            outlined
            bg-color="primary"
            color="info"
            label-color="dark"
            :icon="mdiClose"
            class="q-pa-md"
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
          <q-input
            v-model="lawyerName"
            rounded
            outlined
            label="Имя юриста"
            bg-color="primary"
            color="info"
            label-color="dark"
            style="width: 50%"
            class="q-pa-md"
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
      <div class="col-4">
        <q-btn
          label="Подтвердить выбор"
          color="info"
          class="q-mr-md"
          style="z-index: 1"
          @click="$emit('confirm', selectedLawyer)"
        />
        <q-btn
          v-if="selectedLawyer"
          label="Сбросить выбор"
          color="warning"
          @click="resetFilters"
        />
      </div>
    </div>
    <div class="cards-container">
      <div v-for="item in lawyers" :key="item.id" class="card-wrapper q-pa-sm">
        <q-card
          class="my-card bg-primary cursor-pointer"
          @click="selectLawyer(item)"
          :class="{ selected: selectedLawyer && selectedLawyer.id === item.id }"
          style="transition: transform 0.2s ease-in-out"
          :style="{
            transform:
              selectedLawyer && selectedLawyer.id === item.id
                ? 'scale(1.05)'
                : 'scale(1)',
          }"
        >
          <q-card-section style="height: 100%" class="bg-primary">
            <lawyer-card :data="item" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md"></div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useLawyerStore } from "stores/lawyer";
import { debounce } from "quasar";
import { mdiClose } from "@mdi/js";
import { useRoute } from "vue-router";
import LawyerCard from "components/ui/cards/LawyerCard.vue";
import ScrollArea from "components/common/ScrollArea.vue";

const props = defineProps({
  height: {
    type: String,
    default: "100%",
  },
});
const emit = defineEmits(["confirm"]);

// INJECTABLE
const route = useRoute();
const lawyerStore = useLawyerStore();
// INJECTABLE

// REFS
const lawyers = ref([]);
const typeLaw = ref("");
const selectedLawyer = ref(null);
const lawyerName = ref("");
// REFS

const updateList = debounce(async () => {
  lawyers.value = await lawyerStore.getAllLawyersFunc(
    typeLaw.value,
    lawyerName.value
  );
}, 500);

watch(
  () => [typeLaw.value, lawyerName.value],
  () => updateList()
);

const resetFilters = () => {
  selectedLawyer.value = null;
  typeLaw.value = "";
  lawyerName.value = "";
  lawyers.value.forEach((l) => {
    l.selected = false;
  });
};

const selectLawyer = (lawyer) => {
  if (selectedLawyer.value && selectedLawyer.value.id === lawyer.id) {
    selectedLawyer.value = null;
  } else {
    selectedLawyer.value = lawyer;
    lawyers.value.forEach((l) => {
      if (l.id !== lawyer.id) {
        l.selected = false;
      }
    });
  }
};

// LIFECYCLE HOOKS
onMounted(async () => {
  lawyers.value = await lawyerStore.getAllLawyersFunc();
});
</script>
<style scoped lang="scss">
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
  height: 100%;
}

.selected {
  border: 2px solid $accent;
}
</style>
