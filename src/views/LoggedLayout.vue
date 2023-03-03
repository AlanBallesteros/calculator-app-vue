<template>
  <MainNav />
  <main>
    <section class="flex h-screen flex-col items-center bg-slate-700 p-10">
      <RouterView />
    </section>
  </main>
</template>

<script setup lang="ts">
import MainNav from "@/components/MainNav.vue";
import { RouterView } from "vue-router";
</script>
