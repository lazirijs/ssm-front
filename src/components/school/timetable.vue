<template>
    <div class="flex flex-col">
      <div class="min-h-[96px]">
        <div class="flex-between">
          <h2>timetable <a v-if="getting && timetable.length" class="animate-pulse">...</a></h2>
          <icon-app v-if="loading" icon="svg-spinners:ring-resize" />
        </div>
        <div class="flex-between gap-4 my-4">
          <button class="btn-mini">
            <icon-app icon="fluent:add-12-filled" class="w-3" />
          </button>
          <div class="w-full flex-between gap-4">
            <input-app value="" @update="" icon="solar:document-bold" accessKey="c"
              type="search" center placeholder="course name" />
            <input-app value="" @update="" icon="fluent:person-24-filled" center placeholder="teacher name" />
            <input-app value="" @update="" icon="fluent:calendar-24-filled" center placeholder="course day" />
            from
            <input-app value="" @update="" type="time" center />
            to
            <input-app value="" @update="" type="time" max="" center />
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/plugins/axios.js';
import store from '@/store';

const { school } = defineProps({
  school: Object
});

const getting = ref(false);
const loading = ref(false);

const timetable = ref([]);
</script>