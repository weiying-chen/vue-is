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
    <p>Crafted by <a href="https://github.com/weiying-chen"> Wei-ying Chen</a></p>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

main {
  font-family: "Nunito", sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

main h1 {
  color: #222;
  text-align: center;
}

main p {
  color: #666;
}

main a {
  color: #41b480;
  text-decoration: none;
}

main a:hover {
  text-decoration: underline;
}
</style>
