<template>
  <div class="header">
    <div class="toggle--wrapper">
      <ToggleButton />
    </div>
    <div class="back--wrapper" v-if="isSingleRoute" @click="handleClick">
      <img src="/img/svg/back.svg" />
      <p>Back</p>
    </div>
    <div class="header--content">
      <div class="account--wrapper">
        <div>
          <img src="/img/svg/account.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import ToggleButton from "../atom/ToggleButton.vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  components: {
    ToggleButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isDropdown = ref(false);

    const handleClick = () => {
      router.go(-1);
    };

    const handleDropdown = () => {
      isDropdown.value = !isDropdown.value;
    };

    const isSingleRoute = computed(() => route.name === "Single");

    return { isSingleRoute, handleClick, isDropdown, handleDropdown };
  },
});
</script>
<style scoped>
.header {
  width: 100%;
  height: 64px;
  background: #ffffff;
  box-shadow: 0px 2px 6px rgba(229, 229, 229, 0.3);
  display: flex;
  padding: 0 10px;
  position: relative;
  justify-content: flex-end;
}

.dropdown {
  position: absolute;
  right: 15px;
  top: 50px;
  width: 100px;
  max-height: 150px;
  flex-direction: column-reverse;
  gap: 10px;
  padding: 10px;
  display: none;
  background: white;
  z-index: 99;
  border: 1px solid rgba(0, 0, 0, 0.3);
}
.mobile--account--wrapper {
  display: flex;
  gap: 2px;
  align-items: center;
}

.mobile--account--wrapper small {
  font-size: 9px;
}

.back--wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
}

.back--wrapper p {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.3);
}

.toggle--wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
  left: 5px;
  display: none;
}
.header--content {
  display: flex;
  gap: 40px;
  align-items: center;
}

.account--wrapper {
  display: flex;
  gap: 20px;
  align-items: center;
}

.dot-wrapper {
  cursor: pointer;
}

@media screen and (max-width: 1200px) {
  .toggle--wrapper {
    display: block;
  }
}

@media screen and (max-width: 365px) {
  .header--content div:nth-of-type(1),
  .header--content div:nth-of-type(2) {
    display: none;
  }
  .dropdown {
    display: flex;
  }
}

@media screen and (max-width: 250px) {
  .dot-wrapper {
    display: none;
  }
  .toggle--wrapper {
    left: initial;
    right: 5px;
  }
}
</style>
