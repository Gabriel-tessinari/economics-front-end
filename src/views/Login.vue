<script setup lang="ts">
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import loginService from '../services/login.service';
import router from '../router';

const form = reactive({
  email: '',
  password: ''
});

const rules = {
  email: {
    required: helpers.withMessage('Campo obrigatório', required), 
    email: helpers.withMessage('Deve ser um E-mail', email)
  },
  password: {
    required: helpers.withMessage('Campo obrigatório', required)
  }
};

const validation = useVuelidate(rules, form);

function login() {
  loginService.login(form)
  .then(() => {
    router.push('/');
  })
  .catch(error => {
    console.log("🚀 ~ login ~ error", error);
  })
}
</script>

<template>
  <main class="d-flex align-center justify-center">
    <v-card variant="tonal" class="bg-text-color" width="25vw">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field v-model="validation.email.$model" label="E-mail" 
            variant="outlined" required
            :error-messages="validation.email.$errors.map(e => e.$message.toString())">
          </v-text-field>
          <v-text-field v-model="validation.password.$model" label="Senha" 
            type="password" variant="outlined" required
            :error-messages="validation.password.$errors.map(e => e.$message.toString())">
          </v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-end pa-4 pt-0">
      <v-btn variant="outlined" @click="login()" :disabled="validation.$invalid">
        Confirmar
      </v-btn>
    </v-card-actions>
    </v-card>
  </main>
</template>

<style scoped lang="scss">
.v-text-field {
  margin-top: .5rem;
}
</style>