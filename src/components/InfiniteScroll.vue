<script setup lang="ts">
import { ref } from 'vue';
import getRepos from '../api/getRepos'
import { useInfiniteScroll } from "@vueuse/core"

const listEl = ref(null);
const username = 'tj';
const perPage = 10;
const repoList = ref(await getRepos(username, perPage));
const fetchingData = ref(false); 
const noMoreUsers = ref(false);

const getUserOnScroll = async () => {
  if(noMoreUsers.value) return;

  fetchingData.value = true;
  await new Promise((res) => setTimeout(res, 2000));

  try {
    const newRepos = await getRepos(
      username,
      perPage,
    );

    if (newRepos.length === 0) {
      noMoreUsers.value = true;
    }

    fetchingData.value = false;
    repoList.value.push(...newRepos);
  } catch (err) {
    console.log(err);
  }
}

useInfiniteScroll(
  listEl,
  async () => {
    await getUserOnScroll();
  },
  { distance: 10 }
)
</script>

<template>
  <div>
    <div class="repos" ref="listEl">
      <div class="repo" v-for="repo in repoList">
        {{ repo.name }}
      </div>
    </div>
    <p v-show="fetchingData">
      Fetching more users... please hold
    </p>
  </div>
</template>

<style scoped>
.repos {
  background-color: #41b480;
  list-style: none;
  max-height: 400px;
  width: 600px;
  overflow: scroll;
  padding: 12px 20px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.repo {
  padding: 12px 0;
  color: #fff;
  font-size: 18px;
}
</style>
