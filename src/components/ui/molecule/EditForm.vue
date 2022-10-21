<template>
  <div @click.stop="" class="input--wrapper">
    <h3>Edit Order</h3>
    <div class="form--field">
      <input v-model="shipping_date" type="date" id="shipping-date" required />
      <label alt="hipping date" for="hipping-date" placeholder="username"
        >Shipping Date Limit</label
      >
    </div>
    <div class="form--field">
      <input v-model="price" type="number" name="price" id="price" required />
      <label alt="price" for="price" placeholder="price">Price</label>
      <small class="error">{{}}</small>
    </div>
    <div class="form--field">
      <input
        v-model="freight_value"
        type="text"
        name="freight_value"
        id="freight_value"
        required
      />
      <label alt="freight_value" for="freight_value" placeholder="freight value"
        >freight value</label
      >
      <small class="error">{{}}</small>
    </div>
    <div class="actions">
      <button :disabled="isLoading" class="btn" @click.stop="handleCancel">
        Cancel
      </button>
      <button
        :disabled="isLoading"
        class="btn deleteBtn"
        @click.stop="handleSubmit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import useAPI from "@/composables/useApi";

export default defineComponent({
  emits: ["close:modal", "action:edit"],
  props: {
    price: {
      type: String,
    },
    freight_value: {
      type: String,
    },
    shipping_limit_date: {
      type: String,
    },
    order_id: {
        type: String,
        required: true
    }
  },

  setup(props, { emit }) {
    const price = ref("");
    const shipping_date = ref("");
    const freight_value = ref("");
    const isLoading = ref(false);
    const { patch } = useAPI();

    const handleSubmit = async () => {
      isLoading.value = true;
      try {
        const res = await patch("/v1/order_items", props.order_id, {
          price: price.value,
          freight_value: freight_value.value,
          shipping_limit_date: new Date(shipping_date.value),
        });
        console.log(res)
      } catch (error) {
        console.log(error);
      }
      isLoading.value = false;
      emit("action:edit");
    };

    

    const handleCancel = () => {
      emit("close:modal");
    };

    onMounted(() => {
      price.value = props?.price as string;
      shipping_date.value = props?.shipping_limit_date as string;
      freight_value.value = props.freight_value as string;
    });

    return {
      handleSubmit,
      price,
      shipping_date,
      freight_value,
      isLoading,
      handleCancel,
    };
  },
});
</script>

<style scoped>
.input--wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.form--field {
  position: relative;
  box-sizing: border-box;
  margin: auto;
  padding: 0px;
  font-size: 1em;
}

.form--field > input {
  background: #ffffff;
  border: 1px solid #a4a7b7;
  border-radius: 4px;
  height: 45px;
  width: 335px;
  outline: none;
  padding: 10px;
  box-sizing: border-box;
}

.form--field > input:focus {
  border: 1px solid #0a74dc;
}

.form--field > label {
  font-size: 11px;
  line-height: 16px;
  color: #b0b9c8;
  width: auto;
  padding: 0px 0.5em 0px 0.5em;
  margin: 0px;
  background: white;
  transition: 0.2s ease-in-out;
  top: -5px;
  left: 2em;
  position: absolute;
}

.actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 0 auto;
}

.btn {
  width: 150px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
}
</style>
