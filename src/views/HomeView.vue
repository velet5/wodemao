<template>
  <div class="home">
    <section class="logo">
      <Logo v-if="!transparent" />
      <StrokeOrderBoard v-model="characters" />
    </section>
    <section class="search">
      <QueryInput @input="run" />
    </section>
    <section class="results">
      <SentenceBoard v-model="words" @selected="characters = $event.word" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { WodemaoClient } from '@/clients/WodemaoClient'
import Logo from '@/components/Logo.vue'
import QueryInput from '@/components/QueryInput.vue'
import SentenceBoard from '@/components/SentenceBoard.vue'
import StrokeOrderBoard from '@/components/StrokeOrderBoard.vue'
import type { Word } from '@/model/Word'
import { ref } from 'vue'

const characters = ref('')
const words = ref([] as Word[])
const transparent = ref(false)
const query = ref('')

let lastQuery = ''
// actions
const run = async (q: string) => {
  query.value = q
  if (q === lastQuery) return
  lastQuery = q

  words.value = (await split(q)).filter((w) => isMatch(w.word))

  if (words.value.length > 0) {
    characters.value = words.value[0].word
  }
  transparent.value = words.value.length > 0
}

// internal
const regex = /\p{Script=Han}/u

const isMatch = (str: string) => {
  return regex.test(str)
}

const split = async (str: string): Promise<Word[]> => {
  const res = await client.parse(str)
  return res.words.flatMap((x) => x)
}

// const client
const client = new WodemaoClient()
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 2rem;
}
</style>
