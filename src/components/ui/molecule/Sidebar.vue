<template>
  <template v-if="auth">
    <div v-if="menuIsOpen" class="overlay" @click="handleClick"></div>
    <div :class="`${menuIsOpen ? 'open' : ''} sidebar`" ref="container">
      <div class="toggle--button--wrapper">
        <toggle-button></toggle-button>
      </div>
      <div class="avatar--wrapper">
        <div class="sidebar--account--wrapper">
          <div>
            <img src="/img/svg/account.svg" />
          </div>
        </div>
      </div>
      <div class="headers">
        <div class="logo--wrapper">
          <img src="/img/jpeg/Simplebks-logo.png" />
        </div>
        <router-link
          to="/orders"
          :class="`link--wrapper ${
            currentSingleRoute === 'Orders' ? 'link-active' : ''
          }`"
        >
          <div class="">
            <span class="material-symbols-outlined"> dashboard </span>
          </div>
          <p>Orders</p>
        </router-link>
      </div>
      <div class="link--wrapper logout" @click="handleLogout">
        <div class="">
          <i class="material-symbols-outlined"> logout </i>
        </div>
        <p>Logout</p>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="section--one">
      <div class="image--wrapper">
        <img src="/img/jpeg/Simplebks-logo.png" />
      </div>
    </div>
  </template>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "../../../store";
import { storeToRefs } from "pinia";
import ToggleButton from "../atom/ToggleButton.vue";
import { useRoute, useRouter } from "vue-router";
import { removeUser } from "@/utils/Auth";

export default defineComponent({
  props: {
    auth: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    ToggleButton,
  },
  setup(props) {
    const store = useStore();
    const { menuIsOpen } = storeToRefs(store);
    const route = useRoute();
    const router = useRouter();

    const handleClick = () => store.toggleMenu();
    const currentSingleRoute = computed(() => {
      if (route.params?.single) {
        return route.params.single;
      }
      return route.name;
    });

    const handleLogout = () => {
      removeUser();
      router.replace({ name: "Login" });
    };

    onMounted(() => {
      console.log(props.auth);
    });

    return { menuIsOpen, handleClick, currentSingleRoute, handleLogout };
  },
});
</script>
<style scoped>
/* .slide-in {
  animation: slide 0.1s ease-in;
} */
.sidebar {
  position: relative;
  background-color: var(--primary);
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  gap: 100px;
  transition: 0.5s left ease-out;
  box-sizing: border-box;
  z-index: 1;
  height: 100vh;
  width: 400px;
  /* animation: slide .5s ease-in; */
}

.avatar--wrapper {
  display: none;
}

.toggle--button--wrapper {
  position: absolute;
  right: 0px;
  top: -5px;
  display: none;
}

.sidebar .headers {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
}
.logo--wrapper {
  width: 200px;
  height: 46px;
}

.logo--wrapper img {
  width: 100%;
  height: 100%;
}

.link--wrapper {
  display: flex;
  gap: 20px;
  padding: 15px 10px;
  color: white;
  align-items: center;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.logout {
  position: absolute;
  bottom: 10px;
  width: 80%;
  cursor: pointer;
}

.link--wrapper .icon {
  width: 18px;
  height: 18px;
  margin: 0;
}

.icon img {
  width: 100%;
  height: 100%;
}

.link--wrapper:hover {
  background: var(--secondary);
  transition: all 0.2s ease-out;
  color: var(--primary);
}

.link--wrapper.router-link-active,
.link--wrapper.link-active {
  background: var(--secondary);
  transition: all 0.2s ease-out;
  color: #000;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.overlay {
  position: absolute;
  z-index: 9;
  background: rgba(0, 0, 0, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
}

.section--one {
  position: relative;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 400px;
}

@media screen and (max-width: 1200px) {
  .section--one {
    padding: 0 10px;
  }
  .section--one .image--wrapper {
    height: 300px;
    width: 300px;
  }
  .image--wrapper img {
    width: 100%;
    height: 100%;
  }
}

@media screen and (max-width: 1200px) {
  .sidebar {
    position: fixed;
    height: 100vh;
    left: -400px;
    z-index: 10000;
  }
  .open.sidebar {
    left: 0;
  }
  .toggle--button--wrapper {
    display: block;
  }
}

@media screen and (max-width: 925px) {
  .section--one {
    display: none;
  }
}

@media screen and (max-width: 445px) {
  .open.sidebar {
    width: 80%;
  }

  .link--wrapper {
    display: flex;
    padding: 5px;
    justify-content: center;
  }
  .link--wrapper p {
    display: none;
  }

  .logo--wrapper {
    max-width: 100%;
  }

  .avatar--wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    align-items: center;
  }

  .avatar--wrapper > div:last-of-type {
    display: flex;
    gap: 2px;
    align-items: center;
    color: #fff;
    justify-content: center;
    flex-direction: column;
  }
  .avatar--wrapper > div {
    max-width: 50px;
  }
  .sidebar--account--wrapper > div {
    max-width: 50px;
  }
  .sidebar--account--wrapper,
  .avatar--wrapper > div img {
    width: 100%;
  }

  .sidebar--account--wrapper > small {
    word-break: break-word;
    overflow-wrap: break-word;
    text-align: center;
  }
}

@keyframes slide {
  from {
    transform: translateX(-50%);
  }

  to {
    transform: translateX(0);
  }
}
</style>
