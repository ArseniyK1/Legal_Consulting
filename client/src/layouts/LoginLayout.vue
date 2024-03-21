<template>
  <q-layout view="hHh Lpr lFf">
    <transition
      :duration="300"
      appear="appear"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </transition>
  </q-layout>
</template>

<script setup></script>
