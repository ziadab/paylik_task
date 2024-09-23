
<template>
    <nav class="border px-2 sm:px-4 py-8 bg-white flex items-center border-b-gray-200">
        <input @change="store.fetchBlogs" className="mx-auto w-full focus:outline-none max-w-5xl"
            placeholder="Search for blogs" v-model="store.title" />
    </nav>
    <div class="mx-auto  max-w-xs px-2 md:max-w-5xl">
        <div class="flex mt-8 justify-between items-center">
            <div>
                <h1 class="font-semibold text-4xl">Welcome to the Blogs</h1>
                <p class=" text-gray-600">Here are some of the blogs that you might be interested in</p>
            </div>
            <div>
                <RouterLink to="/blog/create"
                    class="w-full flex justify-center items-center bg-black text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Plus color="white" class="mr-2" /> Create your own blog
                </RouterLink>
            </div>
        </div>

        <div class="mt-8 ">

            <p v-if="store.loading" class="text-center">loading...</p>
            <p v-else-if="store.blogs.length === 0" class="text-center">No blogs found</p>

            <div v-else>
                <Blog v-for=" blog in store.blogs" :blog="blog" />
                <a-pagination class="my-8 text-center" v-model:current="store.currentPage" :total="store.count"
                    :page-size="store.itemsPerPage" @change="store.fetchBlogs" show-less-items />
            </div>

        </div>


    </div>
</template>
<script lang="ts" setup>
import Blog from "@/components/Blog.vue";
import { Plus } from "lucide-vue-next"
import { RouterLink } from "vue-router";

import { blogsStore } from "@/store/blogsStore";
import { onMounted } from "vue"

const store = blogsStore();

const fetchBlogs = () => {
    store.fetchBlogs();
};


onMounted(() => {
    fetchBlogs();
});


</script>
  