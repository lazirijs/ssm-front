<template>
    <div dir="auto" class="bg-White rounded-v flex-1 flex flex-col gap-4 p-4">
    <div class="min-h-[24px] flex-between">
      <h4 class="font-bold">presence <a v-if="getting && lessons.length" class="animate-pulse">...</a></h4>
      <icon-app v-if="loading" icon="svg-spinners:ring-resize" />
      <icon-app v-else @click="comp = !comp" :icon="comp ? 'fluent:caret-up-16-filled' : 'fluent:caret-down-16-filled'"
        class="block sm:hidden cursor-pointer" />
      <icon-app v-if="!loading" @click="emits('zoom')"
        :icon="!data.zoom ? 'ic:round-zoom-out-map' : 'ic:round-zoom-in-map'" class="hidden sm:block cursor-pointer" />
    </div>
      <h6 v-if="data.student.isNew || !lessons.length" class="h-full flex-center pb-2">{{ data.student.isNew ? "you have to create student first" : "no data to display" }}</h6>
      <div v-if="!data.student.isNew && lessons.length" class="min-h-[36px] gap-2" :class="{ 'hidden sm:flex-between': !comp, 'flex-between': comp }">
        <div class="w-full grid grid-cols-6 gap-2">
          <input-app :value="query.course" @update="query.course = $event" type="search" placeholder="courses" class="col-span-4" />
          <input-app :value="query.created_at" @update="query.created_at = $event" type="date" class="col-span-2" center />
        </div>
        <div class="flex-center min-w-fit h-[36px] bg-v rounded-v p-2 cursor-pointer">
          <div @click="query.color = changeColor(query.color)" class="min-w-[1rem] h-4 rounded-full smooth" :style="`background: ${query.color};`"></div>
        </div>
      </div>
      <div v-if="!data.student.isNew && lessons.length" class="h-full space-y-4" :class="{ 'hidden sm:block': !comp }">
        <div class="sm:h-full space-y-4 overflow-y-auto" :class="{ 'max-h-[250px]': !data.zoom }">
          <h5 v-for="(lesson, index) in search" :key="index" class="flex-between gap-2 sm:gap-4 bg-v bg-v-hover rounded-v p-2 smooth">
              <div class="w-full grid grid-cols-6 gap-2">
                  <div class="truncate col-span-4">{{ courseName(lesson.course) }}</div>
                  <div class="truncate text-center col-span-2">{{ $toDate(lesson.created_at) }}</div>
              </div>
              <div class="min-w-[1rem] h-4 rounded-full smooth" :style="`background: ${lesson?.presents?.includes(data.student.uid) ? '#0B6E4F' : '#FA9F42' };`"></div>
          </h5>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed , onMounted } from "vue";
import { toDate } from "@/utilities/date";
import api from '@/plugins/axios.js';
import { useStore } from 'vuex';

const store = useStore();

const { data } = defineProps(["data"]);
const emits = defineEmits(["zoom"]);

const comp = ref(false);
const getting = ref(false);
const loading = ref(false);

const lessons = ref(store.state.lessons);
const courseName = e => computed(() => store.state.courses.find(({ uid }) => uid == e )?.name);

const query = ref({
  course: "",
  created_at: null,
  color: "#212937",
});

const changeColor = color => {
  switch (color) {
    case '#212937':
      return '#0B6E4F';
    case '#0B6E4F':
      return '#FA9F42';
    default:
      return '#212937';
  }
};

onMounted(async () => {
  if (data.student.uid) {
    getting.value = true;
    const result = await api.get("/api/lessons/get/student/" + data.student.uid);
    lessons.value = result.data;
    // loadingMore.value = data.length < 20 && data.length;
    getting.value = false;
  }
});

const search = computed(() => {
  const { course, color, created_at } = query.value;

  const isPresent = color === "#0B6E4F";
  const isAbsent = color === "#FA9F42";

  return lessons.value.filter(lesson => {
    // Filter by course name
    const courseMatches = store.state.courses.find(({ name, uid }) => 
      name.toLowerCase().includes(course.toLowerCase()) && uid == lesson.course
    );

    // Filter by color
    const presentCondition = isPresent ? lesson.presents.includes(data.student.uid) : true;
    const absentCondition = isAbsent ? lesson.absents.includes(data.student.uid) : true;

    // Filter by created_at
    const createdAtCondition = created_at ?
      toDate(created_at) === toDate(lesson.created_at) : true;

    // Apply all conditions
    return courseMatches && presentCondition && absentCondition && createdAtCondition;
  });
});
</script>
