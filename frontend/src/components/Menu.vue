<template>
    <div class="floating-menu">
      <button type="button" class="btn btn-primary" @click="toggleMenu">{{ label }}</button>
      <div v-show="isOpen" class="menu-items">
        <a v-for="(item, index) in items" :key="index" class="dropdown-item" :href="item.link">{{ item.label }}</a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Menu",
    props: {
      label: {
        type: String,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isOpen = !this.isOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  .floating-menu {
    position: relative;
    display: inline-block;
    margin-left: 10px;
  }
  
  .menu-items {
    position: absolute;
    top: 30px;
    right: 0;
    z-index: 1;
    background-color: #fff;
    padding: 5px 10px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  }
  
  .dropdown-item {
    display: block;
    padding: 5px 0;
    font-size: 14px;
  }
  </style>
  