<template>
    <transition name="fade">
      <div v-if="show" :class="['toast', typeClass]" @click="hideToast">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    type: {
      type: String,
      default: 'info', 
    },
    message: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Notification',
    },
    duration: {
      type: Number,
      default: 5000, 
    },
  });
  
  const show = ref(false);
  
  const typeClass = computed(() => {
    switch (props.type) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      case 'warning':
        return 'toast-warning';
      default:
        return 'toast-info';
    }
  });
  
  function showToast() {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, props.duration);
  }
  
  function hideToast() {
    show.value = false;
  }
  
  onMounted(() => {
    showToast();
  });
  
  watch(() => props.message, () => {
    showToast();
  });
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  .toast {
    cursor: pointer;
    position: absolute;
    bottom: 800px;
    right: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
  }
  
  .toast-success {
    background-color: green;
  }
  
  .toast-error {
    background-color: red;
  }
  
  .toast-warning {
    background-color: orange;
  }
  
  .toast-info {
    background-color: blue;
  }
  </style>
  