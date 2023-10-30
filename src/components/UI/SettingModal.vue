<template>
  <div>
    <section class="modal">
      <header class="modal__header">
        <h3 class="modal__header-title">⚙️ Setting</h3>
        <p class="modal__header-desc">You can set each time.</p>
      </header>
      <div></div>
      <footer></footer>
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
</style>
