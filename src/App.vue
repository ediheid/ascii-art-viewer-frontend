<script lang="ts" setup>
import { ref } from "vue";
import Header from "./components/Header.vue";
import PrintSetup from "./components/PrintSetup.vue";
import AsciiArtOutput from "./components/AsciiArtOutput.vue";
import { startPrintingProcess } from "./server/socketServer.ts";
import { updateProgress } from "./helpers/asciiArtHelper";
import type { Socket } from "socket.io-client";

const progress = ref(0);
const currentLine = ref("");
const fullArt = ref("");

const socket = ref<Socket | null>(null);
const validationText = ref("");

const resetState = () => {
  progress.value = 0;
  currentLine.value = "";
  fullArt.value = "";
  validationText.value = "";
};

const startPrinting = async (fileInput: File | null, intervalInput: number) => {
  if (!fileInput) {
    validationText.value = "Please select a valid file.";
    return;
  }
  if (intervalInput < 50 || intervalInput > 2000) {
    validationText.value =
      "Please specify an interval between 50ms and 2000ms.";
    return;
  }

  validationText.value = "";
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
  <div id="app">
    <Header />

    <main class="main-content">
      <section class="container">
        <PrintSetup @start-printing="startPrinting" />
        <AsciiArtOutput :progress="progress" :fullArt="fullArt" />

        <p v-if="validationText" class="validation-text">
          {{ validationText }}
        </p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.main-content {
  height: calc(100vh - 6rem);
  padding: 1rem;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: 40rem;
  max-width: 80rem;
  padding: 2rem;
  box-sizing: border-box;
}

section {
  margin: 0 auto;
  width: 100%;
}
</style>
