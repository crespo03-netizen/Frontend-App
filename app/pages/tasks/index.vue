<script lang="ts" setup>
import CreateTask from "~/components/Task/CreateTask.vue";
import TaskItemList from "~/components/Task/TaskItemList.vue";
import ViewTask from "~/components/Task/ViewTask.vue";
import type { Task } from "~~/shared/types/Task";

definePageMeta({
  layout: "app-layout",
  middleware: ["sanctum:auth"],
});

const sanctumClient = useSanctumClient();
const user = useSanctumUser<User>();

const { data: tasks, pending } = useAsyncData<Task[]>(() =>
  sanctumClient("/api/tasks", {
    method: "GET",
  }),
);

const handleTaskCreated = (task: Task) => {
  if (tasks.value) {
    tasks.value = [...tasks.value, task];
  }
};

const handleTaskDeleted = (value: Task) => {
  if (value) {
    tasks.value = tasks.value?.filter((task) => task !== value);
  }
};
</script>

<template>
  <UContainer>
    <div class="flex flex-col items-center justify-center gap-5">
      <div class="flex w-full items-center justify-between">
        <p class="font-bold">Task Manager</p>
        <CreateTask @task-created="handleTaskCreated($event)" />
      </div>

      <Transition>
        <div
          v-if="tasks && user"
          class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <ViewTask
            v-for="task in tasks"
            :task="task"
            :user="user"
            @task-deleted="handleTaskDeleted($event)"
          />
        </div>
      </Transition>

      <div
        v-if="pending"
        class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <USkeleton v-for="i in 6" class="h-48 w-full" />
      </div>
    </div>
  </UContainer>
</template>

<style></style>
