import { defineStore } from 'pinia';

export const loginStore = defineStore('login', {
    state: () => ({
        isAdmin: false,
    }),
    actions: {
        toggleAdmin() {
            this.isAdmin = !this.isAdmin;
        },
    },
});
