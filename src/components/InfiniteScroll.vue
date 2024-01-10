<script setup lang="ts">
import { ref } from 'vue';
import { defineProps } from 'vue';
import { useInfiniteScroll } from '@vueuse/core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faCodeBranch, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  items: any
}>();

const emit = defineEmits(['scrollAction']);

const listEl = ref(null);

useInfiniteScroll(
  listEl,
  async () => {
    emit('scrollAction');
  },
  {
    distance: 5,
    interval: 5000
  }
)
</script>

<template>
  <div class="items" ref="listEl">
    <div class="item" v-for="item in items" :key="item.id">
      <h3>
        <a :href="item.html_url" target="_blank">{{ item.name }}</a>
      </h3>
      <div class="stats">
        <span><FontAwesomeIcon :icon="faEye" /> {{ item.watchers_count }}</span>
        <span><FontAwesomeIcon :icon="faCodeBranch" /> {{ item.forks_count }}</span>
        <span><FontAwesomeIcon :icon="faStar" /> {{ item.stargazers_count }}</span>
      </div>
    </div>
    <FontAwesomeIcon :icon="faSpinner" class="spinner" pulse />
  </div>
</template>

<style scoped>
.items {
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

.item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 18px;
  width: 100%;
  text-decoration: none;
}

.item h3 {
  margin: 0 0 0 12px;
}

.item a {
  color: #fff;
  text-decoration: none;
}

.item .stats {
  margin: 0 12px 0 0;
}

.item span {
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  opacity: 0.5;
}

.item a:hover {
  text-decoration: underline;
}

.spinner {
  font-size: 30px;
  margin: 6px 0;
}

</style>
