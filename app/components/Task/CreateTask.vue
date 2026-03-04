<script lang="ts" setup>
import * as v from "valibot";
import type { Task } from "~~/shared/types/Task";

const status = ref("todo");
const prioritySelected = ref("medium");
const open = ref(false);

const sanctumClient = useSanctumClient();
const toast = useToast();
const emit = defineEmits(["task-created"]);

const { submit, inProgress } = useSubmit(
  () =>
    sanctumClient("/api/tasks", {
      method: "POST",
      body: {
        name: state.name,
        description: state.description,
        status: status.value,
        priority: prioritySelected.value,
      },
    }),
  {
    onSuccess: (response: Task) => {
      emit("task-created", response);
      open.value = false;
      state.description = "";
      state.name = "";

      toast.add({
        title: "Task created",
        description: "Task created successfully.",
        color: "success",
      });
    },
  },
);

const state = reactive({
  name: "",
  description: "",
});

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Cannot be empty")),
  description: v.pipe(v.string(), v.nonEmpty("Cannot be empty")),
});

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
</script>

<template>
  <UModal title="Add new task" v-model:open="open">
    <UButton
      icon="i-ph-plus"
      label="New Task"
      variant="solid"
      color="neutral"
    />

    <template #body>
      <UForm :schema="schema" :state="state" @submit="submit()">
        <div class="flex flex-col items-center justify-center gap-4 px-5">
          <UFormField class="w-full" label="Task Name" name="name">
            <UInput
              v-model="state.name"
              class="w-full"
              :disabled="inProgress"
            />
          </UFormField>

          <UFormField class="w-full" label="Description" name="description">
            <UTextarea
              v-model="state.description"
              :rows="6"
              class="w-full"
              autoresize
              :disabled="inProgress"
            />
          </UFormField>

          <UFormField class="w-full" label="Priority">
            <USelect
              class="w-full"
              :items="priority"
              v-model="prioritySelected"
            />
          </UFormField>

          <UButton
            icon="i-ph-floppy-disk"
            label="Create task"
            variant="solid"
            color="neutral"
            block
            type="submit"
            :loading="inProgress"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>

<style></style>
