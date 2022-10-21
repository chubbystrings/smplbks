<template>
  <div class="content--wrapper">
    <Header />
    <div class="main--content">
      <slot name="card"></slot>
      <h3>{{ title }}</h3>
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, ref } from "vue";
import Header from "@/components/ui/molecule/Header.vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    Header,
  },

  setup(props) {
    const { title } = toRefs(props);
    const clicked = ref(false);

    return { title, clicked };
  },
});
</script>

<style scoped>

.content--wrapper {
  overflow-x: hidden;
  background-color: #fff;
}

.main--content {
  overflow-x: hidden;
  padding: 50px 30px;
}

.main--content h3 {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  color: #a4a7b7;
  margin: 15px 0;
}

@media screen and (max-width: 1200px) {
  .auth--dashboard--wrapper {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 365px) {
  .main--content {
    padding: 10px;
  }
}
</style>
