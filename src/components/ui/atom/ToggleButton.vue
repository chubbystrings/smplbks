<template>
  <div class="button--wrapper">
    <button
      :class="`${menuIsOpen ? 'clicked' : ''} toggle--btn`"
      @click="handleToggle"
    ></button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "../../../store";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const store = useStore();
    const { menuIsOpen } = storeToRefs(store);

    const handleToggle = () => {
      store.toggleMenu();
    };
    return { menuIsOpen, handleToggle };
  },
});
</script>

<style scoped>
.button--wrapper button {
  background-color: var(--secondary);
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle--btn::before {
  content: "";
  background-color: #fff;
  height: 2px;
  width: 10px;
  position: absolute;
  top: 0.8rem;
  transform: rotate(0);
}
.toggle--btn::after {
  content: "";
  background-color: #fff;
  height: 2px;
  width: 10px;
  position: absolute;
  transition: all 0.5s ease;
  top: 1.2rem;
  transform: rotate(0);
}

.clicked.toggle--btn::before {
  top: 1rem;
  transform: rotate(135deg);
}
.clicked.toggle--btn::after {
  top: 1rem;
  transform: rotate(-135deg);
}
</style>
