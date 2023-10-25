<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" class="m-auto">
    <hello-world :msg="data"/>
  </div>
</template>

<script setup>
// @ is an alias to /src
import { ref } from 'vue'
import { api } from '@/plugins/axios.js'
import HelloWorld from '@/components/HelloWorld.vue'

const data = ref();

( async () => { 
  const result = await api.get("/");
  data.value = new Date(result.data).getHours() + ":" + new Date(result.data).getMinutes();
})()
</script>