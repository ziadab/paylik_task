<template>
  <div class="flex items-center justify-between mb-6">
    <div class="w-full">
      <h1 class="text-base font-semibold">
        {{ comment.user.first_name }} {{ comment.user.last_name }}
        <span class="text-gray-600 text-sm font-light">
          (@{{ comment.user.username }}) {{ timeAgo }}
        </span>
      </h1>
      <p v-if="!isEditing" class="text-sm mt-1">{{ comment.content }}</p>
      <textarea
        v-else
        v-model="editableContent"
        class="border rounded w-full p-2"
      ></textarea>
    </div>
    <div
      class="flex justify-center items-center cursor-pointer"
      v-if="userstore.user?.username == comment.user.username"
    >
      <Pen v-if="!isEditing" color="#374151" @click="isEditing = true" />

      <Trash2
        v-if="!isEditing"
        color="#b91c1c"
        class="ml-4"
        @click="
          commentstore.deleteComment(
            comment.blog_id.toString(),
            comment.id.toString()
          )
        "
      />

      <button
        v-if="isEditing"
        :class="{
          'bg-gray-900 ': !commentstore.loading,
          'bg-gray-400 cursor-not-allowed': commentstore.loading,
        }"
        class="px-4 py-2 ml-4 text-white rounded"
        @click="saveComment"
        :disabled="commentstore.loading"
      >
        Save
      </button>
      <button
        v-if="isEditing"
        :class="{
          'bg-gray-500 ': !commentstore.loading,
          'bg-gray-400 cursor-not-allowed': commentstore.loading,
        }"
        class="ml-2 px-4 py-2 text-white rounded"
        @click="cancelEdit"
        :disabled="commentstore.loading"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed } from "vue";
import { Comment } from "@/api/types";
import { userStore } from "@/store/userStore";
import { commentStore } from "@/store/commentStore";
import { Trash2, Pen } from "lucide-vue-next";
import dayjs from "dayjs";

const userstore = userStore();
const commentstore = commentStore();

const props = defineProps<{
  comment: Comment;
}>();

const isEditing = ref(false);
const editableContent = ref(props.comment.content);

const saveComment = () => {
  commentstore
    .updateComment(
      props.comment.blog_id.toString(),
      props.comment.id.toString(),
      editableContent.value
    )
    .then(() => {
      isEditing.value = false;
      editableContent.value = props.comment.content;
    });
};

const cancelEdit = () => {
  isEditing.value = false;
  editableContent.value = props.comment.content;
};

const timeAgo = computed(() => {
  const createdAt = dayjs(props.comment.created_at);
  const now = dayjs();

  const diffInDays = now.diff(createdAt, "day");
  const diffInHours = now.diff(createdAt, "hour");
  const diffInWeeks = now.diff(createdAt, "week");

  return diffInWeeks >= 1
    ? `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`
    : diffInDays >= 1
    ? `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    : `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
});
</script>
