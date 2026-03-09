<script lang="ts" setup>
import * as v from "valibot";
import type { Task } from "~~/shared/types/Task";
import { createReusableTemplate, useMediaQuery } from "@vueuse/core";

const status = ref("todo");
const prioritySelected = ref("medium");
const open = ref(false);

const [DefineFormTemplate, ReuseFormTemplate] = createReusableTemplate();
const isDesktop = useMediaQuery("(min-width: 768px)");

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
    onError: () => {
      toast.add({
        title: "Error",
        description: "An error occurred while creating the task.",
        color: "error",
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
  <DefineFormTemplate>
    <UForm :schema="schema" :state="state" @submit="submit()">
      <div class="flex flex-col items-center justify-center gap-4 px-5">
        <UFormField class="w-full" label="Task Name" name="name">
          <UInput v-model="state.name" class="w-full" :disabled="inProgress" />
        </UFormField>

        <UFormField class="w-full" label="Description" name="description">
          <UTextarea
            v-model="state.description"
            :rows="isDesktop ? 8 : 12"
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
  </DefineFormTemplate>

  <UModal v-if="isDesktop" title="Add new task" v-model:open="open">
    <UButton
      icon="i-ph-plus"
      label="New Task"
      variant="solid"
      color="neutral"
    />

    <template #body>
      <ReuseFormTemplate />
    </template>
  </UModal>

  <UDrawer v-else v-model:open="open">
    <UButton
      icon="i-ph-plus"
      label="New Task"
      variant="solid"
      color="neutral"
    />
    <template #body>
      <ReuseFormTemplate />
    </template>
  </UDrawer>
</template>

<style></style>
