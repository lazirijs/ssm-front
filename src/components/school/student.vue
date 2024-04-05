<template>
  <div v-bind="$attrs" class="hidden" />
  <div class="w-full h-fit sm:h-auto sm:flex sm:flex-col space-y-4 overflow-y-auto">
    <div v-if="[false, 'informations', 'courses'].includes(zoom)" class="w-full sm:flex sm:gap-4 space-y-4 sm:space-y-0" :class="{ 'h-full': zoom, 'sm:h-1/2': !zoom}">
      <student-informations v-if="$store.getters.permission('students:information:access') && [false, 'informations'].includes(zoom)" @zoom="zoom = (zoom != 'informations' && 'informations')" :data="{ zoom, school, student }" />
      <student-courses v-if="$store.getters.permission('students:courses:access') && [false, 'courses'].includes(zoom)" :zoom="zoom" @zoom="zoom = (zoom != 'courses' && 'courses')" :data="{ zoom, school, student }" :class="{ 'hidden sm:flex': student.isNew, 'flex': !student.isNew }" />
    </div>
    <div v-if="[false, 'payment', 'presence'].includes(zoom)" class="w-full sm:flex sm:gap-4 space-y-4 sm:space-y-0" :class="{ 'h-full': zoom, 'sm:h-1/2': !zoom, 'hidden': student.isNew }">
      <student-payments v-if="$store.getters.permission('students:payments:access') && [false, 'payment'].includes(zoom)" :zoom="zoom" @zoom="zoom = (zoom != 'payment' && 'payment')" :data="{ zoom, school, student }" />
      <student-presence v-if="$store.getters.permission('students:presence:access') && [false, 'presence'].includes(zoom)" :zoom="zoom" @zoom="zoom = (zoom != 'presence' && 'presence')" :data="{ zoom, school, student }" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import studentCourses from "./student/courses";
import studentPayments from "./student/payments";
import studentPresence from "./student/presence";
import studentInformations from "./student/informations";

const route = useRoute();
const router = useRouter();

const student = ref({
  isNew: route.name == 'new student',
  uid: route.params.student
});

const { school } = defineProps({
  school: Object
});

router.beforeEach((to, from, next) => {
  student.value = {
    isNew: to.name == 'new student',
    uid: to.params.student
  }
  next();
});

const zoom = ref(false);
</script>
