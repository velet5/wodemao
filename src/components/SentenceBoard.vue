<template>
  <section class="sentence-board">
    <div v-for="(word, i) in modelValue">
      <Word v-model="modelValue[i]" @clicked="emit('selected', word)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Word from './Word.vue'

defineProps<{
  modelValue: string[]
}>()

const emit = defineEmits<{
  (e: 'selected', word: string): void
}>()
</script>

<style scoped>
.sentence-board {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
}
</style>
