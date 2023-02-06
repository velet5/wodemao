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
      <SentenceBoard v-model="words" @selected="characters = $event" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { WodemaoClient } from '@/clients/WodemaoClient'
import Logo from '@/components/Logo.vue'
import QueryInput from '@/components/QueryInput.vue'
import SentenceBoard from '@/components/SentenceBoard.vue'
import StrokeOrderBoard from '@/components/StrokeOrderBoard.vue'
import { ref } from 'vue'

const characters = ref('')
const words = ref([] as string[])
const transparent = ref(false)
const query = ref('')

let lastQuery = ''
// actions
const run = async (q: string) => {
  query.value = q
  if (q === lastQuery) return
  lastQuery = q

  words.value = (await split(q)).filter(isMatch)

  if (words.value.length > 0) {
    characters.value = words.value[0]
  }
  transparent.value = words.value.length > 0
}

// internal
const regex = /\p{Script=Han}/u

const isMatch = (str: string) => {
  return regex.test(str)
}

const split = async (str: string): Promise<string[]> => {
  const res = await client.parse(str)
  return res.fine.flatMap((x) => x)
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
