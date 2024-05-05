<template>
    <div :class="cardClasses">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">{{ title }}</h2>
        <slot name="content">
          <p class="text-gray-600 text-justify mt-1">{{ content }}</p>
        </slot>
        <slot name="image"></slot>
        <slot name="footer">
        </slot>
      
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      default: 'Card Title',
    },
    content: {
      type: String,
      default: 'Card content goes here.',
    },
    cardClass: {
      type: String,
      default: 'bg-white border border-gray-200 rounded-lg shadow-lg transition-all hover:shadow-xl w-full', 
    },
  });
  
  const cardClasses = computed(() => {
    return ` ${props.cardClass}`;
  });
  </script>
  
  <style scoped>
  /* Ensure all CSS blocks are properly closed */
  </style>
  