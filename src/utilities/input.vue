<template>
    <label v-if="label || subText" class="text-clip truncate">
        {{ label }}
        <Transition>
            <h6 v-if="subText" :style="`color: ${subTextColor};`" class="inline">{{ subText }}</h6>
        </Transition>
    </label>
    <div v-if="textarea" class="bg-v rounded-v px-4 py-2 smooth"
        :style="`color: ${invalid ? 'red' : ''}; ${!(loading || readonly) || 'opacity: 70%;cursor: default;'}`">
        <textarea class="w-full placeholder:text-sm" :readonly="readonly" @:input="emits('update', $event.target.value)"
            :value="value" :type="type" :placeholder="placeholder || 'enter text here'"
            :style="`${!(loading || readonly) || 'cursor: default;'}`"></textarea>
    </div>
    <div v-else v-bind="$attrs"
        class="w-full h-9 flex items-center bg-v rounded-v gap-[0.375rem] sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 py-2 border-2 border-dashed smooth"
        :style="`border-color: ${invalid ? 'red' : ''}; ${!(loading || readonly) || 'opacity: 70%;cursor: default;'}`">
        <icon-app v-if="icon" :icon="loading ? 'svg-spinners:ring-resize' : icon" class="w-7" />
        <input dir="auto" :name="name || label" class="w-full placeholder:text-sm placeholder:tracking-normal truncate" :readonly="readonly" @:input="emits('update', $event.target.value)"
            :value="value" :type="type" :placeholder="placeholder || 'enter text here'" :maxlength="maxlength" :minlength="minlength"
            :style="`${center && 'text-align: center;'} ${(loading || readonly) && 'cursor: default;'}`" 
            :class="{ 'placeholder:text-center': center }"/>
        <icon-app v-if="btnIcon || (icon && center)" @click="emits('btn')" :icon="btnIcon || center" class="w-7" />
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
    name: String,
    subText: String | Boolean,
    subTextColor: String,
    minlength: String,
    maxlength: String,
    textarea: Boolean,
    center: Boolean,
});

const emits = defineEmits(["update", "btn"]);
</script>

<style>
.holder::placeholder {
    text-align: start;
}
</style>