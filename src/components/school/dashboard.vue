<template>
    <div class="space-y-4">
        <div class="flex-between">
            <h2>dashboard</h2>
            <h6 class="font-medium">{{ school.link.role }}</h6>
        </div>
        <div class="grid gap-2 text-center mx-auto pt-8 cursor-pointer">
            <h2 class="tracking-[.125rem] ml-[.125rem] uppercase">{{school.name}}</h2>
            <h5 @click="copy(school.code)">
                <a class="tracking-[.125rem] ml-[.125rem] font-bold uppercase">{{ school.code }}</a>
                <br> 
                <h6 class="text-gray-600 mt-4">tap here to copy school code</h6>
            </h5>
        </div>
        <!-- <hr>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            <div class="border-2 rounded-v p-4 flex-center text-center">Students<br>20/100</div>
            <div class="border-2 rounded-v p-4"></div>
            <div class="border-2 rounded-v p-4"></div>
            <div class="border-2 rounded-v p-4"></div>
            <div class="border-2 rounded-v p-4"></div>
            <div class="border-2 rounded-v p-4"></div>
        </div> -->
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { api } from '@/plugins/axios.js';
import { useRoute } from 'vue-router'

const store = useStore();
const route = useRoute();

const code = route.params.code;
const school = ref(computed(() => store.state.schools.filter((i) => i.code == code)[0]));

const copy = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};
</script>