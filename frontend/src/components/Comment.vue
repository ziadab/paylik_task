<template>
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-base font-semibold">
        {{ comment.user.username }}
      </h1>
      <p class="text-sm mt-1">{{ comment.content }}</p>
    </div>
    <div
      class="flex justify-center items-center cursor-pointer"
      v-if="userstore.user?.username == comment.user.username"
    >
      <Pen color="#374151" />

      <Trash2
        color="#b91c1c"
        class="ml-4"
        @click="
          commentstore.deleteComment(
            comment.blog_id.toString(),
            comment.id.toString()
          )
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { Comment } from "@/api/types";
import { userStore } from "@/store/userStore";
import { commentStore } from "@/store/commentStore";
import { Trash2, Pen } from "lucide-vue-next";

const userstore = userStore();
const commentstore = commentStore();

defineProps<{
  comment: Comment;
}>();
</script>
