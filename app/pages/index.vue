<script lang="ts" setup>
import dayjs from "dayjs";
import type { User } from "~~/shared/types/User";

definePageMeta({
  layout: "app-layout",
  middleware: ["sanctum:auth"],
});

const user = useSanctumUser<User>();
const date = dayjs();
</script>

<template>
  <UContainer v-if="user">
    <div class="flex flex-col justify-center gap-5">
      <div
        class="flex w-full flex-col justify-between gap-2 rounded-lg border bg-black p-5"
      >
        <p class="text-lg font-bold text-white lg:text-2xl">
          Hello, {{ user.name }}
        </p>
        <p class="lg:text-md text-sm text-white">
          {{ date.format("dddd, MMMM D") }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink to="/tasks">
          <div
            class="flex h-24 items-center gap-5 rounded-lg border border-gray-500 p-5 transition-transform duration-200 hover:scale-105"
          >
            <Icon name="i-ph-list-checks" class="size-8" />
            <div class="flex flex-col justify-center">
              <p class="text-md font-bold lg:text-lg">Task manager</p>
              <p class="text-xs text-gray-500 lg:text-sm">
                Manage your daily flow and tracking
              </p>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </UContainer>
</template>

<style></style>
