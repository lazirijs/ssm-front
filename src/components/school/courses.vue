<template>
    <div class="flex flex-col">
        <div class="min-h-[96px]">
          <div class="flex-between">
            <h2>courses <a v-if="getting && courses.length" class="animate-pulse">...</a></h2>
            <icon-app v-if="loading" icon="svg-spinners:ring-resize" />
          </div>
          <div class="flex-between gap-4 my-4">
            <router-link :to="`/school/${school.code}/courses/new?name=${query.name}&teacher=${query.teacher}&price=${query.price}`" class="btn-mini">
              <icon-app icon="fluent:add-12-filled" class="w-3" />
            </router-link>
            <div class="w-full flex-between gap-4">
              <input-app :value="query.name"  @update="query.name = $event" type="search" icon="solar:documents-bold" placeholder="course name" accessKey="c" />
              <div class="w-full hidden md:flex-between gap-4">
                <input-app :value="query.teacher"  @update="query.teacher = $event" center class="" type="search" icon="fluent:person-24-filled" placeholder="teacher name" />
                <input-app :value="query.price"  @update="query.price = $event" center class="hidden lg:flex" type="number" icon="solar:tag-price-bold" placeholder="course price" />
              </div>
            </div>
          </div>
        </div>
        <h6 v-if="!courses.length" class="h-full flex-center">{{ getting ? "LOADING..." : "no data to display"}}</h6>
        <h5 v-else class="h-full space-y-4 overflow-y-auto">
            <router-link v-if="search.length" v-for="(course, index) in search" :key="index" :to="`/school/${school.code}/courses/${course.uid}`" translate="no" class="flex-between gap-4 bg-v bg-v-hover rounded-v py-3 cursor-pointer smooth">
              <div class="min-w-[36px] flex justify-end cursor-pointer">
                <icon-app icon="solar:document-bold" />
              </div>
              <div class="w-full flex-between gap-4 font-medium">
                <div dir="auto" class="w-full truncate mx-4 md:ml-4">{{ course.name }}</div>
                <div class="w-full hidden md:flex-between gap-4 text-center">
                    <div class="w-full truncate">{{ course.teacher }}</div>
                    <div class="w-full truncate hidden lg:block">{{ course.price }}</div>
                </div>
              </div>
            </router-link>
            <h6 v-else class="h-full flex-center">no data to display</h6>
            <!-- <h6 v-if="loadingMore && loadingMore != courses.length" class="text-center py-3">loading...</h6> -->
        </h5>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/plugins/axios.js';
import store from '@/store';

const { school } = defineProps({
  school: Object
});

const getting = ref(false);
const loading = ref(false);
// const loadingMore = ref(false);

const query = ref({
  // school: school.code,
  name: "",
  teacher: "",
  price: "",
});

const courses = ref(store.state.courses);

onMounted(async () => {
  getting.value = true;
  // loadingMore.value = false;
  const { data } = await api.get("/api/courses/get/all/" + school.code);
  courses.value = data;
  store.commit("set", {key: "courses", value: data});
  // loadingMore.value = data.length < 20 && data.length;
  getting.value = false;
});

const search = computed(() => {
  const { name, teacher, price } = query.value;
  return courses.value.filter((course) => 
    course.name.toLowerCase().includes(name.toLowerCase()) &&
    course.teacher.toLowerCase().includes(teacher.toLowerCase()) &&
    course.price.toLowerCase().includes(price.toLowerCase())
  );
});

// const search = async () => {
//   loading.value = true;
//   loadingMore.value = false;
//   const { data } = await api.post("/api/courses/search", query.value);
//   courses.value = data;
//   loadingMore.value = data.length < 20 && data.length;
//   loading.value = false;
// };

// const loadmore = async (event) => {
//   const scroll = event.target;
//   if(!loadingMore.value && scroll.scrollHeight - scroll.clientHeight - 250 < Math.round(scroll.scrollTop)) {
//     loadingMore.value = true;
//     const { data } = await api.post(`/api/courses/search?offset=${courses.value.length}`, query.value);
//     courses.value = [ ...courses.value, ...data ];
//     store.commit("set", {key: "courses", value: courses.value});
//     loadingMore.value = data.length < 20 && courses.value.length;
//   };
// };
</script>