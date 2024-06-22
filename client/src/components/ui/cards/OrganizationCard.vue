<template>
  <q-card
    class="my-card q-ma-md bg-dark text-white"
    flat
    bordered
    style="height: 100%; width: 100%"
  >
    <img :src="organization.photo" style="height: 150px; object-fit: cover" />

    <q-list class="flex column justify-center" style="height: 55%">
      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="primary" name="business" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ organization.name }}</q-item-label>
          <q-item-label class="text-white" caption>{{
            organization.short_name
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="secondary" name="location_on" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Адрес</q-item-label>
          <q-item-label class="text-white" caption>{{
            organization.address
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="amber" name="contact_phone" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Контакты</q-item-label>
          <q-item-label class="text-white" caption>{{
            organization.contacts
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  props: {
    organization: {
      type: Object,
      required: true,
    },
  },
};
</script>
