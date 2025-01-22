<script lang="ts" setup>
import { ref, watch } from "vue";
import FileInput from "./FileInput.vue";
import IntervalInput from "./IntervalInput.vue";
import PrintButton from "./PrintButton.vue";

const emit = defineEmits<{
  (event: "start-printing", file: File | null, interval: number): void;
}>();

const file = ref<File | null>(null);
const interval = ref(300);
const validationText = ref<string | null>(null);

const emitStartPrinting = () => {
  if (file.value && interval.value >= 50 && interval.value <= 2000) {
    emit("start-printing", file.value, interval.value);
    validationText.value = null;
  }
};

const handleFileSelected = (uploadedFile: File | null) => {
  file.value = uploadedFile;
};

const handleIntervalChanged = (newInterval: number) => {
  interval.value = newInterval;
};

watch([file, interval], () => {
  if (!file.value || interval.value < 50 || interval.value > 2000) {
    validationText.value =
      "Please select a valid file and specify an interval between 50ms and 2000ms.";
  } else {
    validationText.value = null;
  }
});
</script>

<template>
  <div class="inputs-wrapper">
    <FileInput @file-selected="handleFileSelected" />
    <IntervalInput @interval-changed="handleIntervalChanged" />
  </div>

  <p v-if="validationText" class="validation-text">{{ validationText }}</p>

  <div class="button-wrapper">
    <PrintButton
      :isDisabled="!file || interval < 50 || interval > 2000"
      @click="emitStartPrinting"
    />
  </div>
</template>

<style scoped>
.inputs-wrapper {
  display: flex;
  justify-content: space-around;
  max-width: 40rem;
  width: 100%;
}

.button-wrapper {
  margin-top: 2rem;
}

.validation-text {
  color: var(--text-color-warning);
  font-size: 1.4rem;
  margin-top: 1rem;
}
</style>
