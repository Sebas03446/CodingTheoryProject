<script setup>

const client = useSupabaseClient();
const router = useRouter();
const email = ref("");
const password = ref("");
const errorMsg = ref(null);
const emit = defineEmits(["close-login-menu", "user-logged-in"]);

async function signIn() {
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    
    if (error) throw error;

    emit("user-logged-in");
  } catch(error) {
    errorMsg.value = error.message;
  }
}

function isValidEmail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

function  closeLoginModal() {
  emit("close-login-menu");
    }

</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-8 m-4 w-96 mx-auto">
    <div class="button-container flex justify-end">
      <button @click="closeLoginModal" class="text-right text-gray-500 cursor-pointer">x</button>
    </div>
    <h1 class="text-lg font-bold text-center mb-6 text-primary">Inicio de sesión</h1>
    <form class="space-y-4" @submit.prevent="signIn">
      <div class="flex flex-col items-start">
        <input type="email" v-model="email" placeholder="Correo electrónico" required class="mt-1 w-full h-7 border-2 rounded" :class="{'border-red-300 bg-red-50 placeholder-red-200 text-red-900': !isValidEmail(email) && email.length > 0}">
        <p v-if="!isValidEmail(email) && email.length > 0" class="text-red-400 text-xs">Correo electrónico inválido</p>
      </div>
      <div>
        <input type="password" v-model="password" placeholder="Contraseña" required class="mt-1 w-full h-7 border-2 rounded">
        <a href="/forgotpassword/" class="text-xs text-tertiary hover:underline block text-right mt-2">¿Has olvidado tu contraseña?</a>
      </div>
      <div class="flex items-center justify-end mt-6 gap-4">
        <button :disabled="!isValidEmail(email) || !password" type="button" @click="signIn" class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center" :class="{'bg-gray-300 cursor-not-allowed': !isValidEmail(email) || !password}">Ingresar</button>
      </div>
    </form>
    <p v-if="errorMsg" class="text-red-400 text-xs mt-4">{{ errorMsg }}</p>
  </div>
</template>

<style lang="scss" scoped>
</style>
