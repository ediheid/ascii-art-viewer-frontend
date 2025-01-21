<script lang="ts" setup>
import { ref } from "vue";
import FileUploader from "./components/FileUploader.vue";
import { startPrintingProcess } from "./server/socketServer.ts";
import { updateProgress } from "./helpers/asciiArtHelper";
import type { Socket } from "socket.io-client";

const progress = ref(0);
const currentLine = ref("");
const fullArt = ref("");

const socket = ref<Socket | null>(null);

const resetState = () => {
  progress.value = 0;
  currentLine.value = "";
  fullArt.value = "";
};

const startPrinting = async (fileInput: File | null, intervalInput: number) => {
  if (!fileInput || intervalInput < 50) {
    alert("Please select a valid file and interval.");
    return;
  }

  resetState();

  const { socketConnection } = await startPrintingProcess(
    fileInput,
    intervalInput
  );
  socket.value = socketConnection;

  socket.value.on("line", (data: { line: string; progress: number }) => {
    currentLine.value = data.line;
    fullArt.value = updateProgress(fullArt.value, data.line);
    progress.value = data.progress;
  });

  socket.value.on("complete", () => {
    socket.value?.disconnect();
    socket.value = null;
  });
};
</script>

<template>
  <div id="app" class="container">
    <h1>ASCII Art Printer</h1>

    <FileUploader @start-printing="startPrinting" />

    <div class="output" v-if="progress > 0">
      <div class="ascii-art">{{ fullArt }}</div>

      <!-- //todo: custom style progress element if I have time -->
      <progress :value="progress" max="100"></progress>
      <span>{{ progress }}% completed</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  margin: 20px auto;
  max-width: 600px;
}

.ascii-art {
  font-family: monospace;
  white-space: pre-wrap;
  margin: 20px 0;
  text-align: left;
  overflow-wrap: break-word;
}

progress {
  width: 100%;
  margin: 10px 0;
}
</style>
