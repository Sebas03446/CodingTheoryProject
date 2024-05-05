<template>
  <footer class="bg-primary">
    <nav class="container mx-auto px-4 sm:px-6 py-4">
      
      <div class="flex justify-between items-center flex-wrap">
        <div class="flex items-center">
          <img src="@/assets/icons/logo.svg" alt="Logo" />
          <span class="text-white">Ofertios</span>
        </div>
        <ul class="flex flex-wrap justify-center items-center space-x-4">
          <li>
            <a href="/conditions" class="text-white hover:underline"
              >Términos y condiciones</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style lang="scss"></style>
