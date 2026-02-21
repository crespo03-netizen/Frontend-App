<script lang="ts" setup>
const sanctumClient = useSanctumClient();
const toast = useToast();
const emit = defineEmits(["photo-deleted", "in-progress"]);

const { submit, inProgress } = useSubmit(
  () =>
    sanctumClient("/api/profilePhoto", {
      method: "DELETE",
    }),
  {
    onSuccess: (response) => {
      emit("photo-deleted", response);

      toast.add({
        title: "Success",
        description: "Your photo has been deleted",
        color: "success",
      });
    },
  },
);

watch(inProgress, (value) => {
  emit("in-progress", value);
});
</script>

<template>
  <UButton
    label="Delete photo"
    color="error"
    icon="i-ph-trash"
    @click="submit()"
    block
  />
</template>

<style></style>
