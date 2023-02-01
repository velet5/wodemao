<template>
  <div class="home">
    <section class="static">
      <section class="logo">
        <Logo v-if="!transparent" />
        <StrokeOrderBoard v-model="characters" />
      </section>
      <section class="search">
        <QueryInput @input="run" />
      </section>
    </section>
    <section class="results"></section>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import QueryInput from '@/components/QueryInput.vue'
import StrokeOrderBoard from '@/components/StrokeOrderBoard.vue'
import { ref } from 'vue'

const characters = ref('')
const transparent = ref(false)

const chineseRegex = /\p{Script=Han}/u
// actions
const run = (query: string) => {
  const q = query
  if (q === lastQuery) return
  lastQuery = q

  const words = split(q).filter(isMatch)
  const all = words
    .flatMap((word) => word.split('').filter((c) => c.match(chineseRegex)))
    .join('')
  characters.value = all
  transparent.value = all.length > 0
}

// internal
const regex = /\p{Script=Han}/u
let lastQuery = ''

const isMatch = (str: string) => {
  return regex.test(str)
}

const split = (str: string): string[] => {
  return str.split('').filter((s) => s !== ' ')
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.static {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 2rem;
}
</style>
