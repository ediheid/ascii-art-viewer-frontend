<template>
  <div class="form">
    <input type="file" @change="handleFileUpload" accept=".txt" />
    <input
      type="number"
      v-model="interval"
      placeholder="Interval in ms"
      min="50"
      max="20000"
    />
    <button
      :disabled="!file || interval < 50 || interval > 20000"
      @click="emitStartPrinting"
    >
      Print
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits<{
  (event: "start-printing", file: File | null, interval: number): void;
}>();

const file = ref<File | null>(null);
const interval = ref(300);

const emitStartPrinting = () => {
  if (file.value && interval.value >= 50 && interval.value <= 2000) {
    emit("start-printing", file.value, interval.value);
  } else {
    // todo: move this to inline validation instead of an alert!
    alert(
      "Please select a file and specify an interval between 50ms and 2000ms."
    );
  }
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const selectedFile = target.files[0];

    if (selectedFile && selectedFile.type === "text/plain") {
      file.value = selectedFile;
    } else {
      alert("Please upload a valid .txt file.");
      file.value = null;
    }
  }
};
</script>

<style scoped>
/* // todo: Add styles for the form */
</style>
