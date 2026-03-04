<script lang="ts" setup>
import type { User } from "~~/shared/types/User";
import DeleteProfilePhoto from "./DeleteProfilePhoto.vue";

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
});

const selectedFile = ref<File>();
const formData = new FormData();
const sanctumClient = useSanctumClient();
const toast = useToast();
const emit = defineEmits(["photo-uploaded", "in-progress"]);
const open = ref(false);

const { submit, inProgress } = useSubmit(
  () => {
    if (selectedFile.value) {
      formData.append("image", selectedFile.value);
    }

    return sanctumClient("/api/profilePhoto", {
      method: "PUT",
      body: formData,
    });
  },
  {
    onSuccess: (response: User) => {
      open.value = false;
      emit("photo-uploaded", response);

      toast.add({
        title: "Photo uploaded",
        description: "Photo saved successfully",
        color: "success",
      });
    },
  },
);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }

  submit();
};

watch(inProgress, (value) => {
  emit("in-progress", value);
});
</script>

<template>
  <UPopover v-model:open="open">
    <UButton
      label="Edit avatar"
      variant="solid"
      color="neutral"
      icon="i-ph-pencil-simple"
    />

    <template #content>
      <UCard>
        <div class="flex flex-col items-center justify-center gap-2">
          <UButton
            icon="i-ph-upload"
            color="neutral"
            block
            :loading="inProgress"
          >
            <template #default>
              <label for="upload-photo"> Upload a photo </label>
              <input
                id="upload-photo"
                type="file"
                class="hidden"
                accept=".jpg, .jpeg, .png"
                @change="handleFileChange"
              />
            </template>
          </UButton>
          <DeleteProfilePhoto
            v-if="user.profile_photo_url"
            @photo-deleted="(emit('photo-uploaded', $event), (open = false))"
            @in-progress="emit('in-progress', $event)"
          />
        </div>
      </UCard>
    </template>
  </UPopover>
</template>

<style></style>
