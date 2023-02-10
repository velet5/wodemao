<template>
  <div class="word" @click="emit('clicked')">
    <div class="chars">{{ modelValue.word }}</div>
    <div class="pinyin">{{ modelValue.pinyin }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Word } from '@/model/Word'

defineProps<{
  modelValue: Word
}>()

const emit = defineEmits<{
  (e: 'clicked'): void
}>()
</script>

<style scoped>
.word {
  cursor: pointer;
  text-align: center;
}

.word:hover {
  text-shadow: 0 0 5px rgb(211, 115, 64);
}

.chars {
  font-size: 3rem;
  font-weight: bold;
}

.pinyin {
  font-size: 1.2rem;
  font-family: Maitree, Helvetica, Arial, sans-serif;
  color: #11a2a4;
}
</style>
