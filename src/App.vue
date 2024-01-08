<script setup lang="ts">
import InfiniteScroll from './components/InfiniteScroll.vue';
</script>

<template>
  <main>
    <h1>Infinite Scrolling Component</h1>
    <Suspense>
      <InfiniteScroll />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
    <p>Made with ♥ by Wei-Ying Chen</p>
  </main>
</template>

<style>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
