<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button @click="onClickFirstPage" :disabled="isInFirstPage" type="button">
        First
      </button>
    </li>

    <li class="pagination-item">
      <button
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        type="button"
      >
        Previous
      </button>
    </li>

    <!-- Visible Buttons Start -->
    <template v-if="lastPage">
      <li class="pagination-item">
        ...
        <button
          type="button"
          @click="onClickPage(pages[pages.length - 1].name)"
          :disabled="pages[pages.length - 1].isDisabled"
          :class="{ active: isPageActive(pages[pages.length - 1].name) }"
        >
          {{ pages[pages.length - 1].name }}
        </button>
      </li>
    </template>

    <template v-else>
      <li v-for="page in pages" :key="page.name" class="pagination-item">
        <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
        >
          {{ page.name }}
        </button>
      </li>
    </template>

    <!-- Visible Buttons End -->

    <li class="pagination-item">
      <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
        Last
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  emits: ["pagechanged"],
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const lastPage = ref(false);

    const startPage = computed(() => {
      lastPage.value = false;
      if (props.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (props.currentPage === props.totalPages) {
        lastPage.value = true;
        if (props.totalPages <= props.maxVisibleButtons)
          return props.totalPages;
        return props.totalPages;
      }

      // When inbetween
      return props.currentPage - 1;
    });

    const pages = computed(() => {
      const range = [];
      for (
        let i = 1;
        i <=
        Math.min(
          startPage.value + props.maxVisibleButtons - 1,
          props.totalPages
        );
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === props.currentPage,
        });
      }
      
      return range;
    });

    const isInLastPage = computed(() => {
      return props.currentPage === props.totalPages;
    });

    const isInFirstPage = computed(() => {
      return props.currentPage === 1;
    });

    const onClickFirstPage = () => {
      emit("pagechanged", 1);
    };
    const onClickPreviousPage = () => {
      emit("pagechanged", props.currentPage - 1);
    };
    const onClickPage = (page: any) => {
      emit("pagechanged", page);
    };
    const onClickNextPage = () => {
      emit("pagechanged", props.currentPage + 1);
    };
    const onClickLastPage = () => {
      emit("pagechanged", props.totalPages);
    };
    const isPageActive = (page: any) => {
      return props.currentPage === page;
    };

    return {
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
      isInLastPage,
      isInFirstPage,
      pages,
      isPageActive,
      lastPage,
    };
  },
});
</script>
<style scoped>
.pagination {
  list-style-type: none;
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
}

.pagination-item {
  display: inline-block;
}

.pagination-item button {
  outline: none;
  padding: 3px;
}

.active {
  background-color: var(--secondary);
  color: #000;
}
</style>
