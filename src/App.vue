<script setup lang="ts">
import { ref } from 'vue';
import { Repo } from './types'
import RepoList from './components/RepoList.vue';
import fetchRepos from './api/fetchRepos'

const username = 'tj';
const perPage = 10;
const repos = ref<Repo[]>([]);
const fetchingRepos = ref(false); 
const noMoreRepos = ref(false);

async function getRepos() {
  if (noMoreRepos.value) return;

  fetchingRepos.value = true;

  try {
    const newRepos = await fetchRepos(
      username,
      perPage,
    );

    if (newRepos.length === 0) {
      noMoreRepos.value = true;
    }

    fetchingRepos.value = false;
    repos.value.push(...newRepos);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <main>
    <h1>{{ username }}'s repos</h1>
    <Suspense>
      <RepoList
        :repos="repos"
        @scrollAction="getRepos"
      />
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

main {
  h1 {
    color: #222;
    text-align: center;
    text-transform: capitalize;
  }
  
  p {
    color: #666;
  }
  
  a {
    color: #41b480;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
