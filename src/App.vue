<template>
  <section class="timer">
    <div class="timer__display">
      <p class="timer__text">timerText</p>
      <h1 class="timer__remaining-time">{{ remainTotalTime }}</h1>
    </div>
    <div class="timer__controls">
      <button class="timer__controls-button" @click="startTimer">
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

import { ref, computed } from 'vue';

const timer = ref<number | null>(null);
const min = ref(25);
const sec = ref(60);

const remainMin = computed(() =>
  min.value < 10 ? `0${min.value}` : min.value
);

const remainSec = computed(() => {
  let currentSec;

  if (sec.value < 10) {
    currentSec = `0${sec.value}`;
  } else {
    currentSec = sec.value;
  }

  if (sec.value === 60) {
    currentSec = '00';
  }

  return currentSec;
});

const remainTotalTime = computed(() => remainMin.value + ':' + remainSec.value);

const startTimer = () => {
  timer.value = setInterval(() => {
    sec.value -= 1;

    if (sec.value < 0) {
      sec.value = 59;
      min.value -= 1;
    }
  }, 1000);
};
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

html.rest-mode .timer__controls-button:hover {
  color: var(--primary-color);
}
</style>
