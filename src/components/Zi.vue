<template>
  <div class="zi">
    <div class="writer" ref="writerEl" @click="emit('clicked')"></div>
  </div>
</template>

<script setup lang="ts">
import HanziWriter from 'hanzi-writer'

import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  animate?: boolean
}>()

const emit = defineEmits<{
  (e: 'clicked'): void
}>()

let writerEl = ref<HTMLElement | null>(null)
let writer: HanziWriter | null = null
let animationStarted = false

onMounted(() => {
  update(props.modelValue)
})

watch(() => props.modelValue, update)

async function update(ch: string) {
  const el = writerEl.value
  if (el == null) return

  el.innerHTML = ''

  writer = HanziWriter.create(el, ch, {
    width: 150,
    height: 150,
    padding: 5,
    showOutline: true,
    strokeAnimationSpeed: 0.7,
    delayBetweenStrokes: 20,
    delayBetweenLoops: 1000,
    onLoadCharDataError: (err) => {
      console.error(err)
    },
  })

  processAnimation(props.animate || false)
}

watch(
  () => props.animate,
  async (x) => processAnimation(x)
)

async function processAnimation(animate?: boolean) {
  if (animate) {
    writer?.loopCharacterAnimation()
  } else {
    await writer?.showCharacter()
  }
}
</script>

<style scoped>
.zi {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  cursor: pointer;
}
</style>
