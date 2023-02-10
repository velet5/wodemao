<template>
  <section class="sentence-board">
    <div v-for="(word, i) in modelValue">
      <WordVue v-model="modelValue[i]" @clicked="emit('selected', word)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Word } from '@/model/Word'
import WordVue from './Word.vue'

defineProps<{
  modelValue: Word[]
}>()

const emit = defineEmits<{
  (e: 'selected', word: Word): void
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
