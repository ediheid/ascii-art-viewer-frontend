<script lang="ts" setup>
const props = defineProps<{
  isDisabled: boolean;
  onClick: () => void;
}>();
</script>

<template>
  <button
    :disabled="props.isDisabled"
    @click="props.onClick"
    class="print-button"
  >
    Print
  </button>
</template>

<style scoped>
.print-button {
  background-color: var(--button-background);
  color: var(--button-text-color);
  border: none;
  border-radius: 1.5rem;
  padding: 0.8rem 2rem;
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
  text-transform: uppercase;
}

.print-button:disabled {
  background-color: var(--button-background-disabled);
  color: var(--button-text-color-disabled);
  cursor: not-allowed;
}

.print-button:hover&:not(:disabled) {
  background-color: var(--button-background-hover);
  color: var(--button-text-color-hover);
}
</style>
