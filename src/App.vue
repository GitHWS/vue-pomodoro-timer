<template>
  <section class="timer">
    <div class="timer__display">
      <p class="timer__text">timerText</p>
      <h1 class="timer__remaining-time">remainTime</h1>
    </div>
    <div class="timer__controls">
      <button>
        <icon-start class="timer__controls-icon" />
      </button>
      <button>
        <icon-reset class="timer__controls-icon" />
      </button>
      <button>
        <icon-setting class="timer__controls-icon" />
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

.timer__controls-icon {
  width: 5rem;
  height: 5rem;
}
</style>
