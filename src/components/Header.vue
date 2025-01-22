<template>
  <header class="header">
    <h1 class="heading">ASCII Art Printer</h1>
    <img
      src="/src/static/MeyerSoundLogo.png"
      alt="Meyer Sound Logo"
      class="logo"
    />
  </header>
</template>

<style scoped>
.header {
  background-color: var(--background-color-primary);
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
}

.heading {
  color: var(--text-color-tertiary);
  font-weight: 400;
  font-size: 2rem;
  height: 6rem;
  display: flex;
  align-items: center;
}

.logo {
  width: auto;
  max-height: 6rem;
}
</style>
