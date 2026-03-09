<script lang="ts" setup>
import * as v from "valibot";

const { login } = useSanctumAuth();
const toast = useToast();

const state = reactive({
  email: "",
  password: "",
});

const schema = v.object({
  email: v.pipe(
    v.string(),
    v.email("Invalid email"),
    v.nonEmpty("Cannot be empty"),
  ),
  password: v.pipe(v.string(), v.nonEmpty("Cannot be empty")),
});

const { submit, inProgress } = useSubmit(() => login(state), {
  onSuccess: () => {
    state.email = "";
    state.password = "";

    toast.add({
      title: "Success login",
      description: "You have been logged in successfully.",
      color: "success",
    });
  },
  onError: () => {
    toast.add({
      title: "Login failed",
      description: "Invalid email or password.",
      color: "error",
    });
  },
});
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="submit()" class="w-full">
    <UContainer class="flex min-h-screen flex-col items-center justify-center">
      <div class="flex w-full max-w-sm flex-col justify-center gap-5 p-2">
        <div class="flex flex-col items-center">
          <h1 class="text-2xl font-extrabold tracking-[0.2em] uppercase">
            Cresflow
          </h1>
        </div>
        <UFormField label="EMAIL" class="w-full" name="email">
          <UInput
            v-model="state.email"
            class="w-full"
            highlight
            placeholder="name@example.com"
            :disabled="inProgress"
          />
        </UFormField>

        <UFormField label="PASSWORD" class="w-full" name="password">
          <UInput
            v-model="state.password"
            class="w-full"
            highlight
            placeholder="********"
            type="password"
            :disabled="inProgress"
          />
        </UFormField>

        <UButton
          label="LOGIN"
          variant="solid"
          color="neutral"
          block
          type="submit"
          :loading="inProgress"
        />

        <div class="mt-5 text-center">
          <NuxtLink to="/register">
            <p class="font-bold text-black underline-offset-4 hover:underline">
              Create Account
            </p>
          </NuxtLink>
        </div>
      </div>
    </UContainer>
  </UForm>
</template>

<style></style>
