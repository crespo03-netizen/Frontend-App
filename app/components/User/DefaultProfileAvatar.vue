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
  size: {
    type: Number,
    default: 12,
  },
  text: {
    type: String,
    default: "2xl",
  },
});
</script>

<template>
  <div
    :class="
      props.forPage
        ? `size-${props.size} lg:size-60`
        : `size-${props.size} cursor-pointer`
    "
    class="relative flex flex-col items-center justify-center rounded-full bg-gray-200"
  >
    <p
      :class="props.forPage ? 'text-9xl' : `text-${props.text}`"
      class="font-semibold"
    >
      {{ props.name.slice(0, 1) }}
    </p>
  </div>
</template>

<style></style>
