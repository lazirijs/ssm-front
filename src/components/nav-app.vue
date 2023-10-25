<template>
    <nav class="bg-white h-[50px] p-4 between rounded-v">
        <div class="w-3/12">
            <router-link class="m-auto" to="/">
                <img alt="Vue logo" src="../assets/logo.png" class="w-8">
            </router-link>
        </div>
        <div class="w-6/12 hidden sm:between">
            <router-link v-if="!user" class="m-auto" to="/">Home</router-link>
            <router-link v-else class="m-auto" to="/school">School</router-link>
            <router-link class="m-auto" to="/contactus">Contact us</router-link>
            <router-link class="m-auto" to="/help">Help</router-link>
        </div>
        <div dir="rtl" class="w-3/12 hidden sm:block">
            <router-link v-if="user" to="/account">Account</router-link>
            <router-link v-else to="/login">Login</router-link>
        </div>
        <div dir="rtl" class="w-3/12 sm:hidden">
            <icon-app @click="menu = !menu" :icon="user ? 'fluent:person-24-filled' : 'ep:more-filled'" size="24" class="w-5 h-5 cursor-pointer" />
            <Transition>
                <div v-if="menu" @click="menu = false" class="flex flex-col items-center fixed h-full w-full top-0  right-0 bg-black bg-opacity-50 z-50">
                    <div dir="auto" class="w-10/12 bg-white p-4 rounded-v m-auto grid gap-3">
                        <div dir="rtl" @click="menu = false">
                            <div class="absolute -translate-y-8 bg-v rounded-full p-2 mx-auto cursor-pointer">
                                <icon-app icon="fa6-solid:xmark" size="24" />
                            </div>
                        </div>

                        <h3 class="-translate-y-2">menu</h3>

                        <div v-if="user" class="grid gap-3">
                            <router-link to="/account" class="bg-v p-2 between rounded-v">
                                <h5>account</h5>
                                <icon-app icon="fluent:person-24-filled" size="24" />
                            </router-link>
                            <router-link to="/school" class="bg-v p-2 between rounded-v">
                                <h5>school</h5>
                                <icon-app icon="ion:school" size="24" />
                            </router-link>
                        </div>

                        <div v-else class="grid gap-3">
                            <router-link to="/" class="bg-v p-2 between rounded-v">
                                <h5>home</h5>
                                <icon-app icon="fluent:home-12-filled" size="24" />
                            </router-link>
                            <router-link to="/login" class="bg-v p-2 between rounded-v">
                                <h5>login</h5>
                                <icon-app icon="fluent:person-arrow-right-16-filled" size="24" />
                            </router-link>
                            <router-link to="/signup" class="bg-v p-2 between rounded-v">
                                <h5>sign up</h5>
                                <icon-app icon="fluent:person-add-16-filled" size="24" />
                            </router-link>
                        </div>
                        
                        <div class="grid gap-3 mt-4">
                            <router-link to="/contactus" class="bg-v p-2 between rounded-v">
                                <h5>contactus</h5>
                                <icon-app icon="fluent:chat-12-filled" size="24" />
                            </router-link>
                            <router-link to="/help" class="bg-v p-2 between rounded-v">
                                <h5>help</h5>
                                <icon-app icon="fluent:question-circle-12-filled" size="24" />
                            </router-link>
                        </div>
                        
                        <div class="text-center between mt-4">
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
import { useStore } from 'vuex'

const store = useStore().state;

const user = computed(() => store.user);

const menu = ref(false);
</script>