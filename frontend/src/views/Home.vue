
<template>
    <QuillEditor v-model:content="content" />

    <div>
        <h3>Output Content:</h3>
        <div>{{ content }}</div>
    </div>
</template>
<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref } from "vue"

const content = ref<string>('')




</script>
  