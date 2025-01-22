<script setup>
const props = defineProps({
  progress: Number,
  fullArt: String,
});
</script>

<template>
  <div v-if="progress > 0">
    <div class="output">
      <div class="ascii-art">{{ fullArt }}</div>
    </div>
    <div class="progress">
      <progress :value="progress" max="100" class="propgress-bar"></progress>
      <span class="progress-text">{{ progress }}% completed</span>
    </div>
  </div>
</template>

<style scoped>
.output {
  margin-top: 2rem;
  background-color: var(--background-color-secondary);
  padding: 2rem 5rem;
  border-radius: 0.8rem;
}

.ascii-art {
  font-family: monospace;
  white-space: pre-wrap;
  text-align: left;
  overflow-wrap: break-word;
}

.progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 1rem 0;
}

.progress-text {
  font-size: 1.5rem;
  color: var(--text-color-secondary);
}
</style>
