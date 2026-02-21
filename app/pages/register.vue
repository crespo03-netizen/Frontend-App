<script lang="ts" setup>
import * as v from "valibot";

const toast = useToast();
const sanctumClient = useSanctumClient();

const state = reactive({
  name: "",
  email: "",
  password: "",
});

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Cannot be empty")),
  email: v.pipe(
    v.string(),
    v.email("Invalid email"),
    v.nonEmpty("Cannot be empty"),
  ),
  password: v.pipe(v.string(), v.nonEmpty("Cannot be empty")),
});

const { submit, inProgress } = useSubmit(
  () =>
    sanctumClient("/register", {
      method: "POST",
      body: {
        name: state.name,
        email: state.email,
        password: state.password,
      },
    }),
  {
    onSuccess: () => {
      state.email = "";
      state.name = "";
      state.password = "";

      toast.add({
        title: "Success register",
        description:
          "Your account has been created successfully. Please login to continue.",
        color: "success",
      });

      navigateTo("/login");
    },
  },
);
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="submit()" class="w-full">
    <UContainer class="flex flex-col justify-center items-center min-h-screen">
      <div class="flex flex-col justify-center gap-5 p-2 max-w-sm w-full">
        <div class="flex flex-col items-center">
          <h1 class="text-2xl font-extrabold tracking-[0.2em] uppercase">
            JOIN US
          </h1>
          <p>Create a new account to continue</p>
        </div>

        <UFormField label="NAME" class="w-full" name="name">
          <UInput
            v-model="state.name"
            class="w-full"
            highlight
            placeholder="Your name"
          />
        </UFormField>

        <UFormField label="EMAIL" class="w-full" name="email">
          <UInput
            v-model="state.email"
            class="w-full"
            highlight
            placeholder="name@example.com"
          />
        </UFormField>

        <UFormField label="PASSWORD" class="w-full" name="password">
          <UInput
            v-model="state.password"
            class="w-full"
            highlight
            placeholder="********"
            type="password"
          />
        </UFormField>

        <UButton
          label="REGISTER"
          variant="solid"
          color="neutral"
          block
          type="submit"
        />
      </div>
    </UContainer>
  </UForm>
</template>

<style></style>
