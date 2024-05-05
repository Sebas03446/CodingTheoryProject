<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  cardClass: {
    type: String,
    default: "bg-white border border-gray-200 rounded-lg",
  },
});

const emit = defineEmits(["product-clicked"]);

const handleClick = () => {
  emit("product-clicked", props.product);
};

const formattedPrice = computed(() => {
  const price = parseInt(props.product.precio, 10).toLocaleString();
  return `$${price}`;
});
</script>

<template>
    <div @click="handleClick" :class="cardClass" class="cursor-pointer transition-all hover:shadow-xl">
      <div class="flex flex-col items-center p-5">
        
        <div class="w-20 h-20 bg-gray-300 rounded-lg mb-4 flex items-center justify-center text-gray-500">
          <i class="fas fa-box-open"></i> <!-- Default icon or text -->
        </div>
  
        <h3 class="text-primary font-bold text-xl">{{ product.nombre }}</h3>
        <p class="text-secondary text-sm">{{ product.nombreAlmacen }}</p>
  
        
        <div class="text-quinary font-bold text-lg mt-2">{{ formattedPrice }}</div>
      </div>
    </div>
  </template>

  
  <style lang="scss" scoped>
  </style>
  