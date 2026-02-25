<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Engine } from '@godot/Dodge Creeps'

const GODOT_CONFIG = {
  args: [],
  canvasResizePolicy: 2,
  emscriptenPoolSize: 8,
  ensureCrossOriginIsolationHeaders: true,
  executable: "godot/Dodge Creeps",
  experimentalVK: false,
  fileSizes: { "Dodge Creeps.pck": 3525532, "Dodge Creeps.wasm": 35740641 },
  focusCanvas: true,
  gdextensionLibs: [],
  godotPoolSize: 4,
  serviceWorker: "Dodge Creeps.service.worker.js"
}
const engine = new Engine(GODOT_CONFIG)
const isLoading = ref(true)

onMounted(async () => {
  await engine.startGame()

  isLoading.value = false
})
</script>

<template>
  <h1 v-if="isLoading">Loading...</h1>
  <canvas id="canvas"></canvas>
</template>

<style scoped lang="scss"></style>
