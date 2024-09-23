<template>
  <div v-if="!isAppReady"></div>
  <RouterView v-else />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import { userStore } from "@/store/userStore";

const userstore = userStore();
const isAppReady = ref(false);

onMounted(async () => {
  try {
    await userstore.loadMe();
  } catch (error) {
    console.error("Error during user load:", error);
  } finally {
    isAppReady.value = true;
  }
});
</script>
