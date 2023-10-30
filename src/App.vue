<template>
  <section class="timer">
    <div class="timer__display">
      <p class="timer__text">timerText</p>
      <h1 class="timer__remaining-time">{{ remainTotalTime }}</h1>
    </div>
    <div class="timer__controls">
      <button class="timer__controls-button">
        <icon-start v-if="!isStart" @click="startTimer" />
        <icon-pause v-else @click="pauseTimer" />
      </button>
      <button class="timer__controls-button" @click="resetTimer">
        <icon-reset />
      </button>
      <button class="timer__controls-button" @click="openSettingModal">
        <icon-setting />
      </button>
    </div>
  </section>
  <Teleport to="body">
    <Transition name="setting-modal">
      <setting-modal v-if="isShowSettingModal" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import IconStart from './components/icons/IconStart.vue';
import IconPause from './components/icons/IconPause.vue';
import IconReset from './components/icons/IconReset.vue';
import IconSetting from './components/icons/IconSetting.vue';
import SettingModal from './components/UI/SettingModal.vue';

import { ref, computed } from 'vue';

// Data
const timer = ref<number | null>(null);
const min = ref<number | string>(25);
const sec = ref<number | string>(60);
const isStart = ref(false);
const isShowSettingModal = ref(false);

// Computed
const remainMin = computed(() =>
  +min.value < 10 ? `0${min.value}` : min.value
);

const remainSec = computed(() => {
  if (+sec.value < 10) {
    sec.value = `0${sec.value}`;
  } else {
    sec.value = sec.value;
  }

  if (sec.value === 60) {
    sec.value = '00';
  }

  return sec.value;
});

const remainTotalTime = computed(() => remainMin.value + ':' + remainSec.value);

// Methods
const startTimer = () => {
  isStart.value = true;
  timer.value = setInterval(() => {
    sec.value = +sec.value - 1;

    if (+sec.value < 0) {
      sec.value = 59;
      min.value = +min.value - 1;
    }
  }, 1000);
};

const pauseTimer = () => {
  isStart.value = false;
  if (timer.value) {
    clearInterval(timer.value);
  }
};

const resetTimer = () => {
  isStart.value = false;
  if (timer.value) {
    clearInterval(timer.value);
  }

  // TODO 사용자 설정값이 있을 시 사용자 설정 값으로 반영 필요
  min.value = 25;
  sec.value = 60;
};

const openSettingModal = () => {
  isShowSettingModal.value = true;
};
</script>

<style>
.setting-modal-enter-active,
.setting-modal-leave-active {
  transition: opacity 0.5s ease;
}

.setting-modal-enter-from,
.setting-modal-leave-to {
  opacity: 0;
}

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
