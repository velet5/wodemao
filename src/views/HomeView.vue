<template>
  <div class="home">
    <section class="static">
      <section class="logo">
        <img src="@/assets/cat.png" :class="{ transparent }" />
        <div ref="hanzi" id="hanzi" width="300" height="300"></div>
      </section>
      <section class="search">
        <div class="input">
          <input
            type="text"
            placeholder="Enter something..."
            v-model="query"
            @keyup.enter="run"
          />
          <button class="button" @click="run">🐾</button>
        </div>
      </section>
    </section>
    <section class="results"></section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import HanziWriter from 'hanzi-writer'

// refs
const hanzi = ref<HTMLCanvasElement | null>(null)
const query = ref('')
const characters = ref([] as string[])
const transparent = ref(false)

// actions
const run = () => {
  const q = query.value
  if (q === lastQuery) return
  lastQuery = q

  const words = split(q).filter(isMatch)
  const all = words.flatMap((word) => word.split(''))
  characters.value = all

  if (all.length == 0) return

  drawCharacter(all[0])
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

const drawCharacter = (character: string) => {
  const canvas = hanzi.value
  console.log(canvas)
  if (canvas == null) return

  canvas.innerHTML = ''

  const writer = HanziWriter.create(canvas, character, {
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
  transparent.value = true
  writer.loopCharacterAnimation()
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

.logo {
  position: relative;
}

.logo img {
  display: block;
  width: 300px;
}

.logo img.transparent {
  display: none;
  transition: all 0.5s ease-in-out;
}

.hanzi {
  width: 300px;
  height: 300px;
}

.input {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 0.2rem;
}

.input input {
  width: calc(100% - 2rem);
  padding: 0.3rem;
  font-size: 1.2rem;
  outline: none;
  border: none;
}

.button {
  position: absolute;
  right: 0.3rem;
  top: 0.3rem;
  border: none;
  outline: none;
  background: none;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}

.button:hover {
  text-shadow: 0 0 5px rgb(211, 115, 64);
}
</style>
