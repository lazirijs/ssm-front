<template>
    <div class="space-y-4">
        <div class="flex-between">
            <h2>dashboard</h2>
            <h6 translate="no" class="font-medium">{{ school.link.role }}</h6>
        </div>
        <div class="grid gap-2 text-center mx-auto pt-8 cursor-pointer">
            <h2  translate="no" class="tracking-[.0125rem] ml-[.0125rem] uppercase">{{school.name}}</h2>
            <h5 @click="copy(school.code)">
                <a  translate="no" class="tracking-[.125rem] ml-[.125rem] font-bold uppercase">{{ school.code }}</a>
                <br> 
                <h6 class="text-gray-600 mt-4">tap here to copy school code</h6>
            </h5>
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

const copy = (text) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};
</script>