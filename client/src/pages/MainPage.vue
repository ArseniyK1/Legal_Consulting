<template>
  <q-page-container style="padding: 0 !important" class="overflow-hidden">
    <scroll-area>
      <q-page>
        <div class="text-h3 text-info q-mt-md q-ml-xl">
          Виды гражданских прав
        </div>
        <div class="row items-center q-pa-md">
          <div
            class="col-xs-12 col-sm-6 col-md-4 q-pa-sm"
            v-for="item in typeRights"
            :key="item.id"
          >
            <type-right-card
              :name="item.name"
              :description="item.description"
              :type_trouble="item.type_trouble"
            >
              <template v-slot:type-trouble>
                <q-btn
                  rounded
                  size="md"
                  class="bg-warning cursor-inherit"
                  :label="trouble"
                  v-for="trouble in item.type_trouble"
                  :key="trouble"
                ></q-btn>
              </template>
            </type-right-card>
          </div>
        </div>
      </q-page>
    </scroll-area>
    <q-btn
      :icon="mdiTextBoxPlus"
      label="Создать заявку"
      rounded
      style="height: 3.5rem"
      class="absolute-bottom-right q-ma-md text-center"
      color="accent"
      @click="dialog = !dialog"
    >
      <main-dialog v-model="dialog" width="80%" title="Создание заявки">
        <request-form @close="dialog = !dialog" />
      </main-dialog>
    </q-btn>
  </q-page-container>
</template>

<script setup>
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/auth";
import { useRequestStore } from "stores/request";
import { useTypeRightsStore } from "stores/typeRight";
import TypeRightCard from "components/ui/cards/TypeRightCard.vue";
import MainDialog from "components/ui/dialog/MainDialog.vue";
import MainInput from "components/ui/input/MainInput.vue";
import RegistrForm from "components/auth/RegistrForm.vue";
import RequestForm from "components/ui/form/RequestForm.vue";
import ScrollArea from "components/common/ScrollArea.vue";
import { mdiTextBoxPlus } from "@mdi/js";

// INJECTABLE
const quasar = useQuasar();
const authStore = useAuthStore();
const requestStore = useRequestStore();
const typeRightsStore = useTypeRightsStore();
// INJECTABLE

const role = ref("");
const typeRights = ref([]);
const dialog = ref(false);
const options = ref([]);
// REFS

// COMPUTED
const computedRole = computed({
  get: () => authStore.getRole,
  set: (val) => (role.value = val),
});
// COMPUTED

// LIFECYCLE HOOKS
onMounted(async () => {
  computedRole.value = authStore.getRole;
  role.value = authStore.getRole;
  const requests = await requestStore.getAllOpenRequests();
  typeRights.value = await typeRightsStore.getAllTypeRights();
  options.value = typeRights.value?.map((typeRight) => typeRight.name);
});
</script>

<style scoped lang="scss">
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.col-xs-12,
.col-sm-6,
.col-md-4 {
  flex: 1 0 calc(33.333333% - 16px);
  max-width: calc(33.333333% - 16px);
  height: 100%;
}

@media (max-width: 991px) {
  .col-sm-6 {
    flex: 1 0 calc(50% - 16px);
    max-width: calc(50% - 16px);
  }
}

@media (max-width: 599px) {
  .col-xs-12 {
    flex: 1 0 100%;
    max-width: 100%;
  }
}

.request {
  border: 0.15rem solid $accent;
  border-radius: 1rem;
  width: 100%;
}
</style>
