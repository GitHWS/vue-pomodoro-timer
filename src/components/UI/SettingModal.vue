<template>
  <div class="modal-backdrop">
    <section class="modal">
      <header class="modal__header">
        <h3 class="modal__header-title">⚙️ Setting</h3>
        <p class="modal__header-desc">You can customize timer.</p>
      </header>
      <div class="modal__form">
        <form class="modal__form-inputs">
          <div class="modal__form-input">
            <label for="work-min" class="modal__form-label">Work Time</label>
            <input
              type="range"
              id="work-min"
              step="5"
              min="5"
              max="60"
              list="tickmarks"
              class="modal__form-slider"
              v-model="updatedWorkMin" />
            <datalist id="tickmarks">
              <option v-for="val in 6" :key="val" :value="val * 10" />
            </datalist>
            <span>{{ convertedWorkMin }}</span>
          </div>
          <div class="modal__form-input">
            <label for="break-min" class="modal__form-label">Break Time</label>
            <input
              type="range"
              id="break-min"
              step="5"
              min="5"
              max="60"
              list="tickmarks"
              class="modal__form-slider"
              v-model="updatedBreakMin" />
            <datalist id="tickmarks">
              <option v-for="val in 6" :key="val" :value="val * 10" />
            </datalist>
            <span>{{ convertedBreakMin }}</span>
          </div>
        </form>
      </div>
      <footer class="modal__footer">
        <button
          class="modal__button modal__button-apply"
          @click="applyUpdateTime">
          Apply
        </button>
        <button
          class="modal__button modal__button-cancel"
          @click="closeSettingModal">
          Cancel
        </button>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Props
const { currentWorkMin, currentBreakMin } = defineProps([
  'currentWorkMin',
  'currentBreakMin',
]);

// Data
const updatedWorkMin = ref(currentWorkMin);
const updatedBreakMin = ref(currentBreakMin);

// Computed
const convertedWorkMin = computed(() => {
  if (updatedWorkMin.value % 60 === 0) {
    return updatedWorkMin.value / 60 + ' H';
  } else {
    return updatedWorkMin.value + ' M';
  }
});

const convertedBreakMin = computed(() => {
  if (updatedBreakMin.value % 60 === 0) {
    return updatedBreakMin.value / 60 + ' H';
  } else {
    return updatedBreakMin.value + ' M';
  }
});

// Emits
const emit = defineEmits(['close-modal', 'update-timer']);

// Methods
const closeSettingModal = () => {
  emit('close-modal');
};

const applyUpdateTime = () => {
  closeSettingModal();
  const updatedTime = {
    work: updatedWorkMin.value,
    break: updatedBreakMin.value,
  };

  emit('update-timer', updatedTime);
};
</script>

<style scoped>
.modal-backdrop {
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100%;
}

.modal {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 30vw;
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--white-color);
  color: var(--dark-color);
}

.modal__header-title {
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.modal__header-desc {
  margin: 0;
  font-size: 1.3rem;
  color: var(--gray-color);
}

.modal__form-inputs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 2rem;
  font-size: 1.6rem;
}

.modal__form-input {
  display: flex;
  column-gap: 2rem;
}

.modal__form-slider {
  width: 50%;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.modal__button {
  width: 8rem;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  color: var(--white-color);
}

.modal__button-apply {
  background-color: var(--positive-color);
}

.modal__button-cancel {
  background-color: var(--negative-color);
}
</style>
