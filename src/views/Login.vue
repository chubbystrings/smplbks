<template>
  <login-component></login-component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginComponent from '@/components/ui/organism/LoginComponent.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Login',
  components: {
    LoginComponent,
  },
});
</script>
