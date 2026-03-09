<script lang="ts" setup>
import DefaultProfileAvatar from "~/components/User/DefaultProfileAvatar.vue";
import UploadProfilePhoto from "~/components/User/UploadProfilePhoto.vue";
import type { User } from "~~/shared/types/User";
import * as v from "valibot";

definePageMeta({
  layout: "app-layout",
  middleware: ["sanctum:auth"],
});

const user = useSanctumUser<User>();
const uploadInProgress = ref<Boolean | null>(false);
const sanctumClient = useSanctumClient();
const toast = useToast();

const handlePhotoUploaded = (newPhoto: User) => {
  user.value!.profile_photo_url = newPhoto.profile_photo_url;
  uploadInProgress.value = false;
};

const handleInProgress = (value: boolean) => {
  uploadInProgress.value = value;
};

const state = reactive({
  name: user.value?.name,
  bio: user.value?.bio,
});

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Cannot be empty")),
  bio: v.pipe(v.string()),
});

const { submit, inProgress } = useSubmit(
  () =>
    sanctumClient("/api/profile", {
      method: "PUT",
      body: {
        name: state.name,
        bio: state.bio,
      },
    }),
  {
    onSuccess: (response: User) => {
      user.value = response;
      navigateTo("/");

      toast.add({
        title: "Profile updated",
        description: "Your profile information has been updated.",
        color: "success",
      });
    },
  },
);
</script>

<template>
  <UContainer v-if="user">
    <div class="flex flex-col items-center justify-center gap-8">
      <p class="text-xl font-semibold">Update profile</p>
      <div class="relative flex flex-col items-center gap-2">
        <div
          v-if="uploadInProgress"
          class="relative flex size-48 flex-col items-center justify-center rounded-full bg-gray-200 lg:size-60"
        >
          <Icon name="i-ph-circle-notch" class="size-30 animate-spin" />
        </div>
        <NuxtImg
          v-if="user.profile_photo_url && !uploadInProgress"
          :src="user.profile_photo_url"
          class="relative size-48 rounded-full object-cover lg:size-60"
        />

        <DefaultProfileAvatar
          v-if="!user.profile_photo_url && !uploadInProgress"
          :name="user.name"
          for-page
          :size="48"
        />

        <UploadProfilePhoto
          :user="user"
          class="absolute bottom-5 -left-2"
          @in-progress="handleInProgress($event)"
          @photo-uploaded="handlePhotoUploaded($event)"
        />
      </div>
      <UForm
        class="container max-w-sm"
        :schema="schema"
        :state="state"
        @submit="submit()"
      >
        <div class="flex w-full flex-col gap-4">
          <UFormField label="Full name" class="w-full" name="name">
            <UInput
              v-model="state.name"
              class="w-full"
              :disabled="inProgress"
            />
          </UFormField>

          <UFormField label="Bio" class="w-full" name="bio">
            <UTextarea
              v-model="state.bio"
              :rows="10"
              autoresize
              class="w-full"
              :disabled="inProgress"
            />
          </UFormField>

          <UButton
            :loading="inProgress"
            icon="i-ph-floppy-disk"
            label="Save changes"
            color="neutral"
            variant="solid"
            block
            type="submit"
          />
        </div>
      </UForm>
    </div>
  </UContainer>
</template>

<style></style>
