<template>
  <dashboard-template :title="'Orders'">
    <template v-slot:table>
      <Table :isLoading="isLoading" :tableDetails="tableDetails" :totalRecords="totalRecords" @page:changed="handlePageChange" />
    </template>
  </dashboard-template>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import DashboardTemplate from "@/components/template/DashboardTemplate.vue";
import OverviewCard from "@/components/ui/molecule/OverviewCard.vue";
import Table from "@/components/ui/molecule/Table.vue";
import useAPI from "@/composables/useApi";

export default defineComponent({
  components: {
    DashboardTemplate,
    OverviewCard,
    Table,
  },
  setup() {
    const { read } = useAPI();
    const tableDetails = ref({});
    const isLoading = ref(true);
    const totalRecords = ref(0);
    const offset = ref(0);
    const perPage = ref(10);
    const url = ref(`/v1/order_items?limit=10`)

    const loadData = async (url: string) => {
      isLoading.value = true;
      try {
        const data = await read(url);

        const header = ["N/O", "Product ID", "Price", "Category", "Date"];
        tableDetails.value = {
          header,
          data: data.data.data,
        };
        totalRecords.value = data.data.total
        offset.value = data.data.offset
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
      }
    };


    const handlePageChange = (page: any) => {
      const newUrl = `${url.value}&offset=${(page - 1) * perPage.value}`
      loadData(newUrl)
    }

    onMounted(() => {
      loadData(url.value);
    });

    return { tableDetails, isLoading, totalRecords, handlePageChange };
  },
});
</script>
<style scoped>
.cards--wrapper {
  overflow-x: auto;
  gap: 20px;
  width: 100%;
  white-space: nowrap;
  padding: 10px 0;
}
</style>
