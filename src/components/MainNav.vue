<template>
  <header class="mb-16 w-full text-sm">
    <nav class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap justify-start border-b border-solid border-gray-200 px-8"
      >
        <div class="flex h-full items-center px-3 text-xl">
          <RouterLink to="/">Operations</RouterLink>
        </div>
        <div class="flex h-full items-center px-3 text-xl">
          <RouterLink to="/history">History</RouterLink>
        </div>
        <div class="ml-auto flex h-full items-center px-3 text-xl">
          <RouterLink to="/logout">Log Out</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
