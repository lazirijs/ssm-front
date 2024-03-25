<template>
    <nav dir="ltr" class="bg-White h-[50px] p-4 flex-between rounded-v">
        <div>
            <router-link class="m-auto" to="/">
                <img alt="Vue logo" src="../assets/logo.png" class="w-8">
            </router-link>
        </div>
        <div dir="rtl" class="hidden sm:block">
            <router-link :to="user ? '/account' : '/login'">Account</router-link>
        </div>
        <div dir="rtl" class="sm:hidden">
            <icon-app @click="menu = !menu" :icon="user ? 'fluent:person-24-filled' : 'ep:more-filled'" size="24"
                class="w-5 h-5 cursor-pointer" />
            <Transition>
                <div v-if="menu" @click="menu = false"
                    class="flex flex-col items-center fixed h-full w-full top-0  right-0 bg-black bg-opacity-50 z-50">
                    <div dir="auto" class="w-10/12 bg-White p-4 rounded-v m-auto grid gap-3">
                        <div dir="rtl" @click="menu = false">
                            <div class="absolute -translate-y-8 bg-v rounded-full p-2 mx-auto cursor-pointer">
                                <icon-app icon="fa6-solid:xmark" size="24" />
                            </div>
                        </div>

                        <h3 class="-translate-y-2">menu</h3>

                        <router-link :to="user ? '/account' : '/login'" class="bg-v p-2 flex-between rounded-v">
                            <h5>account</h5>
                            <icon-app icon="fluent:person-24-filled" size="24" />
                        </router-link>

                        <div v-if="route.params.code" class="grid gap-3 mt-4">
                            <router-link :to="`/school/${route.params.code}/dashboard`" class="bg-v p-2 flex-between rounded-v">
                                <h5>dashboard</h5>
                                <icon-app icon="fluent:grid-24-filled" size="24" />
                            </router-link>
                            <router-link :to="`/school/${route.params.code}/students`" class="bg-v p-2 flex-between rounded-v">
                                <h5>students</h5>
                                <icon-app icon="fluent:people-12-filled" size="24" />
                            </router-link>
                            <router-link :to="`/school/${route.params.code}/courses`" class="bg-v p-2 flex-between rounded-v">
                                <h5>courses</h5>
                                <icon-app icon="solar:documents-bold" size="24" />
                            </router-link>
                            <router-link :to="`/school/${route.params.code}/timetable`" class="bg-v p-2 flex-between rounded-v">
                                <h5>timetable</h5>
                                <icon-app icon="fluent:calendar-ltr-24-filled" size="24" />
                            </router-link>
                            <router-link :to="`/school/${route.params.code}/finance`" class="bg-v p-2 flex-between rounded-v">
                                <h5>finance</h5>
                                <icon-app icon="fa6-solid:money-check-dollar" size="24" />
                            </router-link>
                            <router-link :to="`/school/${route.params.code}/settings`" class="bg-v p-2 flex-between rounded-v">
                                <h5>settings</h5>
                                <icon-app icon="fluent:settings-48-filled" size="24" />
                            </router-link>
                        </div>

                        <div class="grid gap-3 mt-4">
                            <router-link to="/contactus" class="bg-v p-2 flex-between rounded-v">
                                <h5>contactus</h5>
                                <icon-app icon="fluent:chat-12-filled" size="24" />
                            </router-link>
                            <router-link to="/help" class="bg-v p-2 flex-between rounded-v">
                                <h5>help</h5>
                                <icon-app icon="fluent:question-circle-12-filled" size="24" />
                            </router-link>
                        </div>

                        <div class="text-center flex-between mt-4">
                            <div class="w-full border-[1px]"></div>
                            <h6 class="w-10/12">{{ new Date().getFullYear() }}</h6>
                            <div class="w-full border-[1px] rounded-v"></div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import store from '@/store';

const route = useRoute();

const user = computed(() => store.state.user);
const school = ref(computed(() => store.state.schools.filter((i) => i.code == route.params.code)[0]));

const menu = ref(false);
</script>