<template>
  <form
    @submit="submitHandler"
    id="form"
    class="mb-4 flex bg-white px-8 pt-6 pb-8 shadow-md"
    v-if="selectedOperation"
  >
    <div class="min-w-[482px]">
      <Listbox as="div" v-model="selectedOperation" class="max-w-xs">
        <ListboxLabel class="mb-3 block text-sm font-medium text-gray-700"
          >Operations
        </ListboxLabel>
        <div class="relative mt-1">
          <ListboxButton
            class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          >
            <span class="flex items-center">
              <span class="block truncate">{{ selectedOperation.type }}</span>
            </span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="operation in operations"
                :key="operation.id"
                :value="operation"
                v-slot="{ active, selected }"
              >
                <li
                  :class="[
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                  ]"
                >
                  <div class="flex items-center">
                    <span
                      :class="[
                        selected ? 'font-semibold' : 'font-normal',
                        'ml-3 block truncate',
                      ]"
                      >{{ operation.type }}</span
                    >
                  </div>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-indigo-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
      <div class="mt-5 flex flex-wrap gap-3">
        <div v-for="(field, idx) in fields" :key="field.key" class="mb-4">
          <Field
            :name="`operands[${idx}]`"
            :placeholder="`value ${idx}`"
            type="numeric"
            class="focus:shadow-outline appearance-none rounded border py-2 px-3 leading-tight text-gray-700"
          />
          <span class="pl-3" v-if="idx === 0">
            {{ selectedOperation.symbol }}
          </span>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="submit"
        >
          Solve
        </button>
      </div>
    </div>
  </form>
  <div class="mb-4 bg-white px-8 pt-6 pb-8 shadow-md" v-if="operationResult">
    <h2>Result</h2>
    <div class="mt-3 bg-slate-100 p-3 text-lg">
      <pre>Response: {{ operationResult?.operationResponse }}</pre>
      <pre>Balance: ${{ operationResult?.userBalance }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Field, useForm, useFieldArray } from "vee-validate";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { OperationsService } from "@/services";
import type { OperationResponse, Operation } from "@/config/types";

const operations = ref<Operation[]>([]);
const selectedOperation = ref<Operation | null>(null);
const operationResult = ref<OperationResponse | null>(null);
const { handleSubmit } = useForm({
  initialValues: {
    operands: [] as number[],
  },
});
const { fields, replace } = useFieldArray<number>("operands");

onMounted(async () => {
  operations.value = await OperationsService.getOperations();
  selectedOperation.value = operations.value[0];
});

watch(selectedOperation, (currentOperation) => {
  replace(new Array(currentOperation?.min_num).fill(null));
});

const submitHandler = handleSubmit(async ({ operands }) => {
  if (selectedOperation.value) {
    const data = await OperationsService.calculateOperations(
      selectedOperation.value.id,
      operands
    );
    operationResult.value = data;
    replace(new Array(selectedOperation.value.min_num).fill(null));
  }
});
</script>
