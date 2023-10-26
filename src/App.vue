<template>
  <section class="timer">
    <div class="timer__display">
      <p class="timer__text">timerText</p>
      <h1 class="timer__remaining-time">remainTime</h1>
    </div>
    <div class="timer__controls">
      <button class="timer__controls-button">
        <icon-start />
      </button>
      <button class="timer__controls-button">
        <icon-reset />
      </button>
      <button class="timer__controls-button">
        <icon-setting />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import IconStart from './components/icons/IconStart.vue';
import IconPause from './components/icons/IconPause.vue';
import IconReset from './components/icons/IconReset.vue';
import IconSetting from './components/icons/IconSetting.vue';
</script>

<style>
.timer {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;
}

.timer__display {
  font-size: 10rem;
  font-family: 'Zen Dots', cursive;
  user-select: none;
}

.timer__text {
  font-size: 3rem;
  text-align: center;
}

.timer__controls {
  display: flex;
  gap: 3rem;
}

.timer__controls-button {
  font-size: 5rem;
  color: var(--white-color);
  transition: color 0.2s;
}

html .timer__controls-button:hover {
  color: var(--secondary-color);
}
</style>
