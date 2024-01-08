<script setup lang="ts">
import { ref } from 'vue';
import getUsers from '../api/getUsers'
import { useInfiniteScroll } from "@vueuse/core"

const listEl = ref(null);
const usersToShow = 15;
const usersList = ref(await getUsers(usersToShow, 0));
const fetchingData = ref(false); 
const noMoreUsers = ref(false);

const getUserOnScroll = async () => {
  if(noMoreUsers.value) return;

  fetchingData.value = true;
  await new Promise((res) => setTimeout(res, 2000));

  try {
    const newUsers = await getUsers(
      usersToShow,
      usersList.value.length
    );

    if (newUsers.length === 0) {
      noMoreUsers.value = true;
    }

    fetchingData.value = false;
    usersList.value.push(...newUsers);
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
    <ul ref="listEl">
      <li v-for="user in usersList">
        {{ user.firstName }}
      </li>
    </ul>
    <p v-show="fetchingData">
      Fetching more users... please hold
    </p>
  </div>
</template>

<style scoped>
ul {
  background-color: #41b480;
  list-style: none;
  max-height: 600px;
  width: 600px;
  overflow: scroll;
  padding: 12px 20px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}

li {
  padding: 12px 0;
  color: #fff;
  font-size: 18px;
}
</style>
