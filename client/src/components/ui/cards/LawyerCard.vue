<template>
  <q-card class="my-card bg-dark" flat bordered>
    <q-img src="public/lawyer.svg" />

    <q-card-section class="card-content">
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis text-white">
          {{ `${data?.first_name} ${data?.last_name} ${data?.middle_name}` }}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none card-content">
      <div class="text-subtitle1 text-white ellipsis">
        <div>Спецификация юриста:</div>
        <ul>
          <li v-for="(type, index) in formattedTypeLawArray" :key="index">
            {{ type }}
          </li>
        </ul>
      </div>
    </q-card-section>

    <q-separator class="card-separator" />
    <q-card-actions class="card-actions">
      <!--            <q-btn flat round icon="bookmark_add" class="bg-white disabled" color="accent" />-->
      <q-btn flat color="primary" @click.prevent="infolawyer = true"
        >Подробнее
        <main-dialog
          v-model="infolawyer"
          title="Информация о юристе"
          width="1300px"
        >
          <lawyer-info-card :data="data" />
        </main-dialog>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, computed } from "vue";
import MainDialog from "components/ui/dialog/MainDialog.vue";
import LawyerInfoCard from "components/ui/cards/LawyerInfoCard.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  noLocation: {
    type: Boolean,
    default: false,
  },
  noStars: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

// REFS
const infolawyer = ref(false);
const inception = ref(false);
// REFS

// COMPUTED
const formattedTypeLawArray = computed(() => {
  return props.data?.type_law || [];
});
// COMPUTED

// FUNCTION
</script>

<style scoped>
.my-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Ensure content is aligned at the top */
  align-items: flex-start; /* Align items at the start */
  overflow: hidden;
}

.card-separator {
  margin-top: auto;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
ul {
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
}

li {
  color: #ffffff;
  margin: 5px 0;
}
</style>
