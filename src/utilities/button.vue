<template>
    <button :type="type" 
        class="h-9 flex items-center rounded-v gap-3 px-4 py-2 hover:opacity-75 smooth" 
        :style="`background: ${background || '#e5e7eb'}; color: ${color}; ${!(loading || disabled) || 'opacity: 70%;cursor: default;'}`"
    >
        <icon-app v-if="icon" :icon="loading ? 'svg-spinners:ring-resize' : icon" class="w-5 m-auto" />
        <h5 v-if="text" class="w-full text-center truncate">{{ text }}</h5>
    </button>
</template>
  
<script setup>
defineProps({
    text: String,
    icon: String,
    type: String,
    color: String,
    background: String,
    loading: Boolean,
    disabled: Boolean,
});
</script>