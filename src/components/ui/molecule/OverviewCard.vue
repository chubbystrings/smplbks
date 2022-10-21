<template>
  <div class="overview--card" v-if="!isLoading">
    <div class="card--header">
      <h3>{{ title }}</h3>
      <div class="colored" :style="{ backgroundColor: color }"></div>
    </div>
    <div class="footer">
      <p>{{ value }}</p>
      <small>20 More than than yesterday</small>
    </div>
  </div>
  <div v-else class="loading--card">
    <Skeletal  width="208px" height="130px" />
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from "vue";
import Skeletal from "./SkeletalLoader.vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: false,
    },

    isLoading: {
      type: Boolean,
      required: true,
    },
  },

  components: {
    Skeletal,
  },
  setup(props) {
    const { title, color, value, isLoading } = toRefs(props);

    return { title, color, value, isLoading };
  },
});
</script>
<style scoped>
.overview--card {
  width: 208px;
  height: 130px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 17px;
  display: inline-block;
  margin-right: 20px;
  position: relative;
}

.loading--card {
  width: 208px;
  height: 130px;
  border-radius: 10px;
  display: inline-block;
  margin-right: 20px;
  position: relative;
}

.card--header {
  display: flex;
  justify-content: space-between;
}
.card--header h3 {
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}
.colored {
  width: 27px;
  height: 26px;
  left: 473px;
  top: 131px;
  border-radius: 5px;
}

.footer {
  position: absolute;
  bottom: 10px;
}

.footer p {
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
}

.footer small {
  font-weight: 400;
  font-size: 9px;
  line-height: 24px;
  color: #00992b;
}
</style>
