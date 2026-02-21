<script lang="ts" setup>
import MenuActions from "~/components/User/MenuActions.vue";

const user = useSanctumUser<User>();
</script>

<template>
  <UDashboardNavbar>
    <template #left>
      <NuxtLink to="/">
        <p class="font-semibold">APP</p>
      </NuxtLink>
    </template>

    <template #right>
      <MenuActions />
    </template>
  </UDashboardNavbar>
</template>

<style></style>
