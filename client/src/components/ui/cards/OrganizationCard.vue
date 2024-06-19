<template>
  <q-card class="my-card q-ma-md" flat bordered>
    <img :src="organization.photo" />

    <q-list>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="primary" name="business" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ organization.name }}</q-item-label>
          <q-item-label caption>{{ organization.short_name }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="secondary" name="location_on" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Адрес</q-item-label>
          <q-item-label caption>{{ organization.address }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="amber" name="contact_phone" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Контакты</q-item-label>
          <q-item-label caption>{{ organization.contacts }}</q-item-label>
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
