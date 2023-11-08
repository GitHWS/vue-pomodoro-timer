<template>
  <div class="modal-backdrop" ref="backdrop" @click="closeSettingModal">
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
              @click.stop
              v-model="updatedWorkMin" />
            <datalist id="tickmarks">
              <option v-for="val in 6" :key="val" :value="val * 10" />
            </datalist>
            <span class="modal__form-cvtMin">{{ convertedWorkMin }}</span>
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
              @click.stop
              v-model="updatedBreakMin" />
            <datalist id="tickmarks">
              <option v-for="val in 6" :key="val" :value="val * 10" />
            </datalist>
            <span class="modal__form-cvtMin">{{ convertedBreakMin }}</span>
          </div>
        </form>
      </div>
      <footer class="modal__footer">
        <button
          class="modal__button modal__button-apply"
          ref="modalApplyBtn"
          @click="applyUpdateTime">
          Apply
        </button>
        <button
          class="modal__button modal__button-cancel"
          ref="modalCancelBtn"
          @click="closeSettingModal">
          Cancel
        </button>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Props
const { currentWorkMin, currentBreakMin } = defineProps([
  'currentWorkMin',
  'currentBreakMin',
]);

// Data
const backdrop = ref<HTMLDivElement | null>(null);
const modalApplyBtn = ref<HTMLButtonElement | null>(null);
const modalCancelBtn = ref<HTMLButtonElement | null>(null);

onMounted(() => {
  backdrop.value = backdrop.value;
  modalApplyBtn.value = modalApplyBtn.value;
  modalCancelBtn.value = modalCancelBtn.value;
});

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
const closeSettingModal = (event?: Event) => {
  if (event) {
    if (
      event.target === backdrop.value ||
      event.target === modalApplyBtn.value ||
      event.target === modalCancelBtn.value
    ) {
      emit('close-modal');
    }
  }
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
  width: 40vw;
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--white-color);
  color: var(--dark-color);
}

.modal__header {
  user-select: none;
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

.modal__form-label,
.modal__form-cvtMin {
  user-select: none;
}

.modal__form-slider {
  width: 50%;
  -webkit-app-region: no-drag;
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
