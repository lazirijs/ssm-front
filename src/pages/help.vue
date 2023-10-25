<template>
  <div class="flex flex-col gap-4">
    <h4>This is an {{text}} page</h4>
    <btn-app @click="notify" text="apple" icon="formkit:apple" />
    <btn-app @click="notify" text="apple" />
    <btn-app @click="notify" icon="formkit:apple"/>
    <input-app :value="text" @update="text = $event" label="enter text here" />
    <input-app :value="text" @update="text = $event" textarea label="enter text here" />
    text hre
  </div>
</template>

<script setup>
import { ref } from 'vue';
const text = ref('help');
const type = ref('text');
const notify = () => alert(text.value || 'help');
</script>