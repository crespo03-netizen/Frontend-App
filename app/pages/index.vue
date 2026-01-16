<script lang="ts" setup>
import type { User } from "~~/shared/types/User";

definePageMeta({
  middleware: ["sanctum:auth"],
});

const user = useSanctumUser<User>();

const sanctumClient = useSanctumClient();
const { data } = useAsyncData(() =>
  sanctumClient("/api/test", {
    method: "GET",
  })
);
</script>

<template>
  <div>Hola {{ user?.name }}</div>
  <UButton label="Primer" icon="i-ph-dot" />
  {{ data }}
</template>

<style></style>
