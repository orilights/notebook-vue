<template>
    <input :value="modelValue"
        @input="emits('update:modelValue', ($event.target as HTMLInputElement).value)" :placeholder="placeHolder"
        class="border px-1 rounded-md bg-white dark:bg-black"
        >
</template>

<script setup lang="ts">
defineProps({
    modelValue: String,
    placeHolder: String
})
const emits = defineEmits(['update:modelValue'])
</script>