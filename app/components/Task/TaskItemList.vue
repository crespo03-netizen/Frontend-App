<script lang="ts" setup>
import type { PropType } from "vue";
import type { Task } from "~~/shared/types/Task";
import dayjs from "dayjs";
import DefaultProfileAvatar from "../User/DefaultProfileAvatar.vue";

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const statusColors = ref([
  {
    color: "bg-yellow-500",
    value: "todo",
  },
  {
    color: "bg-green-500",
    value: "done",
  },
  {
    color: "bg-blue-500",
    value: "in-progress",
  },
]);
</script>

<template>
  <div
    class="flex w-full cursor-pointer rounded-lg border border-gray-200 shadow-sm transition duration-200 hover:scale-105"
  >
    <div
      :class="statusColors.find((color) => color.value === task.status)?.color"
      class="w-1 rounded-l-lg"
    />
    <div class="flex w-full flex-col justify-center gap-2 p-6 lg:gap-4">
      <div class="flex items-center justify-between">
        <p class="rounded-md border p-1 text-xs font-semibold uppercase">
          {{ `${task.priority} priority` }}
        </p>
      </div>

      <p class="truncate text-lg font-bold">{{ task.name }}</p>

      <div class="flex items-center justify-between">
        <div class="flex items-center justify-center gap-1">
          <Icon name="i-ph-calendar-blank" class="size-5" />
          <p class="text-sm">
            {{ dayjs(task.created_at).format("MMMM, D") }}
          </p>
        </div>

        <div>
          <UAvatar
            v-if="user.profile_photo_url"
            :src="user.profile_photo_url"
            class="size-8"
          />

          <DefaultProfileAvatar v-else :name="user.name" :size="8" text="md" />
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
