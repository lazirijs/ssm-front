<template>
    <div v-bind="$attrs" class="space-y-4">
        <div class="text-pro">dashboard</div>
        <div class="grid gap-4 text-center mx-auto">
            <h2 class="tracking-[.0125rem] ml-[.0125rem]">{{school.name}}</h2>
            <h5 @click="copy(school.code)">
                <a class="tracking-[.125rem] ml-[.125rem] font-medium uppercase">{{ school.code }}</a>
                <br> 
                <h6 class="mini-text mt-2 cursor-pointer">tap here to copy school code</h6>
            </h5>
        </div>
        <hr>
        <div v-if="school.link?.rules">
            <input-app :value="query" @update="query = $event" icon="iconamoon:search-bold" class="w-full sm:w-6/12 md:w-4/12 lg:w-3/12 mx-auto mt-8 mb-12" type="search" placeholder="search in app" accessKey="s" />
            <div v-if="search.length" class="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
                <router-link v-for="{name, description, path, rule, icon} in search" :to="path" :class="{ 'hidden': !school.link.rules[rule] }" class="flex gap-2 bg-v p-4 rounded-v bg-v-hover smooth cursor-pointer">
                    <icon-app :icon="icon" size="24" />
                    <div class="grid gap-2">
                        <div class="font-medium first-letter:uppercase truncate">{{ name }}</div>
                        <h6 class="truncate">{{ description }}</h6>
                    </div>
                </router-link>
            </div>
            <h6 v-else class="h-full flex-center">no data to display</h6>
        </div>
        <h6 v-else class="text-center">loading...</h6>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const { school } = defineProps([ "school" ]);

const query = ref("");

const Routes = ref([
    {
        name: 'New Student',
        icon: 'fluent:person-32-filled',
        path: `/school/${school.code}/students/new`,
        rule: 'students:create',
        description: 'add a new student to the school'
    },
    {
        name: 'Students List',
        icon: 'fluent:people-12-filled',
        path: `/school/${school.code}/students`,
        rule: 'students:access',
        description: 'list of the school students'
    },
    {
        name: 'New Course',
        icon: 'solar:document-bold',
        path: `/school/${school.code}/courses/new`,
        rule: 'courses:create',
        description: 'add a new course to the school'
    },
    {
        name: 'Courses List',
        icon: 'solar:documents-bold',
        path: `/school/${school.code}/courses`,
        rule: 'courses:access',
        description: 'list of the school courses'
    },
    {
        name: 'Timetable',
        icon: 'fluent:calendar-ltr-24-filled',
        path: `/school/${school.code}/timetable`,
        rule: 'timetable:access',
        description: 'manage school timetable'
    },
    {
        name: 'finance',
        icon: 'fa6-solid:money-check-dollar',
        path: `/school/${school.code}/finance`,
        rule: 'finance:access',
        description: 'manage school finance'
    },
    {
        name: 'settings',
        icon: 'fluent:settings-48-filled',
        path: `/school/${school.code}/settings`,
        rule: 'settings:access',
        description: 'manage school settings'
    },
    {
        name: 'school information',
        icon: 'pajamas:information',
        path: `/school/${school.code}/settings/information`,
        rule: 'settings:information:edit',
        description: 'manage school information'
    },
    {
        name: 'users',
        icon: 'fluent:people-12-filled',
        path: `/school/${school.code}/settings/users`,
        rule: 'settings:users:access',
        description: 'manage school users'
    },
    {
        name: 'new user',
        icon: 'fluent:person-32-filled',
        path: `/school/${school.code}/settings/users/new`,
        rule: 'settings:users:link',
        description: 'add a new user to the school'
    }
]);

const search = computed(() =>  Routes.value.filter( item => 
    item.name.toLowerCase().includes(query.value.toLowerCase()) ||
    item.description.toLowerCase().includes(query.value.toLowerCase())
));

const copy = text => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};
</script>