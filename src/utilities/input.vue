<template>
    <label v-if="label" class="text-clip">
        {{ label }}
        <Transition>
            <h6 v-if="subText" :style="`color: ${subTextColor};`" class="inline">{{ subText }}</h6>
        </Transition>
    </label>
    <div v-if="textarea" class="bg-v-1 rounded-v px-4 py-2 smooth"
        :style="`color: ${invalid ? 'red' : ''}; ${!(loading || readonly) || 'opacity: 70%;cursor: default;'}`">
        <textarea class="w-full placeholder:text-sm" :readonly="readonly" @:input="emits('update', $event.target.value)"
            :value="value" :type="type" :placeholder="placeholder || 'enter text here'"
            :style="`${!(loading || readonly) || 'cursor: default;'}`"></textarea>
    </div>
    <div v-else v-bind="$attrs"
        class="w-full h-9 flex items-center bg-v-1 rounded-v gap-3 px-4 py-2 border-2 border-dashed smooth"
        :style="`border-color: ${invalid ? 'red' : ''}; ${!(loading || readonly) || 'opacity: 70%;cursor: default;'}`">
        <icon-app v-if="icon" :icon="loading ? 'svg-spinners:ring-resize' : icon" class="w-7" />
        <input class="w-full placeholder:text-sm" :readonly="readonly" @:input="emits('update', $event.target.value)"
            :value="value" :type="type" :placeholder="placeholder || 'enter text here'" :maxlength="maxlength"
            :minlength="minlength"
            :style="`${center && 'text-align: center; letter-spacing: .5rem; margin-left: .5rem;'} ${(loading || readonly) && 'cursor: default;'}`" />
        <icon-app v-if="btnIcon" @click="emits('btn')" :icon="btnIcon" class="w-7" />
    </div>
</template>
  
<script setup>
defineProps({
    value: String,
    icon: String,
    type: String,
    invalid: Boolean,
    loading: Boolean,
    readonly: Boolean,
    placeholder: String,
    btnIcon: String,
    label: String,
    subText: String | Boolean,
    subTextColor: String,
    minlength: String,
    maxlength: String,
    textarea: Boolean,
    center: Boolean,
});

const emits = defineEmits(["update", "btn"]);
</script>