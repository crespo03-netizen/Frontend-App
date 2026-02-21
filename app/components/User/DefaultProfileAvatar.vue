<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  forPage: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    :class="props.forPage ? 'size-48 lg:size-60' : 'size-12 cursor-pointer'"
    class="rounded-full bg-gray-200 flex flex-col items-center justify-center relative"
  >
    <p :class="props.forPage ? 'text-9xl' : 'text-xl'" class="font-semibold">
      {{ props.name.slice(0, 1) }}
    </p>
  </div>
</template>

<style></style>
