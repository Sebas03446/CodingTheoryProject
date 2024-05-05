<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center">
      <div class="flex justify-between items-center w-full sm:w-auto">
        <span>Teoría de Códigos</span>
      </div>

      <ul class="hidden sm:flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0 w-full sm:w-auto"
        v-if="!isLoogedIn">
        <li>
          <a href="/" class="text-black hover:text-black">Inicio</a>
        </li>
        <li>
          <a href="/about" class="text-black hover:text-black">¿Quiénes Somos?</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    isLoogedIn: Boolean,
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    openLoginMenu() {
      this.$emit("open-login-menu");
    },
    openRegisterMenu() {
      this.$emit("open-register-menu");
    },
    logout() {
      this.$emit("user-logged-out");
    },
  },
};
</script>

<style lang="scss"></style>
