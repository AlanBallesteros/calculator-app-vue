<template>
  <main>
    <section class="flex h-screen flex-col items-center bg-slate-700 p-10">
      <div class="w-full max-w-xs">
        <LoginForm />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
</script>
