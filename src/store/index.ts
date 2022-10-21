import { defineStore } from "pinia";

export const useStore = defineStore("user", {
  state: () => {
    return {
      menuIsOpen: false,
      notification: {
        message: "",
        show: false,
        type: 'error'
      },
    };
  },

  actions: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },

    setNotification(message: string, type = "error") {
      this.notification = {
        message,
        show: true,
        type
      };
      setTimeout(() => {
        this.notification = {
          message: "",
          show: false,
          type: 'error'
        };
      }, 2000);
    },
  },

  getters: {
    getMenuIsOpen(state) {
      return state.menuIsOpen;
    },

    getNotificationStatus(state) {
      return state.notification;
    },
  },
});
