<template>
    <div @:click="emits('update', !props.value)" class="w-12 h-7 bg-v rounded-full p-1.5 cursor-pointer flex smooth" :class="{ 'justify-end': props.value }">
        <div class="w-4 h-4 rounded-full smooth" :class="{ 'bg-gray-500': !props.value, 'bg-gray-800 dark:bg-gray-400': props.value }" />
    </div>
</template>

<script setup>
    const props = defineProps(["value"]);
    const emits = defineEmits(["update"]);
</script>