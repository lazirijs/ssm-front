<template>
  <div class="flex flex-col gap-4">
    <h4>This is an account page</h4>
    <h6>email : {{ user.email }}</h6>
    <h6>created at : {{ new Date(user.created_at) }}</h6>
    <btn-app @click="logout" text="logout" class="w-min mx-auto" icon="fluent:arrow-enter-16-filled" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { api } from '@/plugins/axios.js';
import { useRouter } from 'vue-router'

const store = useStore();
const router = useRouter();

const user = ref(store.state.user);

const logout = async () => {
  await api.get("/api/users/logout");
  store.commit("user", false);
  router.push('/login');
};
</script>