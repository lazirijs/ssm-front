<template>
    <div v-bind="$attrs" class="space-y-4">
        <div class="flex-between">
            <h2>dashboard</h2>
            <h6 translate="no" class="font-medium">{{ school.link.rule }}</h6>
        </div>
        <div class="grid gap-4 text-center mx-auto">
            <h2  translate="no" class="tracking-[.0125rem] ml-[.0125rem]">{{school.name}}</h2>
            <h5 @click="copy(school.code)">
                <a  translate="no" class="tracking-[.125rem] ml-[.125rem] font-medium uppercase">{{ school.code }}</a>
                <br> 
                <h6 class="text-gray-600 dark:text-gray-400 mt-2 cursor-pointer">tap here to copy school code</h6>
            </h5>
        </div>
        <div class="border-b border-solid border-v w-full"></div>
        <div class="">
            <input-app :value="search" @update="search = $event" icon="iconamoon:search-bold" class="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 mx-auto mt-8 mb-12" type="search" placeholder="search in app" accessKey="s" />
            <div v-if="searchList.length" class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
                <router-link v-for="Route in searchList" :to="Route.path" class="flex gap-2 bg-v p-4 rounded-v bg-v-hover smooth cursor-pointer">
                    <icon-app :icon="Route.icon" size="24" />
                    <div class="grid gap-2">
                        <div class="font-medium first-letter:uppercase">{{ Route.name }}</div>
                        <h6 class="truncate">{{ Route.description }}</h6>
                    </div>
                </router-link>
            </div>
            <h6 v-else class="h-full flex-center">no data to display</h6>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import store from '@/store';
import { useRoute } from 'vue-router'

const route = useRoute();

const code = route.params.code;
const school = ref(computed(() => store.state.schools.filter((i) => i.code == code)[0]));

const search = ref("");
const Routes = ref([
    {
        name: 'New Student',
        icon: 'fluent:person-32-filled',
        path: `/school/${code}/students/new`,
        description: 'add a new student to the school'
    },
    {
        name: 'Students List',
        icon: 'fluent:people-12-filled',
        path: `/school/${code}/students`,
        description: 'list of the school students'
    },
    {
        name: 'New Course',
        icon: 'solar:document-bold',
        path: `/school/${code}/courses/new`,
        description: 'add a new course to the school'
    },
    {
        name: 'Courses List',
        icon: 'solar:documents-bold',
        path: `/school/${code}/courses`,
        description: 'list of the school courses'
    },
    {
        name: 'Timetable',
        icon: 'fluent:calendar-ltr-24-filled',
        path: `/school/${code}/timetable`,
        description: 'manage school timetable'
    },
    {
        name: 'finance',
        icon: 'fa6-solid:money-check-dollar',
        path: `/school/${code}/finance`,
        description: 'manage school finance'
    },
    {
        name: 'settings',
        icon: 'fluent:settings-48-filled',
        path: `/school/${code}/settings`,
        description: 'manage school settings'
    },
    {
        name: 'users',
        icon: 'fluent:people-12-filled',
        path: `/school/${code}/settings/users`,
        description: 'manage school users'
    },
    {
        name: 'new user',
        icon: 'fluent:person-32-filled',
        path: `/school/${code}/settings/users/new`,
        description: 'add a new user to the school'
    },
    {
        name: 'rules',
        icon: 'fluent:people-settings-28-filled',
        path: `/school/${code}/settings/users/rules`,
        description: 'manage school rules'
    },
    {
        name: 'language',
        icon: 'material-symbols:language-japanese-kana-rounded',
        path: `/school/${code}/settings/language`,
        description: 'edite app language'
    }
]);

const searchList = computed(() =>  Routes.value.filter((item) => 
    item.name.toLowerCase().includes(search.value.toLowerCase()) ||
    item.description.toLowerCase().includes(search.value.toLowerCase())
));

const copy = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};
</script>