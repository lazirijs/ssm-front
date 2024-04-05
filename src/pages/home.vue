<template>
  <div v-bind="$attrs" class="hidden" />
  <div class="w-full bg-White rounded-v flex-center" :style="`height: ${screenHeight}px;`">
    <div class="grid gap-4">
      <h1 class="font-semibold md:font-extrabold tracking-wide">
        Keep it Sample.
      </h1>
      <h6 class="mini-text"> 
        let us take care of your school management <br> 
        so you can enjoy peace of mind <br> 
        For only <a class="font-bold">4000 DZD/month.</a> <br>
        need help? click <a href="/help?create-school" class="link">here.</a>
      </h6>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const screenHeight = ref(window.innerHeight - 48.34 - 16 * 3);
</script>