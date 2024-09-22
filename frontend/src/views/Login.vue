
<template>
    <div class="mx-auto min-h-screen max-w-xs px-2 md:max-w-5xl flex justify-center items-center">
        <div class="w-1/2">
            <div class="text-center ">
                <h1 class="text-4xl font-bold">Login</h1>
            </div>
            <div class="mt-4">

                <div class="mb-4">
                    <label htmlFor="email" class="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input v-model="email" type="email" id="email" name="email"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-4">
                    <label htmlFor="password" class="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input v-model="password" type="password" id="password" name="password"
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

                <div class="mb-8">
                    <button @click="login()" :disabled="store.loading" :class="{
                        'bg-indigo-600 hover:bg-indigo-700': !store.loading,
                        'bg-gray-400 cursor-not-allowed': store.loading
                    }"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span v-if="store.loading">Trying to login...</span>
                        <span v-else>Login</span>
                    </button>
                </div>
                <div class="mb-4">
                    <RouterLink to="/register" :disabled="store.loading"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create a new account
                    </RouterLink>
                </div>

            </div>
        </div>
    </div>
    <context-holder />
</template>
  
<script lang="ts" setup>
import { ref, watch } from "vue"
import { userStore } from "@/store/userStore"
import { RouterLink } from "vue-router"
import { message } from 'ant-design-vue';

const email = ref('')
const password = ref('')
const store = userStore()

const [messageApi, contextHolder] = message.useMessage()


watch(
    () => store.error,
    (newError) => {
        if (newError) {
            messageApi.error(newError); // Show error message when error changes
        }
    }
);

const login = () => {
    store.login(email.value, password.value)
}
</script>