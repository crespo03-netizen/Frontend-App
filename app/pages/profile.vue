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
    <div class="flex flex-col justify-center items-center gap-8">
      <p class="font-semibold text-xl">Update profile</p>
      <div class="flex flex-col items-center gap-2 lg:relative">
        <div
          v-if="uploadInProgress"
          class="size-48 lg:size-60 rounded-full bg-gray-200 flex flex-col items-center justify-center relative"
        >
          <Icon name="i-ph-circle-notch" class="size-30 animate-spin" />
        </div>
        <NuxtImg
          v-if="user.profile_photo_url && !uploadInProgress"
          :src="user.profile_photo_url"
          class="size-48 lg:size-60 rounded-full object-cover relative"
        />

        <DefaultProfileAvatar
          v-if="!user.profile_photo_url && !uploadInProgress"
          :name="user.name"
          for-page
        />

        <UploadProfilePhoto
          :user="user"
          class="lg:absolute lg:bottom-5 lg:-left-2"
          @in-progress="handleInProgress($event)"
          @photo-uploaded="handlePhotoUploaded($event)"
        />
      </div>
      <UForm
        class="max-w-sm container"
        :schema="schema"
        :state="state"
        @submit="submit()"
      >
        <div class="w-full flex flex-col gap-4">
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
