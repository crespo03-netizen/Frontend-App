<script lang="ts" setup>
const elementDragged = ref();
const numbers = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const dragEnterElement = ref<number | null>(null); // Element to drop on
const originalNumbers = ref(numbers.value); // Store original numbers for reset
const onDrop = async (dropElement: number) => {
  if (elementDragged.value === dropElement) {
    console.log("Cannot drop on the same element");
    elementDragged.value = null; // Reset the dragged element after drop
    return;
  }
  console.log(dropElement % 2);
  if (dropElement % 2 === 0) {
    console.log("Cannot drop on an even number");
    elementDragged.value = null; // Reset the dragged element after drop
    return;
  }
  console.log("elemento añadido correctamente");
  originalNumbers.value = numbers.value;

  //Aqui se hace la llamada a la api
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
  numbers.value = originalNumbers.value;
  alert("Elemento añadido correctamente");
  elementDragged.value = null; // Reset the dragged element after drop
  //  submit()
};
</script>
<template>
  <div class="flex gap-4">
    <div
      v-for="i in numbers"
      :key="i"
      class="size-16"
      :class="dragEnterElement === i ? 'bg-neutral-300' : 'bg-red-500'"
      :draggable="true"
      @dragstart="elementDragged = i"
      @drop="onDrop(i)"
      @dragenter="dragEnterElement = i"
      @dragover.prevent
    >
      {{ i }}
    </div>
  </div>
</template>
<style></style>
