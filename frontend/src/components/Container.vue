<template>
    <div :class="`mx-auto min-h-screen max-w-xs px-2 md:max-w-5xl ${props.additionalClasses}`">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
    additionalClasses: {
        type: String,
        default: "", // Default to an empty string
    },
});
</script>