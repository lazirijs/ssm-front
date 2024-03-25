<template>
  <div dir="auto" class="bg-White rounded-v flex-1 flex-col gap-4 p-4">
    <div class="min-h-[24px] flex-between">
      <h4>courses <a v-if="getting && courses.length" class="animate-pulse">...</a></h4>
      <!-- <icon-app v-if="loading" icon="svg-spinners:ring-resize" /> -->
      <icon-app @click="comp = !comp" :icon="comp ? 'fluent:caret-up-16-filled' : 'fluent:caret-down-16-filled'"
        class="block sm:hidden cursor-pointer" />
      <icon-app @click="emits('zoom')"
        :icon="!data.zoom ? 'ic:round-zoom-out-map' : 'ic:round-zoom-in-map'" class="hidden sm:block cursor-pointer" />
    </div>

    <h6 v-if="data.student.isNew" class="h-full flex-center pb-2">you have to create student first</h6>
    <h6 v-else-if="getting && !courses.length" class="h-full flex-center pb-2">LOADING...</h6>
    <h6 v-else-if="!courses.length" class="h-full flex-center pb-2">no data to display</h6>
    
    <!-- <form @submit.prevent="submitForm" v-if="!data.student.isNew && courses.length" class="min-h-[36px] gap-2" :class="{ 'hidden sm:flex-between': !comp, 'flex-between': comp }">
      <input-app :value="query.name" @update="query.name = $event" type="search" icon="solar:document-bold" placeholder="course name" />
      <div @click="queryColor = changeColor(queryColor)"
        class="flex-center min-w-fit h-[36px] bg-v rounded-v p-2 cursor-pointer">
        <div class="min-w-[1rem] h-4 rounded-full smooth" :style="`background: ${queryColor};`"></div>
      </div>
      <button @click="search()" class="hidden" />
    </form> -->
    
    <div v-if="!data.student.isNew && courses.length" class="min-h-[36px] gap-2" :class="{ 'hidden sm:flex-between': !comp, 'flex-between': comp }">
      <input-app :value="query.course" @update="query.course = $event" type="search" icon="solar:document-bold" placeholder="course name" />
      <div @click="query.color = changeColor(query.color)" class="flex-center min-w-fit h-[36px] bg-v rounded-v p-2 cursor-pointer">
        <div class="min-w-[1rem] h-4 rounded-full smooth" :style="`background: ${query.color};`"></div>
      </div>
    </div>

    <div v-if="!data.student.isNew && courses.length" class="h-full space-y-4" :class="{ 'hidden sm:block': !comp }">
      <div class="sm:h-full space-y-4 overflow-y-auto" :class="{ 'max-h-[250px]': !data.zoom }">
        <h5 v-if="search.length" v-for="(item, index) in search" :key="index" @click="getting ? false : (selected = { ...selected, student: data.student.uid, course: item.uid, course_name: item.name,price: item.price, total: item.price * selected.quantity })"
          class="flex-between gap-2 sm:gap-4 rounded-v p-2 smooth cursor-pointer"
          :class="{ 'bg-dark': selected.course == item.uid, 'bg-v bg-v-hover': selected.course != item.uid }">
          <div dir="auto" translate="no" class="w-full truncate">{{ item.name }}</div>
          <div class="min-w-fit flex-between gap-4">
            <h5 class="min-w-fit">{{ item.price }} DZD</h5>
            <div class="min-w-[1rem] h-4 rounded-full smooth"
              :style="`background: ${store.state.payments.some(obj => obj.course == item.uid && obj.student == data.student.uid) ? '#0B6E4F' : '#FA9F42'};`"></div>
          </div>
        </h5>
        <h6 v-else class="h-full flex-center">no data to display</h6>
        <!-- <h6 v-if="loadingMore && loadingMore != courses.length" class="text-center py-3">loading...</h6> -->
      </div>
    </div>
    <form @submit.prevent="submitForm" v-if="!data.student.isNew && !getting && selected.course"
      class="sm:flex gap-4 min-h-[36px]" :class="{ 'hidden': !comp, 'flex': comp }">
      <div class="w-full flex-between gap-4">
        <div class="w-1/3">
          <input-app required :readonly="loading" :value="selected.quantity" @update="totalCalculation($event, selected.price)"
            type="number" placeholder="4 x " center />
        </div>
        <div class="w-2/3">
          <input-app required :readonly="loading" :value="selected.total"
            @update="selected.total = $event" icon="material-symbols:attach-money-rounded" type="number"
            placeholder="4000.00 DZD" center />
        </div>
      </div> 
      <btn-app class="min-w-fit" @click="create(selected)" text="save" dark :loading="loading"
        icon="fluent:add-12-filled" />
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from '@/plugins/axios.js';
import { useStore } from 'vuex';

const store = useStore();

const { data } = defineProps(["data"]);
const emits = defineEmits(["zoom"]);

const comp = ref(false);
const getting = ref(false);
const loading = ref(false);
// const loadingMore = ref(false);

const selected = ref({
  school: data.school.code,
  student: data.student.uid,
  course: null,
  course_name: null,
  price: null,
  total: null,
  quantity: 4
});

const query = ref({
  course: "",
  color: "#212937",
});

const courses = ref(store.state.courses);

// const localCourses = computed(() => store.state.courses);
// const courses = ref(localCourses.value);
// watchEffect(() => {
  //   courses.value = localCourses.value;
  // });

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
  getting.value = true;
  const result = await api.get("/api/courses/get/all/" + data.school.code);
  courses.value = result.data;
  store.commit("set", {key: "courses", value: result.data});
  getting.value = false;
});

const totalCalculation = (quantity,price) => {
  selected.value.quantity = quantity;
  selected.value.total = quantity *price;
};

const create = async (e) => {
  if (!Object.values(e).includes(null) && window.confirm("Do you want to create a new payment")) {
    try {
      loading.value = true;
      const result = await api.post("/api/payments/create", e);
      store.commit("add", {key: "payments", value: result.data});
      loading.value = false;
      selected.value = {
        school: data.school.code,
        student: data.student.uid,
        course: null,
        price: null,
        total: null,
        quantity: 1
      };
    } catch (error) {
      console.log(error.message);
    }
  }
};

const search = computed(() => {
  const { course, color } = query.value;

  const paid = color == "#0B6E4F";
  const unpaid = color == "#FA9F42";

  const isPaid = (uid) => store.state.payments.some(obj => obj.course == uid && obj.student == data.student.uid);
  
  return courses.value.filter(({name, uid}) => 
    name.toLowerCase().includes(course.toLowerCase()) && (paid ? isPaid(uid) : (unpaid ? !isPaid(uid) : true))
  );
});
</script>