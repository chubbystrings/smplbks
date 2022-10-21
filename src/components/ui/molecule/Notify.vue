<template>
  <div :class="`notification ${notifTypeClass}`">
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from "vue";

export default defineComponent({
  props: {
    type: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const notifTypeClass = computed(() =>
      props.type === "success" ? "success" : "error"
    );
    const { message } = toRefs(props);
    return { message, notifTypeClass };
  },
});
</script>

<style scoped>
.notification {
  background-color: #f6f6f8;
  border-left: 5px solid red;
  border-radius: 2px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
  max-width: 250px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
.success {
  border-left: 5px solid green;
}

.success p {
  color: green;
}
.error p {
  color: red;
}

.notification p {
  font-size: 15px !important;
  font-weight: bolder;
}
</style>
