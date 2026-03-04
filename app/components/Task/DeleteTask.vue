<script lang="ts" setup>
import type { PropType } from "vue";
import type { Task } from "~~/shared/types/Task";

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
  },
});

const sanctumClient = useSanctumClient();
const toast = useToast();
const open = ref(false);

const emit = defineEmits(["task-deleted"]);

const { submit, inProgress } = useSubmit(
  () =>
    sanctumClient(`/api/tasks/${props.task?.id}`, {
      method: "DELETE",
    }),
  {
    onSuccess: () => {
      emit("task-deleted", props.task);
      open.value = false;

      toast.add({
        title: "Task Deleted",
        description: "Your task has been deleted.",
        color: "success",
      });
    },
  },
);
</script>

<template>
  <UPopover v-model:open="open">
    <UButton
      icon="i-ph-trash"
      label="Delete task"
      color="neutral"
      variant="soft"
      block
    />

    <template #content>
      <UCard>
        <template #header>
          <p class="font-semibold">Are you sure to delete this task?</p>
        </template>

        <template #footer>
          <div class="flex items-center justify-between gap-1">
            <UButton
              label="Cancelar"
              color="neutral"
              icon="i-ph-x"
              block
              @click="open = false"
              :disabled="inProgress"
            />

            <UButton
              label="Eliminar"
              color="error"
              icon="i-ph-trash"
              block
              @click="submit()"
              :loading="inProgress"
            />
          </div>
        </template>
      </UCard>
    </template>
  </UPopover>
</template>

<style></style>
