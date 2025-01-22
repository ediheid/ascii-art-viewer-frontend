<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits<{
  (event: "file-selected", file: File | null): void;
}>();

const file = ref<File | null>(null);
const fileName = ref<string | null>(null);

const validationText = ref("");

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const selectedFile = target.files[0];

    if (selectedFile && selectedFile.type === "text/plain") {
      file.value = selectedFile;
      fileName.value = selectedFile.name;
      validationText.value = "";
      emit("file-selected", selectedFile);
    } else {
      validationText.value = "Please upload a valid .txt file.";
      file.value = null;
      fileName.value = null;
      emit("file-selected", null);
    }
  }
};
</script>

<template>
  <div>
    <input
      type="file"
      id="file-upload"
      class="file-upload-input"
      @change="handleFileUpload"
      accept=".txt"
    />
    <p v-if="validationText" class="validation-text">
      {{ validationText }}
    </p>
  </div>
</template>

<style scoped>
.file-upload-input {
  color: var(--text-color-secondary);
  background-color: var(--background-color-secondary);
}

.validation-text {
  color: var(--text-color-warning);
  font-size: 1.2rem;
  margin-top: 0.5rem;
}
</style>
