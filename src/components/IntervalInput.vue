<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits<{
  (event: "interval-changed", interval: number): void;
}>();

const interval = ref(300);

const handleIntervalChange = () => {
  emit("interval-changed", interval.value);
};
</script>

<template>
  <input
    type="number"
    v-model="interval"
    @input="handleIntervalChange"
    placeholder="Interval in ms"
    min="50"
    max="2000"
  />
</template>

<style scoped>
input {
  width: 10rem;
}
</style>
