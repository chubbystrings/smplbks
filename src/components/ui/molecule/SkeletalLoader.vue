<template>
  <div class="loading" :style="{ width: width, height: height }"></div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  props: {
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { width, height } = toRefs(props);

    return { width, height };
  },
});
</script>
<style scoped>
.loading {
  position: relative;
  background-color: #e2e2e2;
  flex-shrink: 0;
}

.loading::after {
  display: block;
  content: "";
  position: absolute;
  width: 80%;
  height: 100%;
  top: 0;
  transform: translateX(-100%);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(transparent),
    color-stop(rgba(255, 255, 255, 0.2)),
    to(transparent)
  );
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: loading 1.1s infinite;
}

@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}
</style>
