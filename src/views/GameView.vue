<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import { Engine } from '@godot/Dodge Creeps'

const GODOT_CONFIG = {
  args: [],
  canvasResizePolicy: 2,
  emscriptenPoolSize: 8,
  executable: "godot/Dodge Creeps",
  fileSizes: { "Dodge Creeps.pck": 3525532, "Dodge Creeps.wasm": 35740641 },
  focusCanvas: true,
  godotPoolSize: 4,
}

const engine = new Engine(GODOT_CONFIG)
const isLoading = ref(true)

onMounted(async () => {
  await engine.startGame()

  isLoading.value = false
})

onBeforeUnmount(() => {
  engine.requestQuit()
})

onUnmounted(() => {
  Engine.unload()
})
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>
  <canvas id="canvas"></canvas>
</template>

<style scoped></style>
