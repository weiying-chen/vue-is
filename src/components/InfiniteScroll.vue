<script setup lang="ts">
import { ref } from 'vue';
import getRepos from '../api/getRepos'
import { useInfiniteScroll } from '@vueuse/core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faCodeBranch, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons'

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

    console.log(newRepos)

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
  { distance: 5 }
)
</script>

<template>
  <div class="repos" ref="listEl">
    <div class="repo" v-for="repo in repoList" :key="repo.id">
      <h3>
        <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
      </h3>
      <div class="stats">
        <span><FontAwesomeIcon :icon="faEye" /> {{ repo.watchers_count }}</span>
        <span><FontAwesomeIcon :icon="faCodeBranch" /> {{ repo.forks_count }}</span>
        <span><FontAwesomeIcon :icon="faStar" /> {{ repo.stargazers_count }}</span>
      </div>
    </div>
    <FontAwesomeIcon :icon="faSpinner" class="spinner" pulse />
  </div>
</template>

<style scoped>
.repos {
  background-color: #41b480;
  display: flex;
  color: #fff;
  flex-direction: column;
  align-items: center;
  max-height: 400px;
  max-width: 600px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

.repo {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 18px;
  width: 100%;
  text-decoration: none;
}

.repo h3 {
  margin: 0 0 0 12px;
}

.repo a {
  color: #fff;
  text-decoration: none;
}

.repo .stats {
  margin: 0 12px 0 0;
}

.repo span {
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  opacity: 0.5;
}

.repo a:hover {
  text-decoration: underline;
}

.spinner {
  font-size: 30px;
  margin: 6px 0;
}

</style>
