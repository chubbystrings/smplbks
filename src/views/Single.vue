<template>
  <dashboard-template :title="''">
    <template v-slot:table>
      <div class="single--wrapper" v-if="!isLoading">
        <div class="image--wrapper">
          <img src="/img/jpeg/placeholder.jpeg" />
        </div>
        <div class="description">
          <h2>Order Details</h2>
          <p>Price: ${{ singleOrderDetails?.price }}</p>
          <p>Freight value: {{ singleOrderDetails?.freight_value }}</p>
          <p>Shipping: {{ formatDate(singleOrderDetails?.shipping_limit_date, 'slash') }}</p>
          <p>Order Item ID: {{ singleOrderDetails?.order_item_id }}</p>
          <p>Order ID: {{ singleOrderDetails?.order_id }}</p>
          <p>Seller ID : {{ singleOrderDetails?.seller_id }} </p>
          <div class="action--wrapper">
            <button
              class="btn"
              @click="handleEdit(singleOrderDetails?.order_id)"
            >
              Edit
            </button>
            <button
              class="btn"
              @click="handleDelete(singleOrderDetails?.order_id)"
            >
              delete
            </button>
          </div>
        </div>
      </div>
      <div class="image--wrapper" v-else>
        <Skeletal :width="'100%'" :height="'100%'" />
      </div>
    </template>
  </dashboard-template>
  <teleport to="body">
    <Modal
      :show="showModal.open"
      @close:modal="handleClose"
      :size="showModal.Component === 'DeleteDialogComp' ? 'sm' : 'lg'"
    >
      <component
        :is="showModal.Component"
        @close:modal="handleClose"
        @action:delete="handleAction"
        v-bind="EditProps"
        @action:edit="handleEditAction"
      ></component>
    </Modal>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import DashboardTemplate from "@/components/template/DashboardTemplate.vue";
import Skeletal from "../components/ui/molecule/SkeletalLoader.vue";
import { useStore } from "@/store";
import useAPI from "@/composables/useApi";
import Modal from "@/components/ui/molecule/Modal.vue";
import DeleteDialogComp from "@/components/ui/molecule/DeleteDialog.vue";
import EditForm from "@/components/ui/molecule/EditForm.vue";
import { formatDate } from "@/utils/formatDate";

export default defineComponent({
  components: {
    DashboardTemplate,
    Skeletal,
    Modal,
    DeleteDialogComp,
    EditForm,
  },
  setup() {
    const orderId = ref("");
    const showModal = ref({
      Component: "DeleteDialogComp",
      open: false,
    });
    const store = useStore();
    const route = useRoute();
    const router = useRouter()
    const singleOrderDetails = ref<Record<string, any>>({});
    const isLoading = ref(true);
    const EditProps = computed(() => {
      if (showModal.value.Component === "EditForm") {
        return {
          price: singleOrderDetails.value?.price,
          freight_value: singleOrderDetails.value?.freight_value,
          shipping_limit_date: formatDate(
            singleOrderDetails.value?.shipping_limit_date
          ),
          order_id: singleOrderDetails.value?.order_id,
        };
      }
      return {};
    });
    const { read } = useAPI();

    const handleEdit = (id: any) => {
      orderId.value = id;
      showModal.value.Component = "EditForm";
      showModal.value.open = true;
    };

    const handleDelete = (id: any) => {
      orderId.value = id;
      showModal.value.Component = "DeleteDialogComp";
      showModal.value.open = true;
    };

    const handleClose = () => {
      showModal.value.open = false;
    };

    const handleAction = () => {
      handleClose();
      router.replace({name: 'Orders'})
    };

    const handleEditAction = () => {
      handleClose();
      store.setNotification("Updated Successful", 'success');
    };

    onMounted(() => {
      isLoading.value = true;
      (async () => {
        try {
          const id = route.params?.id;
          const url = `/v1/order_items/${id}`;
          const data = await read(url);
          singleOrderDetails.value = {
            ...data.data,
          };
          isLoading.value = false;
        } catch (error) {
          isLoading.value = false;
          store.setNotification(
            "Oops! cannot retrieve data at the moment try again later"
          );
        }
      })();
    });

    return {
      singleOrderDetails,
      isLoading,
      showModal,
      handleEdit,
      handleDelete,
      handleClose,
      handleAction,
      EditProps,
      handleEditAction,
      formatDate
    };
  },
});
</script>
<style scoped>
.single--wrapper {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.image--wrapper {
  width: 318px;
  height: 450px;
}

.image--wrapper img {
  width: 100%;
  height: 100%;
}

.description {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  padding: 10px 5px;
}

.description h2 {
  font-weight: 700;
  font-size: 35px;
  line-height: 44px;
}

.description p {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #434854;
}

.action--wrapper {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
}

.action--wrapper button:last-of-type {
  background-color: red;
}

@media screen and (max-width: 725px) {
  .single--wrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 365px) {
  .description {
    width: 100%;
  }
  .image--wrapper {
    width: 100%;
    height: 100%;
  }

  .description h2 {
    font-size: 20px;
    word-break: break-word;
    overflow-wrap: break-word;
    line-height: 24px;
  }

  .description p {
    font-size: 10px;
    word-break: break-word;
    overflow-wrap: break-word;
  }
}
</style>
