<template>
  <nav-app v-if="user" />
  <div class="h-full w-full flex gap-4 overflow-y-auto">
    <router-view v-if="user" class="bg-white rounded-v p-4 w-full overflow-y-auto break-words" />
    <div v-else class="bg-white rounded-v p-4 w-full break-words flex justify-center items-center uppercase">Loading...</div>
  </div>
</template>

<script setup>
import navApp from "@/components/nav-app.vue";
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = ref(computed(() => store.state.user != null ));
</script>