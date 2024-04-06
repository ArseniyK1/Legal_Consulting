<template>
  <q-page-container
    style="padding: 0 !important"
    class="scroll overflow-hidden"
  >
    <q-virtual-scroll
      style="max-height: 100%"
      :items="lawyers"
      separator
      v-slot="{ item }"
      class="row q-col-gutter-md q-ml-md wrap"
    >
      <div class="col-2 full-width">
        <lawyer-card
          :title="`${item?.first_name} ${item?.last_name} ${item?.middle_name}`"
          :subtitle="`Юрист по семейному праву`"
        />
      </div>
    </q-virtual-scroll>
  </q-page-container>
</template>
<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useLawyerStore } from "stores/lawyer";
import CommonList from "components/common/CommonList.vue";
import { useRoute } from "vue-router";
import LawyerCard from "components/ui/LawyerCard.vue";

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

//
onBeforeMount(async () => {
  lawyers.value = await lawyerStore.getAllLawyersFunc();
  console.log(1, lawyers.value);
});
</script>

<style scoped></style>
