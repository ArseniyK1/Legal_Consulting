<template>
  <q-page-container style="padding: 0 !important" class="overflow-auto">
    <div class="full-width row q-gutter-md">
      <div v-for="item in lawyers" :key="item.id" class="row wrap">
        <div class="col-12">
          <lawyer-card
            :title="`${item?.first_name} ${item?.last_name} ${item?.middle_name}`"
            :subtitle="`Юрист по семейному праву`"
          />
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useLawyerStore } from "stores/lawyer";
import CommonList from "components/common/CommonList.vue";
import { useRoute } from "vue-router";
import LawyerCard from "components/ui/LawyerCard.vue";

const props = defineProps({
  height: {
    type: String,
    default: "100%",
  },
});

// INJECTABLE
const route = useRoute();
const lawyerStore = useLawyerStore();
// INJECTABLE

// REFS
const lawyers = ref([]);
const openRequest = ref([]);
// REFS

// onMounted(async () => {
//   lawyers.value = await lawyerStore.getAllLawyersFunc();
//   console.log(2, lawyers.value);
//   openRequest.value = await lawyerStore.getOpenRequest();
// });

const thumbStyle = ref({
  right: "3px",
  borderRadius: "8px",
  backgroundColor: "#000000",
  width: "6px",
  opacity: 0.75,
});
const barStyle = ref({
  right: "2px",
  borderRadius: "14px",
  backgroundColor: "#555555",
  width: "8px",
  opacity: 0.2,
  marginTop: "0",
  marginBottom: "0",
  paddingTop: "3px",
  paddingBottom: "3px",
});

// LIFECYCLE HOOKS
onMounted(async () => {
  lawyers.value = await lawyerStore.getAllLawyersFunc();
});
</script>

<style scoped></style>
