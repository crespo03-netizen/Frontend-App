<script lang="ts" setup>
import type { User } from "~~/shared/types/User";
import DefaultProfileAvatar from "./DefaultProfileAvatar.vue";

const user = useSanctumUser<User>();
const { logout } = useSanctumAuth();
const route = useRoute();
const open = ref(false);

watch(
  () => route.fullPath,
  () => {
    open.value = false;
  },
);
</script>

<template>
  <UPopover v-model:open="open" v-if="user" arrow>
    <UAvatar
      v-if="user.profile_photo_url"
      :src="user.profile_photo_url"
      class="size-10"
    />
    <DefaultProfileAvatar v-else :name="user.name" />

    <template #content>
      <UCard class="w-80">
        <template #header>
          <div class="flex items-center gap-4">
            <div>
              <UAvatar
                v-if="user.profile_photo_url"
                :src="user.profile_photo_url"
                class="size-12"
              />
              <DefaultProfileAvatar v-else :name="user.name" />
            </div>
            <div class="flex flex-col w-full">
              <p class="text-md font-bold">{{ user.name }}</p>
              <p class="text-sm">{{ user.email }}</p>
            </div>
          </div>
        </template>

        <template #default>
          <UButton
            icon="i-ph-user-circle"
            label="Edit profile"
            color="neutral"
            variant="ghost"
            class="w-full"
            to="/profile"
          />
        </template>

        <template #footer>
          <UButton
            icon="i-ph-sign-out"
            label="Logout"
            color="neutral"
            variant="ghost"
            class="w-full"
            @click="logout()"
          />
        </template>
      </UCard>
    </template>
  </UPopover>
</template>

<style></style>
