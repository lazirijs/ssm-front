<template>
  <nav v-if="school" class="flex justify-between min-w-full sm:min-w-fit bg-white rounded-v overflow-x-auto sm:overflow-y-auto flex-col p-1 min-h-[48px] sm:h-auto">
    <div class="h-full">
      <div class="grid grid-flow-col sm:grid-flow-row gap-1 overflow-auto">
        <router-link 
          v-for="(item, index) in nav" :key="index" :to="`/school/${code}/${item.path}`"
          :style="`background: ${route.path.startsWith(`/school/${code}/${item.path}`) ? '#e5e7eb' : ''};`" 
          class="w-10 h-10 hover:bg-v flex-center rounded-v cursor-pointer smooth"
        >
          <icon-app :icon="item.icon" />
        </router-link>
        <router-link to="/contactus" class="w-10 h-10 hover:bg-v flex-center rounded-v cursor-pointer smooth sm:hidden">
          <icon-app icon="fluent:chat-12-filled" />
        </router-link>
        <router-link to="/help" class="w-10 h-10 hover:bg-v flex-center rounded-v cursor-pointer smooth sm:hidden">
          <icon-app icon="fluent:question-circle-12-filled" />
        </router-link>
      </div>
    </div>
    <div class="hidden sm:block min-h-[120px]">
      <router-link to="/contactus" class="w-10 h-10 hover:bg-v flex-center rounded-v cursor-pointer smooth">
        <icon-app icon="fluent:chat-12-filled" />
      </router-link>
      <router-link to="/help" class="w-10 h-10 hover:bg-v flex-center rounded-v cursor-pointer smooth">
        <icon-app icon="fluent:question-circle-12-filled" />
      </router-link>
      <div class="w-10 h-10 hover:bg-v flex-center rounded-v cursor-pointer smooth">
        <icon-app icon="fluent:chevron-right-12-filled" />
      </div>
    </div>
  </nav>
  <router-view v-if="school" v-bind="$attrs" />
  <div v-else v-bind="$attrs" class="flex-center uppercase">Loading...</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from '@/plugins/axios.js';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const route = useRoute();

const nav = ref([
  {
    icon: "fluent:grid-24-filled",
    path: "dashboard"
  },
  {
    icon: "fluent:person-note-16-filled",
    path: "students"
  },
  {
    icon: "fluent:slide-text-person-16-filled",
    path: "teachers"
  },
  {
    icon: "solar:documents-bold",
    path: "courses"
  },
  {
    icon: "fluent:calendar-ltr-24-filled",
    path: "timetable"
  },
  {
    icon: "solar:pie-chart-2-bold",
    path: "statistics"
  },
  {
    icon: "fa6-solid:money-check-dollar",
    path: "finance"
  },
  {
    icon: "fluent:settings-48-filled",
    path: "settings"
  },
]);

const getting = ref(false);
const code = route.params.code;
const school = ref(computed(() => store.state.schools.filter((i) => i.code == code)[0]));

onMounted(async () => {
  getting.value = true;
  const result = await api.get("/api/schools/get/" + code );
  store.commit("addSchool", result.data);
  getting.value = false;
});
</script>