<template>
  <div class="page-padding">
    <q-card
      v-if="data"
      class="my-card full-height bg-secondary text-white text-h5"
      flat
    >
      <q-card-section>
        <div class="text-h6">
          <q-btn
            color="accent"
            round
            dense
            class="cursor-inherit"
            text-color=""
            icon="person"
          >
          </q-btn>
          Информация о юристе
        </div>
      </q-card-section>
      <q-card-section>
        <q-list class="row">
          <q-item class="col-3">
            <q-item-section>
              <q-item-label>ФИО:</q-item-label>
              <q-item-label class="text_style">
                {{ `${data.first_name} ${data.last_name} ${data.middle_name}` }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="data.date_of_birth" class="col-3">
            <q-item-section>
              <q-item-label>Дата рождения:</q-item-label>
              <q-item-label class="text_style">{{
                formattedDateOfBirth
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="col-3">
            <q-item-section>
              <q-item-label>Email:</q-item-label>
              <q-item-label class="text_style">{{
                data.contact_email
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="data.phonenumber" class="col-3">
            <q-item-section>
              <q-item-label>Телефон:</q-item-label>
              <q-item-label class="text_style">{{
                data.phonenumber
              }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item class="col-6">
            <q-item-section>
              <q-item-label>Типы права:</q-item-label>
              <q-item-label class="text_style">
                <ul>
                  <li v-for="(type, index) in data.type_law" :key="index">
                    {{ type }}
                  </li>
                </ul>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>Роль:</q-item-label>
              <q-item-label class="text_style">{{
                data.roleId.description
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Вычисляемое свойство для форматированной даты рождения
const formattedDateOfBirth = computed(() => {
  if (!props.data.date_of_birth) return "Неизвестно";
  const date = new Date(props.data.date_of_birth);
  return date.toLocaleDateString();
});
</script>

<style scoped>
.my-card {
  max-width: 100%;
  margin: auto;
}

.text_style {
  font-size: 1rem;
  line-height: 1.5;
  color: #000;
  border: 1px solid gray;
  padding: 10px;
  border-radius: 10px;
  background: white;
  margin-top: 5px;
  text-align: left;
}
</style>
