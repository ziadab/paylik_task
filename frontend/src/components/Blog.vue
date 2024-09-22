

<template>
    <div class="w-full cursor-pointer mb-8" @click="goTo(blog.id)">
        <h1 class="text-2xl font-semibold">{{ blog.title }}</h1>
        <p class="line-clamp-2">{{ blog.content }}</p>

    </div>
</template>


<script lang="ts" setup>
import { defineProps } from "vue"
import { Blog } from "@/api/types";
import { useRouter } from "vue-router"

const router = useRouter();

defineProps<{
    blog: Blog;
}>();

const goTo = (index: number) => {
    router.push(`/blog/${index}`);
}
</script>