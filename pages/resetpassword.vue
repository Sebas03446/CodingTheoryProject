  <script setup>
  import { useRouter } from "vue-router";
  import { ref } from "vue";
  import FooterComponent from "@/components/Footer.vue";
  
  const client = useSupabaseClient();
  const router = useRouter();
  const password = ref("");
  const confirmPassword = ref("");
  const errorMsg = ref(null);
  const successMsg = ref(null);

  
  async function resetPassword() {
    try {
      if (password.value !== confirmPassword.value) {
        errorMsg.value = "Las contraseñas no coinciden.";
        return;
      }
  
      const { error } = await client.auth.updateUser({ password: password.value });
  
      if (error) {
        errorMsg.value = error.message;
      } else {
        successMsg.value = "Contraseña restablecida correctamente.";
        router.push("/");
      }
    } catch(error) {
      errorMsg.value = "Hubo un error al restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.";
    }
  }

  function isValidPassword(password) {
  return password.length >= 6 && password.length <= 20;
}

  function validPassword(event) {
  event.preventDefault();


  if (!isValidPassword(password.value)) {
    errorMsg.value = "La contraseña debe tener entre 6 y 20 caracteres";
    return;
  }
}


  </script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-8 m-4 w-96 mx-auto">
    <div class="container">
      <form @submit.prevent="resetPassword">
        <div class="text-lg font-bold text-center mb-6 text-primary">
          <label for="password">Restablecer contraseña</label>
          <p class="text-gray-400 text-xs">Por favor, ingrese su nueva contraseña.</p>
          
          <input type="password" v-model="password" placeholder="Nueva contraseña" required class="mt-1 w-full h-7 border-2 rounded" :class="{'border-red-300 bg-red-50 placeholder-red-200 text-red-900': password.length > 0 && !isValidPassword(password)}">
          <p v-if="password.length > 0 && !isValidPassword(password)" class="text-red-400 text-xs">La contraseña debe tener entre 6 y 20 caracteres</p>
          
          <p class="text-gray-400 text-xs">Confirme su nueva contraseña.</p>
          
          <input type="password" v-model="confirmPassword" placeholder="Confirme su nueva contraseña" required class="mt-1 w-full h-7 border-2 rounded" :class="{'border-red-300 bg-red-50 placeholder-red-200 text-red-900': confirmPassword.length > 0 && confirmPassword !== password}">
          <p v-if="confirmPassword.length > 0 && confirmPassword !== password" class="text-red-400 text-xs">Las contraseñas no coinciden</p>
          
          <button type="submit" 
            class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            :disabled="!isValidPassword(password)">Restablecer contraseña</button>
        </div>
      </form>
      <div v-if="errorMsg" class="text-red-400 text-xs mt-4">{{ errorMsg }}</div>
      <div v-if="successMsg" class="text-green-400 text-xs mt-4">{{ successMsg }}</div>
    </div>
  </div>
  <FooterComponent/>
</template>

<style scoped>

.container {
  flex: 1;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input[type="password"] {
  width: 100%;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

</style>
  