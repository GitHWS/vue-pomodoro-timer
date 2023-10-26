<template>
  <section class="timer">
    <div>
      <h2>timerText</h2>
      <h1>remainTime</h1>
    </div>
    <div class="timer__controls">
      <button>start/stop</button>
      <button>reset</button>
      <button>setting</button>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style>
.timer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
}

.timer__controls {
  display: flex;
  gap: 3rem;
}
</style>
