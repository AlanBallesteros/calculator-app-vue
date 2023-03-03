<template>
  <div class="flex items-center">
    <div>
      <label class="mt-2 block text-sm font-bold text-gray-700" for="name">
        {{ name }}
      </label>
      <div class="flex items-center justify-center">
        <input
          class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          :value="modelValue"
          type="number"
          placeholder="enter value 1"
          @input="
            $emit(
              'update:modelValue',
              ($event.target as HTMLInputElement).value
            )
          "
        />
        <span class="pl-3"> {{ symbol }} </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  modelValue: string;
  symbol?: string;
  value: number;
  name: string;
}>();
defineEmits(["update:modelValue"]);
</script>
