<template>
  <div class="input">
    <input
      type="text"
      placeholder="Enter something..."
      v-model="query"
      @keyup.enter="$emit('input', query)"
    />
    <button class="button" @click="run">🐾</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'input', query: string): void
}>()

const query = ref('')

const run = () => {
  emit('input', query.value)
}
</script>

<style scoped>
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
