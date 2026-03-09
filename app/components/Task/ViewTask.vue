<script lang="ts" setup>
import DeleteTask from "./DeleteTask.vue";

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

const statusClasses = ref([
  {
    value: "todo",
    icon: "i-ph-circle",
  },
  {
    value: "done",
    icon: "i-ph-check-circle",
  },
  {
    value: "in-progress",
    icon: "i-ph-arrows-clockwise",
  },
]);

const priorityClasses = ref([
  {
    class: "bg-yellow-100 border border-yellow-300",
    value: "low",
    text: "text-amber-600",
  },
  {
    class: "bg-orange-100 border border-orange-300",
    value: "medium",
    text: "text-orange-500",
  },
  {
    class: "bg-red-100 border border-red-300",
    value: "high",
    text: "text-red-500",
  },
]);

const priority = ref([
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
]);

const emit = defineEmits(["task-deleted"]);
const sanctumClient = useSanctumClient();
const toast = useToast();

const state = ref({
  description: props.task.description,
});

const open = ref(false);

const { submit, inProgress } = useSubmit(
  () =>
    sanctumClient(`/api/tasks/${props.task.id}`, {
      method: "PUT",
      body: {
        name: props.task.name,
        description: state.value.description,
        priority: props.task.priority,
        status: props.task.status,
      },
    }),
  {
    onSuccess() {
      open.value = false;

      toast.add({
        title: "Task updated",
        description: "Your task was upated successfully.",
        color: "success",
      });
    },
    onError() {
      toast.add({
        title: "Error",
        description: "An error occurred while updating the task.",
        color: "error",
      });
    },
  },
);
</script>

<template>
  <USlideover v-model:open="open">
    <TaskItemList :task="task" :user="user" />

    <template #body>
      <div class="flex flex-col justify-center gap-5 p-2">
        <p class="text-xl font-bold">{{ task.name }}</p>

        <div class="flex w-full items-center justify-between gap-2">
          <div
            :class="
              priorityClasses.find((style) => style.value === task.priority)
                ?.class
            "
            class="rounded-md p-2"
          >
            <p
              :class="
                priorityClasses.find((style) => style.value === task.priority)
                  ?.text
              "
              class="text-xs font-bold uppercase"
            >
              {{ task.priority }} priority
            </p>
          </div>

          <div
            class="flex items-center justify-center gap-1 rounded-md bg-black p-2"
          >
            <Icon
              :name="
                statusClasses.find((icon) => icon.value === task.status)
                  ?.icon || 'i-ph-circle'
              "
              class="size-4 text-white"
            />
            <p class="text-xs font-bold text-white uppercase">
              {{ task.status }}
            </p>
          </div>
        </div>

        <UFormField label="Description">
          <UTextarea
            v-model="task.description"
            class="w-full"
            :rows="20"
            autoresize
          />
        </UFormField>

        <UFormField label="Priority" class="w-full">
          <USelect v-model="task.priority" :items="priority" class="w-full" />
        </UFormField>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full items-center justify-center gap-2">
        <UButton
          icon="i-ph-floppy-disk"
          label="Save changes"
          color="secondary"
          variant="soft"
          block
          @click="submit()"
          :loading="inProgress"
        />

        <DeleteTask :task="task" @task-deleted="emit('task-deleted', $event)" />
      </div>
    </template>
  </USlideover>
</template>

<style></style>
