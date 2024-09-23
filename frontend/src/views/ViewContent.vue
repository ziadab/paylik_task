<template>
  <Container>
    <MoveLeft @click="router.push('/')" class="cursor-pointer my-8" />
    <p v-if="blogstore.loading">Loading your content...</p>
    <p v-else-if="blogstore.error">{{ blogstore.error }}</p>
    <div v-else>
      <div class="flex flex-row justify-between mt-8 items-center">
        <div>
          <h1 class="font-semibold text-3xl">
            {{ blogstore.blog?.title }}
          </h1>
          <div class="mt-2 flex flex-col">
            <span>@{{ blogstore.blog?.author }}</span>
            <span class="text-gray-500">{{
              dayjs(blogstore.blog?.created_at).format("MMM DD, YYYY")
            }}</span>
          </div>
        </div>
        <div
          class="flex"
          v-if="userstore.user?.username == blogstore.blog?.author"
        >
          <button class="px-8 py-2 bg-gray-700 text-white rounded">Edit</button>
          <button
            class="px-8 py-2 bg-red-700 text-white rounded ml-4"
            @click="blogstore.deleteBlog(id)"
          >
            Delete
          </button>
        </div>
      </div>

      <hr class="my-8" />
      <div class="">{{ blogstore.blog?.content }}</div>
    </div>
  </Container>
</template>
<script lang="ts" setup>
import Container from "@/components/Container.vue";
import { MoveLeft } from "lucide-vue-next";
import dayjs from "dayjs";

import { useRoute, useRouter } from "vue-router";
import { blogStore } from "@/store/blogStore";
import { userStore } from "@/store/userStore";
import { onMounted, onUnmounted } from "vue";

const route = useRoute();
const router = useRouter();

const blogstore = blogStore();
const userstore = userStore();

const id = route.params.id as string;

const getBlog = () => {
  blogstore.getBlog(id);
};

onMounted(() => {
  getBlog();
});

onUnmounted(() => {
  blogstore.reset();
});
</script>
