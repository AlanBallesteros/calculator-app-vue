<template>
  <form
    class="mb-4 bg-white px-8 pt-6 pb-8 shadow-md"
    @submit.prevent="onSubmitHandler"
  >
    <div class="mb-4">
      <label class="mb-2 block text-sm font-bold text-gray-700" for="username">
        Username
      </label>
      <input
        class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id="username"
        type="email"
        placeholder="Username"
        v-model="username"
      />
    </div>
    <div class="mb-6">
      <label class="mb-2 block text-sm font-bold text-gray-700" for="password">
        Password
      </label>
      <input
        class="focus:shadow-outline mb-3 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        id="password"
        type="password"
        placeholder="password"
        v-model="password"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
        type="submit"
      >
        Sign In
      </button>
      <div
        class="text-small p-3 text-center text-red-500"
        :class="{ hidden: error }"
      ></div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { UserService } from "@/services";

const username = ref("");
const password = ref("");
const error = ref(false);
const router = useRouter();

const onSubmitHandler = async () => {
  try {
    await UserService.login(username.value, password.value);
    router.push("/");
  } catch (e) {
    error.value = true;
  }
};
</script>
