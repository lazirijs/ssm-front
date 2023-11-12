<template>
  <nav-app v-if="user" />
  <div class="h-full w-full flex gap-4 overflow-y-auto" :class="{ 'flex-col sm:flex-row': school }">
    <router-view v-if="user" class="w-full h-full bg-white rounded-v p-4 overflow-y-auto break-words" />
    <div v-else class="w-full flex-center bg-white rounded-v p-4 break-words uppercase">Loading...</div>
  </div>
</template>

<script setup>
import navApp from "@/components/nav-app.vue";
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const school = ref(false);

watch(() => route.path, async (newPath) => {
  school.value = newPath.startsWith("/school");
});

const store = useStore();
const user = ref(computed(() => store.state.user != null));
</script>
