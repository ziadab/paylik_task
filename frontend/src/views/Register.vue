<template>
    <Container additionalClasses="flex justify-center items-center">
        <div class="w-1/2">
            <div class="text-center ">
                <h1 class="text-4xl font-bold">Register</h1>
            </div>
            <div class="my-4">
                <div class="flex flex-row">
                    <div class="w-1/2">
                        <label htmlFor="first_name" class="block text-left text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input v-model="signup_obj.first_name" type="first_name" id="first_name" name="first_name"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div class="w-1/2 ml-4 ">
                        <label htmlFor="last_name" class="block text-sm text-left font-medium text-gray-700">
                            Last name
                        </label>
                        <input v-model="signup_obj.last_name" type="last_name" id="last_name" name="last_name"
                            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <label htmlFor="username" class="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input v-model="signup_obj.username" type="text" id="username" name="email"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label htmlFor="email" class="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input v-model="signup_obj.email" type="email" id="email" name="email"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label htmlFor="password" class="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input v-model="signup_obj.password" type="password" id="password" name="password"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>

            <div class="mb-5">
                <button @click="register" :disabled="store.loading" :class="{
                    'bg-gray-950 hover:bg-gray-700': !store.loading,
                    'bg-gray-400 cursor-not-allowed': store.loading
                }"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <span v-if="store.loading">Creating your account...</span>
                    <span v-else>Register</span>
                </button>
            </div>
            <div class="mb-4">
                <RouterLink to="/login" :disabled="store.loading"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-950 hover:bg-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Already have an account? Login
                </RouterLink>
            </div>
        </div>
    </Container>
    <context-holder />
</template>

<script lang="ts" setup>
import { userStore } from "@/store/userStore"
import { ref, watch } from 'vue'
import { message } from 'ant-design-vue';
import Container from "@/components/Container.vue";

const store = userStore()
const [messageApi, contextHolder] = message.useMessage()

const signup_obj = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    username: ''
})

watch(
    () => store.error,
    (newError) => {
        if (newError) {
            messageApi.error(newError);
        }
    }
);

const register = () => {
    store.register(signup_obj.value)
}


</script>