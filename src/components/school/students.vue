<template>
    <div class="flex flex-col">
        <div class="min-h-[96px]">
            <h2>students</h2>
            <form dir="rtl" @submit.prevent="submitForm" class="grid grid-cols-10 gap-4 my-4">
                <btn-app dir="auto" @click="" icon="fluent:search-12-filled" class="col-span-2 md:hidden min-w-full" />
                <btn-app dir="auto" @click="" text="search" icon="fluent:search-12-filled" class="hidden md:flex col-span-2 lg:col-span-1 min-w-full lg:max-w-full" />
                <input-app dir="auto" :value="query.phone" @update="query.phone = $event" class="hidden lg:flex col-span-2" type="tel" icon="fluent:call-24-filled" />
                <input-app dir="auto" :value="query.email" @update="query.email = $event" class="hidden md:flex col-span-2" type="email" icon="fluent:mail-24-filled" />
                <input-app dir="auto" :value="query.birthday" @update="query.birthday = $event" class="hidden sm:flex col-span-3 md:col-span-2" type="date" icon="fluent:calendar-24-filled" />
                <input-app dir="auto" :value="query.name" @update="query.name = $event" class="col-span-6 sm:col-span-3 md:col-span-2" icon="fluent:person-24-filled" />
                <btn-app dir="auto" @click="router.push(`/school/${code}/students/new`)" dark icon="fluent:add-12-filled" class="col-span-2 md:hidden min-w-full" />
                <btn-app dir="auto" @click="router.push(`/school/${code}/students/new`)" text="add" dark icon="fluent:add-12-filled" class="hidden md:flex col-span-2 lg:col-span-1 min-w-full lg:max-w-full" />
            </form>
        </div>
        <div class="h-full space-y-4 overflow-y-auto">
            <div v-for="(student, index) in students" :key="index" class="bg-v rounded-v grid grid-cols-10 gap-4 p-2 text-center items-center font-medium cursor-pointer smooth">
                <div @click="router.push(`/school/${code}/students/${index}`)" class="flex justify-start col-span-2 lg:col-span-1">
                    <div class="bg-g3 min-w-[2.25rem] h-[2.25rem] flex-center rounded-full cursor-pointer smooth">
                        <icon-app icon="fluent:person-24-filled" />
                    </div>
                </div>
                <h5 @click="router.push(`/school/${code}/students/${index}`)" class="truncate col-span-3 md:col-span-2">{{ student.name }}</h5>
                <h5 @click="router.push(`/school/${code}/students/${index}`)" class="truncate col-span-3 md:col-span-2">{{ student.birthday }}</h5>
                <a :href="`mailto:${student.email}`" class="text-sm truncate col-span-2 hidden md:block hover:link smooth">{{ student.email }}</a>
                <a :href="`tel:${student.phone}`" class="text-sm truncate col-span-2 hidden lg:block hover:link smooth">{{ student.phone }}</a>
                <div class="flex justify-end col-span-2 lg:col-span-1">
                    <div @click="selected.push(index)" class="bg-g3 min-w-[1.75rem] min-h-[1.75rem] flex-center rounded-v cursor-pointer smooth mr-1">
                        <icon-app :icon="selected.includes(index) && 'fluent:checkmark-12-filled'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore();
const route = useRoute();
const router = useRouter();

const code = route.params.code;
const school = ref(computed(() => store.state.schools.filter((i) => i.code == code)[0]));

const students = ref([
  {
    name: "Ahmed Salah",
    birthday: "2001-03-15",
    email: "ahmed@email.com",
    phone: "0501234567",
  },
  {
    name: "Layla Hassan",
    birthday: "2000-05-20",
    email: "layla@email.com",
    phone: "0678912345",
  },
  {
    name: "Khalid Ali",
    birthday: "2004-12-10",
    email: "khalid@email.com",
    phone: "0712345678",
  },
  {
    name: "Noura Mahmoud",
    birthday: "2003-08-05",
    email: "noura@email.com",
    phone: "0609876543",
  },
  {
    name: "Omar Ahmed",
    birthday: "2002-10-25",
    email: "omar@email.com",
    phone: "0723456789",
  },
  {
    name: "Sara Hassan",
    birthday: "2005-04-30",
    email: "sara@email.com",
    phone: "0654321098",
  },
  {
    name: "Youssef Ibrahim",
    birthday: "2000-06-12",
    email: "youssef@email.com",
    phone: "0776543210",
  },
  {
    name: "Rana Adel",
    birthday: "2001-02-18",
    email: "rana@email.com",
    phone: "0509876543",
  },
  {
    name: "Mona Samir",
    birthday: "2004-09-08",
    email: "mona@email.com",
    phone: "0701234567",
  },
  {
    name: "Mahmoud Ali",
    birthday: "2002-11-27",
    email: "mahmoud@email.com",
    phone: "0678901234",
  }
]);

const query = ref({
    name: "",
    birthday: "",
    email: "",
    phone: ""
});
const selected = ref([]);
</script>