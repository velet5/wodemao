<template>
  <section class="stroke-order-board">
    <div v-for="(ch, i) in characters">
      <Zi
        v-model="characters[i]"
        :animate="animatedIndex == i"
        @clicked="animate(i)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Word } from '@/model/Word'
import { computed, ref, watch } from 'vue'
import Zi from './Zi.vue'

const props = defineProps<{
  modelValue: string
}>()

const characters = computed(() => {
  return props.modelValue.split('') ?? []
})

watch(
  () => props.modelValue,
  () => (animatedIndex.value = 0)
)

const animatedIndex = ref(0)

function animate(index: number) {
  animatedIndex.value = index
}
</script>

<style scoped>
.stroke-order-board {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
