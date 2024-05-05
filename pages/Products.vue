<script setup>
definePageMeta({
  middleware: ['auth']
})
import { ref, computed, onMounted } from "vue";


const products = ref([]);
const fetching = ref(false);
const currentPage = ref(1);
const itemsPerPage = 10;
const productoId = ref(null);
const isAbleHistory = ref(false);
const product = ref(null);
const precios = ref([]);
const chartData = ref(null);
const isLogged = ref(true);


const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

const onProductClicked = async (product) => {
  await fetchProductHistory(product.producto_id);
  isAbleHistory.value = true;
};

async function fetchProducts() {
  fetching.value = true;
  try {
    const response = await useFetch('/api/productos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await response.execute();

    if (response.error.value) {
      console.log('Error obteniendo productos');
    } else {
      products.value = response.data.value;
    }
  } catch (error) {
    console.log('Error obteniendo productos');
  } finally {
    fetching.value = false;
  }
}

async function fetchProductHistory(producto_id) {
  console.log(producto_id, "ssssssssss");
  const response = await useFetch(`/api/historial_producto?producto_id=${producto_id}`, {
    method: "GET",
    headers: {
      "Accept": "*/*",
    },
  });

  await response.execute();

  if (response.error.value) {
    console.error("Error fetching product history");
  } else {
    product.value = response.data.value.producto;
    precios.value = response.data.value.precios;

    const labels = precios.value.map((entry) => {
      const date = new Date(entry.fecha);
      return date.toLocaleDateString();
    });

    const data = precios.value.map((entry) => parseFloat(entry.precio));
    chartData.value = {
      labels,
      datasets: [
        {
          label: "Precio en el tiempo",
          data,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  }
};

const handleUserLoggedOut = async () => {
  console.log("handleUserLoggedOut");
  try {
    const client = useSupabaseClient();
    const { error } = await client.auth.signOut();
    if (error) {
      console.error("Error signing out", error);
      return;
    }
    isLogged.value = false;
    navigateTo('/');
  }catch(error) {
    console.error("Error signing out", error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <Header @user-logged-out="handleUserLoggedOut" :isLoogedIn="isLogged" />
  <div v-if="!isAbleHistory" class="flex flex-wrap justify-center m-10">
    <CardsProduct v-for="product in paginatedProducts" :key="product.producto_id" :product="product"
      cardClass="cursor-pointer transition-all bg-white border border-gray-200 rounded-lg hover:shadow-lg m-5 w-64 h-96"
      @product-clicked="onProductClicked" />
  </div>

  <div v-if="!isAbleHistory" class="flex justify-center mt-5">
    <button class="mr-2" :disabled="currentPage === 1" @click="currentPage--">
      Anterior
    </button>
    <span>Pagina {{ currentPage }} de {{ totalPages }}</span>
    <button class="ml-2" :disabled="currentPage === totalPages" @click="currentPage++">
      Siguiente
    </button>
  </div>
  <HistoryProduct v-if="isAbleHistory" :chartData="chartData" />
</template>

<style scoped lang="scss">
.card {
  width: 16rem;
  height: 24rem;
}

.truncated-text {
  @apply truncate;
}
</style>
