<template>
  <Container>
    <MoveLeft @click="router.back" class="cursor-pointer my-8" />
    <p v-if="blogstore.loading">loading...</p>
    <p v-else-if="blogstore.error">{{ blogstore.error }}</p>
    <p v-else-if="!blogstore.blog">No blog found</p>
    <p v-else-if="blogstore.blog.author != userstore.user?.username">
      Not authorized to edit this blog
    </p>
    <div v-else>
      <div class="flex justify-between items-center">
        <h1 class="font-semibold text-3xl">Edit Blog</h1>
        <button
          class="px-8 py-2 bg-black text-white rounded"
          @click="updateBlog"
        >
          Save
        </button>
      </div>
      <div class="mt-4">
        <input
          type="text"
          class="w-full border border-gray-300 rounded p-2"
          placeholder="Title"
          v-model="blogstore.blog.title"
        />
      </div>
      <div class="mt-4">
        <textarea
          class="w-full border border-gray-300 rounded p-2"
          placeholder="Content"
          v-model="blogstore.blog.content"
        ></textarea>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from "@/components/Container.vue";
import { MoveLeft } from "lucide-vue-next";
import { useRouter, useRoute } from "vue-router";
import { blogStore } from "@/store/blogStore";
import { userStore } from "@/store/userStore";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const blogstore = blogStore();
const userstore = userStore();

const id = route.params.id as string;

const updateBlog = () => {
  blogstore.updateBlog({
    id,
    title: blogstore.blog?.title!,
    content: blogstore.blog?.content!,
  });
};

const getBlog = () => {
  blogstore.getBlog(id);
};
onMounted(() => {
  getBlog();
});
</script>
