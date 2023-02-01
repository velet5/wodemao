<template>
  <section class="stroke-order-board" ref="root"></section>
</template>

<script setup lang="ts">
import HanziWriter from 'hanzi-writer'
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const characters = computed(() => {
  return props.modelValue.split('')
})

const root = ref<HTMLElement | null>(null)

let writers: HanziWriter[] = []

let generation = 0

const loop = async (gen: number) => {
  while (writers.length > 0) {
    for (const writer of writers) {
      if (gen !== generation) return
      await writer.animateCharacter()
    }
  }
}

watch(characters, async (chars) => {
  const el = root.value
  if (el == null) return

  el.innerHTML = ''
  writers = []
  writers = chars.map((ch) => {
    const div = document.createElement('div')
    div.id = `ch-${ch}`
    el.appendChild(div)

    return HanziWriter.create(div, ch, {
      width: 300,
      height: 300,
      padding: 5,
      showOutline: true,
      strokeAnimationSpeed: 0.7,
      delayBetweenStrokes: 20,
      delayBetweenLoops: 1000,
      onLoadCharDataError: (err) => {
        console.error(err)
      },
    })
  })

  loop(++generation)
})
</script>

<style scoped>
.stroke-order-board {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>
