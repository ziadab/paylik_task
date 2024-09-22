

<template>
    <div class="w-full cursor-pointer mb-8" @click="goTo(blog.id)">
        <h1 class="text-2xl font-semibold">{{ blog.title }}</h1>
        <p class="line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce egestas sodales dui,
            ac
            venenatis
            diam facilisis sed. Fusce eu facilisis turpis. Aenean imperdiet nunc at ante viverra aliquet. Etiam ut finibus
            purus. Pellentesque sollicitudin ex ligula, sed mattis magna sagittis et. Nulla a ante ut orci accumsan
            porttitor. Sed ultrices finibus cursus. Ut a porttitor felis. Duis scelerisque maximus molestie. Morbi varius
            sit amet tortor laoreet porttitor. Duis turpis elit, condimentum eget ante ut, rhoncus sagittis erat. Vestibulum
            est ligula, tempor nec ultrices eget, euismod et neque.</p>

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