<template>
  <section class="timer" :class="{ 'rest-mode': isBreakMode }">
    <div class="timer__display">
      <p class="timer__text">{{ timerText }}</p>
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
      <setting-modal
        v-if="isShowSettingModal"
        :currentWorkMin="currentWorkMin"
        :currentBreakMin="currentBreakMin"
        @close-modal="closeSettingModal"
        @update-timer="updateTimer" />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import IconStart from './components/icons/IconStart.vue';
import IconPause from './components/icons/IconPause.vue';
import IconReset from './components/icons/IconReset.vue';
import IconSetting from './components/icons/IconSetting.vue';
import SettingModal from './components/UI/SettingModal.vue';

import { ref, computed, watch } from 'vue';

// Data
const timer = ref<number | null>(null);
const min = ref<number | string>(25);
const sec = ref<number | string>(60);
const isStart = ref(false);
const currentWorkMin = ref<number | null>(null || 25);
const currentBreakMin = ref<number | null>(null || 5);
const currentMode = ref('work');
const isShowSettingModal = ref(false);

// Computed
const timerText = computed(() =>
  currentMode.value === 'work' ? 'FOCUS' : 'TAKE A BREAK'
);

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

const isBreakMode = computed(() =>
  currentMode.value === 'break' ? true : false
);

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
    currentMode.value = 'work';
  }

  min.value = currentWorkMin.value || 25;
  sec.value = 60;
};

const updateTimer = (updatedMin: { work: string; break: string }) => {
  currentWorkMin.value = +updatedMin.work;
  currentBreakMin.value = +updatedMin.break;

  if (currentMode.value === 'work') {
    min.value = currentWorkMin.value;
  } else {
    min.value = currentBreakMin.value;
  }
};

const openSettingModal = () => {
  isShowSettingModal.value = true;
};

const closeSettingModal = () => {
  isShowSettingModal.value = false;
};

// Watch
watch(remainTotalTime, (value) => {
  if (value === '00:00') {
    pauseTimer();

    switch (currentMode.value) {
      case 'work':
        currentMode.value = 'break';
        min.value = +currentBreakMin.value!;
        break;
      case 'break':
        currentMode.value = 'work';
        min.value = +currentWorkMin.value!;
        break;
    }
    startTimer();
  }
});
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
  background-color: var(--primary-color);
  transition: background-color 0.3s;
}

.timer.rest-mode {
  background-color: var(--secondary-color);
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

.timer .timer__controls-button:hover {
  color: var(--secondary-color);
}

.timer.rest-mode .timer__controls-button:hover {
  color: var(--primary-color);
}
</style>
