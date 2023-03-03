<template>
  <div class="q-pa-md">
    <form class="flex w-full justify-center" @submit="submitHandler">
      <Field
        type="text"
        name="search"
        class="align-center mb-7 w-1/2 p-2"
        required
        placeholder="search"
        v-model="search"
      />
      <button
        class="focus:shadow-outline ml-3 h-9 rounded-sm bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
        type="submit"
      >
        Search
      </button>
    </form>
    <q-table
      :rows="dataTable"
      :columns="columns"
      row-key="id"
      class="rounded-none p-3"
      title="Operations History"
      wrap-cells
      table-header-style="{ maxHeight: '50px', overflow: auto }"
      v-model:pagination="initialPagination"
      :loading="loading"
      binary-state-sort
      @request="onRequesTableHandle"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Field, useForm } from "vee-validate";
import { RecordService } from "@/services";
import { SortEnum, type TableRecord } from "@/config/types";
import { formatRecordsForTable, columns } from "@/utils";

const dataTable = ref<TableRecord[]>([]);
const loading = ref(false);
const { handleSubmit } = useForm({
  initialValues: {
    search: "",
  },
});
const sort = ref(SortEnum.DESC);
const limit = ref(10);
const search = ref("");
const orderBy = ref("");

const initialPagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
});

onMounted(async () => {
  await setRecords();
});

const offsetNumber = computed(() =>
  Math.ceil(
    (initialPagination.value.page - 1) * initialPagination.value.rowsPerPage
  )
);

const onRequesTableHandle = async (requestTable: any) => {
  const {
    pagination: { page, rowsPerPage, sortBy, descending },
  } = requestTable;

  sort.value = descending ? SortEnum.DESC : SortEnum.ASC;
  limit.value = rowsPerPage;
  orderBy.value = sortBy;
  initialPagination.value.page = page;
  await setRecords();
};

const submitHandler = handleSubmit(async (values) => {
  search.value = values.search;
  await setRecords();
});

const setRecords = async () => {
  loading.value = true;
  try {
    const { records, pagination } = await RecordService.getRecords({
      sort: sort.value,
      limit: limit.value,
      search: search.value,
      orderby: orderBy.value,
      offset: offsetNumber.value,
    });
    dataTable.value = formatRecordsForTable(records);
    initialPagination.value = pagination;
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};
</script>
