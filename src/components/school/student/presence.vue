<template>
    <div dir="auto" class="bg-White rounded-v flex-1 flex flex-col gap-4 p-4">
    <div class="min-h-[24px] flex-between">
      <h4>presence <a v-if="getting && lessons.length" class="animate-pulse">...</a></h4>
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
          <h5 v-for="(lesson, index) in lessons" :key="index" class="flex-between gap-2 sm:gap-4 bg-v bg-v-hover rounded-v p-2 smooth">
              <div class="w-full grid grid-cols-6 gap-2">
                  <div class="truncate col-span-4">{{ store.state.courses.find(obj => obj.uid == lesson.course)?.name }}</div>
                  <div class="truncate text-center col-span-2">{{ $toDate(lesson.created_at) }}</div>
              </div>
              <div class="min-w-[1rem] h-4 rounded-full smooth" :style="`background: ${lesson?.presents?.includes(data.student.uid) ? '#0B6E4F' : '#FA9F42' };`"></div>
          </h5>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from '@/plugins/axios.js';
import { useStore } from 'vuex';

const store = useStore();

const { data } = defineProps(["data"]);
const emits = defineEmits(["zoom"]);

const comp = ref(false);
const getting = ref(false);
const loading = ref(false);

// const presence = ref([
//   // {
//   //   date: '10-11-2023',
//   //   student: 'c041fc4b-b760-4ca9-83b5-218560a6cae8',
//   //   course: 'Math of the 4th year of primary school',
//   //   status: 'present'
//   // },
//   // {
//   //   date: '10-11-2023',
//   //   student: 'd84ce632-2f14-48e5-9f65-f4c18b5506bc',
//   //   course: 'Science of the 5th year of primary school',
//   //   status: 'absent'
//   // },
//   // {
//   //   date: '11-11-2023',
//   //   student: 'a7e1c6c8-9e07-4eb2-82ef-9c8b3dbcc03d',
//   //   course: 'English of the 6th year of primary school',
//   //   status: 'present'
//   // },
//   // {
//   //   date: '12-11-2023',
//   //   student: 'f823f6c7-8a3e-4e4f-baa4-2c5b3f1ec92f',
//   //   course: 'History of the 7th year of primary school',
//   //   status: 'absent'
//   // },
//   // {
//   //   date: '13-11-2023',
//   //   student: '9d6716ef-ef1e-4ad0-8a38-baf57e3e8719',
//   //   course: 'Geography of the 8th year of primary school',
//   //   status: 'present'
//   // },
//   // {
//   //   date: '14-11-2023',
//   //   student: '32efde3d-d23c-42c5-b73d-6e1a3c53c8c9',
//   //   course: 'Math of the 9th year of primary school',
//   //   status: 'absent'
//   // },
//   // {
//   //   date: '15-11-2023',
//   //   student: 'b972b25e-865b-487d-9d02-60a998bf46fb',
//   //   course: 'Biology of the 10th year of primary school',
//   //   status: 'present'
//   // },
//   // {
//   //   date: '16-11-2023',
//   //   student: 'fe8b6a36-4e0a-49c3-95ea-0e20f5e6cb09',
//   //   course: 'Chemistry of the 11th year of primary school',
//   //   status: 'absent'
//   // },
//   // {
//   //   date: '17-11-2023',
//   //   student: 'c845fcdc-7415-4bf8-9de2-8876117e5991',
//   //   course: 'Physics of the 12th year of primary school',
//   //   status: 'present'
//   // },
//   // {
//   //   date: '18-11-2023',
//   //   student: 'a7105b35-6282-4c5e-b1cf-2a4f1029f8c3',
//   //   course: 'Art of the 13th year of primary school',
//   //   status: 'absent'
//   // }
// ]);

const lessons = ref(store.state.lessons);

const query = ref({
  course: "",
  created_at: null,
  color: "#212937",
});

const changeColor = (color) => {
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
</script>
