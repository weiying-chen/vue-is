<script setup lang="ts">
import InfiniteScroll from './components/InfiniteScroll.vue';
</script>

<template>
  <div class="app">
    <InfiniteScroll />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
@import './styles.css';

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 20px;

  .error {
    color: #ff0000;
  }
}
</style>
