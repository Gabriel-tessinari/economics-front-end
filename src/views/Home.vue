<script setup lang="ts">
import { ref } from 'vue';

const accountSearch = ref('');
const accounts = ref([
  {name: 'Conta 1', total: 5.2},
  {name: 'Conta 2', total: -100}
]);
const filteredAccounts = ref(accounts.value);
const selectedAccount = ref({ name: '', total: 0 });

function search() {
  if(accountSearch.value == '') filteredAccounts.value = accounts.value;
  else filteredAccounts.value = accounts.value.filter(account => 
    account.name.toLowerCase().includes(accountSearch.value.toLowerCase()));  
}

function formatTotal(total: number) {
  if(total >= 0) return 'R$' + total.toFixed(2).replace('.', ',');
  return '-R$' + (-1 * total).toFixed(2).replace('.', ',');
}

function selectAccount(account: any) {
  selectedAccount.value = account;
}
</script>

<template>
  <main class="d-flex flex-row justify-space-between">
    <v-card variant="tonal" class="bg-background-lighten" width="25%" height="100%">
      <div class="pa-5">
        <v-text-field v-model="accountSearch" label="Pesquisar" variant="outlined"
        v-on:keyup="search()">
        </v-text-field>
      </div>
      <div class="account d-flex flex-column pa-5" v-for="account in filteredAccounts"
      @click="selectAccount(account)">
        <p class="name">{{ account.name }}</p>
        <p class="total">{{ formatTotal(account.total) }}</p>
      </div>
    </v-card>
    <v-card variant="tonal" class="bg-background-lighten" width="74%" height="100%">
      {{ selectedAccount.name }}
    </v-card>
  </main>
</template>

<style lang="scss">
.account {
  width: 100%;
  height: 90px;
  cursor: pointer;
  max-width: 100%;
  font-weight: 300;

  .name {
    font-size: larger;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .total {
    display: flex;
    justify-content: end;
  }

  &:hover {
    background-color: rgb(var(--v-theme-background));
  }
}
</style>