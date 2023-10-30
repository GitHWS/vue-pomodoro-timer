<template>
  <div>
    <section class="modal">
      <header class="modal__header">
        <h3 class="modal__header-title">⚙️ Setting</h3>
        <p class="modal__header-desc">You can set each time.</p>
      </header>
      <div class="modal__form">
        <form class="modal__form-inputs">
          <div class="modal__form-input">
            <label for="work-min" class="modal__form-label">Work Time</label>
            <input type="range" id="work-min" class="modal__form-slider" />
          </div>
          <div class="modal__form-input">
            <label for="break-min" class="modal__form-label">Break Time</label>
            <input type="range" id="break-min" class="modal__form-slider" />
          </div>
        </form>
      </div>
      <footer>
        <button>Apply</button>
        <button>Cancel</button>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.modal {
  width: 30vw;
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--white-color);
  color: var(--dark-color);
}

.modal__header {
  margin-bottom: 2rem;
}

.modal__header-title {
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 1rem;
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
  width: 30rem;
}
</style>
