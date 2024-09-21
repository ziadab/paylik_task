
<template>
    <div className="mx-auto min-h-screen max-w-xs px-2 md:max-w-5xl flex justify-center items-center">
        <div className="w-1/2">
            <div className="text-center ">
                <h1 className="text-4xl font-bold">Login</h1>
            </div>
            <div className="mt-4">

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input v-model="email" type="email" id="email" name="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input v-model="password" type="password" id="password" name="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                    <button @click="login()"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Login
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref } from "vue"
import { useStore } from "@/store/useStore"

const email = ref('')
const password = ref('')
const store = useStore()


const login = () => {
    store.login(email.value, password.value)
}
</script>