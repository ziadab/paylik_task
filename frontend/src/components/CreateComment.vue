<template>
  <h2 class="mt-8 mb-3 font-semibold text-2xl">Comments:</h2>
  <div class="flex mb-4 flex-col justify-center items-end">
    <textarea
      v-model="content"
      class="w-full border rounded p-2"
      placeholder="What are your thoughts?"
    />
    <div
      class="flex items-center justify-center bg-black text-white py-2 px-4 mt-2 rounded cursor-pointer"
      @click="postComment(blogId)"
    >
      <span>Post your comment</span>
      <SendHorizontal class="ml-2" color="white" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from "vue";
import { SendHorizontal } from "lucide-vue-next";
import { commentStore } from "@/store/commentStore";
const content = ref("");
const commentstore = commentStore();

defineProps<{
  blogId: string;
}>();

const postComment = (blogId: string) => {
  commentstore.createComment(blogId, content.value);
  content.value = "";
};
</script>
