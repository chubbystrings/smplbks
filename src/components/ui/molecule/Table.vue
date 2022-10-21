<template>
  <div class="table--wrapper">
    <Pagination
      :totalPages="Math.round(totalPages / perPage)"
      :total="totalPages"
      :perPage="perPage"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    />
    <table v-if="!isLoading">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              className="checkbox"
              @click="handleCheckAll"
            />
          </th>
          <th v-for="(item, i) in tableDetails?.header" :key="i">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in tableDetails?.data"
          :key="i"
          @click="handleClick(item.id)"
        >
          <td @click.stop="handleCheckbox">
            <input type="checkbox" className="checkbox" />
          </td>
          <td>{{ i + 1 }}</td>
          <td>{{ item.product_id }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.product_category }}</td>
          <td>{{ formatDate(item.date) }}</td>
        </tr>
      </tbody>
    </table>
    <Skeletal v-else :width="'100%'" :height="'500px'" />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  PropType,
  toRefs,
  onMounted,
  computed,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import Skeletal from "./SkeletalLoader.vue";
import Pagination from "./Pagination.vue";
import { formatDate } from "@/utils/formatDate";

export default defineComponent({
  emits: ['page:changed'],
  props: {
    tableDetails: Object as PropType<Record<string, any>>,
    isLoading: {
      type: Boolean,
      required: true,
    },
    totalRecords: {
      type: Number,
      required: true,
    },
  },

  components: {
    Skeletal,
    Pagination,
  },

  setup(props, {emit }) {
    const route = useRoute();
    const router = useRouter();
    const currentPage = ref(1);
    const totalPages = computed(() => props.totalRecords);
    const perPage = ref(10);

    const { tableDetails, isLoading } = toRefs(props);

    

    const handleLongText = (text: string) => {
      return text.length > 30 ? text.substring(0, 30) + "..." : text;
    };

    const handleClick = (id: number) => {
      router.push(`/order/${id}`);
    };

    const handleCheckAll = (e: any) => {
      e.target.checked = !e.target.checked;
      const arr = document.querySelectorAll(".checkbox");
      arr.forEach((el: any) => {
        el.checked = !el.checked;
      });
    };

    const handleCheckbox = () => {};

    const onPageChange = (page: any) => {
      console.log(page);
      currentPage.value = page
      emit('page:changed', page)
    };

    return {
      onPageChange,
      currentPage,
      perPage,
      totalPages,
      tableDetails,
      handleClick,
      handleLongText,
      isLoading,
      handleCheckAll,
      handleCheckbox,
      formatDate
    };
  },
});
</script>
<style scoped>
.table--wrapper {
  overflow-x: auto;
}

.table--wrapper table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid var(--accent);
}

table td {
  text-align: left;
  padding: 13px 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
}

table th {
  text-align: left;
  padding: 15px 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;

  color: #a4a7b7;
}

table tr:not(tr:last-of-type) {
  border-bottom: 1px solid #e5e5e5;
}
table tr:not(thead tr):hover {
  cursor: pointer;
  background: var(--accent);
}
</style>
