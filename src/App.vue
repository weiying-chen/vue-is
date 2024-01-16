<script setup lang="ts">
import { ref } from 'vue';
import { Repo } from './types';
import RepoList from './components/RepoList.vue';
import fetchRepos from './api/fetchRepos';

const username = 'tj';
const perPage = 10;
const repos = ref<Repo[]>([]);
const noMoreRepos = ref(false);

async function getRepos() {
  if (noMoreRepos.value) return;

  try {
    const newRepos = await fetchRepos(username, perPage);

    if (newRepos.length === 0) {
      noMoreRepos.value = true;
    }

    repos.value.push(...newRepos);
  } catch (err) {
    console.error(err);
  }
}
</script>

<template>
  <main>
    <h1>{{ username }}'s repos</h1>
    <Suspense>
      <RepoList :repos="repos" @scroll-action="getRepos" />
    </Suspense>
    <p>
      Crafted by <a href="https://github.com/weiying-chen"> Wei-ying Chen</a>
    </p>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

main {
  font-family: 'Nunito', sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

main h1 {
  color: #222;
  text-align: center;
  text-transform: capitalize;
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
