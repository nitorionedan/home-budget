<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from "@/components/Header.vue";
import { useStringsStore } from './stores/strings';
import { onBeforeMount } from 'vue';

const stringsStore = useStringsStore();

onBeforeMount((): void => {
  // 言語の設定
  stringsStore.setLocal(window.navigator.languages[0]);
});
</script>

<template>
  <Header></Header>
  <RouterView />
</template>

<style scoped>
</style>