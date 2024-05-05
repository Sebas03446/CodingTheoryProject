<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import FooterComponent from "@/components/Footer.vue"; 


const client = useSupabaseClient();
const router = useRouter();
const email = ref("");
const errorMsg = ref(null);
const successMsg = ref(null);
const redirectTo = process.env.OFERTIOS_REDIRECT_TO;

async function resetPassword() {
  try {
    const { error } = await client.auth.resetPasswordForEmail(email.value, { redirectTo });
    

    if (error) {
      errorMsg.value = error.message;
    } else {
      successMsg.value = "Se ha enviado el correo electrónico a su bandeja de entrada.";
    }
  } catch(error) {
    errorMsg.value = "Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.";
  }
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-8 m-4 w-96 mx-auto">
    <div class="container">
      <form @submit.prevent="resetPassword">
        <div class="text-lg font-bold text-center mb-6 text-primary">
          <label for="email">Restablecer contraseña</label>
          <p class="text-xs text-gray-400 mb-2">Por favor ingrese su dirección de correo. Le enviaremos las instrucciones para restablecer su contraseña.</p>
          <input type="email" id="email" v-model="email" required>
        </div>
        
        <div class="text-center">
          <button @click="submit" 
            class="text-white bg-primary hover:bg-secondary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            :class="{'bg-gray-300 cursor-not-allowed': successMsg || errorMsg}"
            style="max-width: 100%">
            Enviar
          </button>
        </div>
      </form>
      <div class="text-green-400 text-xs mt-4" v-if="successMsg">{{ successMsg }}</div>
      <div class="text-red-400 text-xs mt-4" v-if="errorMsg">{{ errorMsg }}</div>
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

input[type="email"] {
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

</style>
