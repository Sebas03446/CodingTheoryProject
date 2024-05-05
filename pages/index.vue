<script setup>
/* definePageMeta({
  middleware: ['is-loggin']
}) */

const isLoginMenuOpen = ref(false);
const isSignUpMenuOpen = ref(false);
const isLogged = ref(false);

const client = useSupabaseClient();



const handleOpenLoginMenu = () => {
  isLoginMenuOpen.value = true;
};

const handleCloseLoginMenu = () => {
  isLoginMenuOpen.value = false;
};

const handleOpenSignUpMenu = () => {
  isSignUpMenuOpen.value = true;
};

const handleCloseSignUpMenu = () => {
  isSignUpMenuOpen.value = false;
};

const handleUserLoggedIn = () => {
  isLoginMenuOpen.value = false;
  navigateTo('/products')
  isLogged.value = true;
};

const handleUserLoggedOut = () => {
  client.auth.signOut();
  isLogged.value = false;
};
</script>

<template>
  <div :class="{ 'overlay-active': isLoginMenuOpen || isSignUpMenuOpen }" class="flex flex-col min-h-screen">
    <Header @open-login-menu="handleOpenLoginMenu" @open-register-menu="handleOpenSignUpMenu" :isLoogedIn="isLogged" @user-logged-out="handleUserLoggedOut" />
    <FileUpload />
  </div>
  <div v-if="isLoginMenuOpen" class="fixed inset-0 flex items-center justify-center">
    <Login class="login-modal" @close-login-menu="handleCloseLoginMenu" @user-logged-in="handleUserLoggedIn" />
  </div>
  <div v-if="isSignUpMenuOpen" class="fixed inset-0 flex items-center justify-center">
    <SignUp class="signup-modal" @close-signup-menu="handleCloseSignUpMenu" />
  </div>
</template>

<style lang="scss" scoped>
.overlay-active {
  @apply opacity-50 filter blur-sm;
}
</style>
