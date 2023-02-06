<template>
  <div class="word" @click="emit('clicked')">{{ modelValue }}</div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'clicked'): void
}>()
</script>

<style scoped>
.word {
  cursor: pointer;
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
}

.word:hover {
  text-shadow: 0 0 5px rgb(211, 115, 64);
}
</style>
