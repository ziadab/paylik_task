<template>
    <Container>

        <MoveLeft @click="router.push('/')" class="cursor-pointer my-8" />
        <h1 class="mt-8 font-semibold text-3xl">
            Create New Blog
        </h1>

        <div>
            <form class="mt-8">
                <div class="mb-4">
                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                    <input v-model="post.title" id="title" name="title"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600 sm:text-sm" />

                </div>
                <div class="mb-4">
                    <label for="content" class="block text-sm font-medium text-gray-700">Content</label>
                    <textarea v-model="post.content" id="content" name="content" rows="4"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600 sm:text-sm" />
                </div>

                <button @click.prevent="createBlog" :disabled="store.loading" :class="{
                    'bg-gray-950 hover:bg-gray-700': !store.loading,
                    'bg-gray-400 cursor-not-allowed': store.loading
                }"
                    class="w-full mt-4 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <span v-if="store.loading">Creating your blog...</span>
                    <span v-else>Create</span>
                </button>
            </form>
        </div>


    </Container>
</template>

<script lang="ts" setup>
import Container from "@/components/Container.vue";
import { MoveLeft } from "lucide-vue-next"
import { useRouter } from "vue-router"
import { blogStore } from "@/store/blogStore"
import { ref } from "vue"

const router = useRouter();
const store = blogStore()
const post = ref({
    title: "",
    content: ""
})

const createBlog = () => {
    store.createBlog(post.value)
}


</script>