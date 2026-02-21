<script lang="ts" setup>
import type { User } from "~~/shared/types/User";

definePageMeta({
  layout: "app-layout",
  middleware: ["sanctum:auth"],
});

const user = useSanctumUser<User>();
const sanctumClient = useSanctumClient();
</script>

<template>
  <UContainer> Main page </UContainer>
</template>

<style></style>
