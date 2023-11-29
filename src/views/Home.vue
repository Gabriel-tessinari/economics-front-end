<script setup lang="ts">
import { ref } from 'vue';
import { shared } from '../stores/shared.store';

const accountSearch = ref('');
const accounts = ref([
  {name: 'Conta 1', total: 5.2},
  {name: 'Conta 2', total: -100}
]);
const filteredAccounts = ref(accounts.value);
const selectedAccount = ref({ name: 'Selecione uma conta', total: 0 });
const today = ref(new Date());
const month = ref(shared.getMonthById(today.value.getMonth()+1));
const year = ref(today.value.getFullYear());

function search() {
  if(accountSearch.value == '') filteredAccounts.value = accounts.value;
  else filteredAccounts.value = accounts.value.filter(account => 
    account.name.toLowerCase().includes(accountSearch.value.toLowerCase()));  
}

function selectAccount(account: any) {
  selectedAccount.value = account;
  loadTransactions();
}

function loadTransactions() {
  console.log(`Implementar transactionService.getByAccountAndDate(${selectedAccount.value.name}, ${today.value.getMonth()+1})`)
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
        <p class="total">{{ shared.maskReal(account.total) }}</p>
      </div>
    </v-card>
    <v-card variant="tonal" class="bg-background-lighten" width="74%" height="100%">
      <div class="chat-header bg-background">
        <div class="chat-title pa-3">
          {{ selectedAccount.name }}
          <v-spacer></v-spacer>
          <span class="icon material-symbols-outlined">tune</span>
        </div>
        <div class="chat-summary d-flex flex-row">
          <div class="out bg-red">
            <span class="material-symbols-outlined mr-2">thumb_down</span>
            R$100,00
          </div>
          <div class="in bg-green">
            R$20,00
            <span class="material-symbols-outlined ml-2">thumb_up</span>
          </div>
        </div>
      </div>
      <div class="chat-body bg-purple h-100">
        <div class="chat-date">
          <v-chip variant="outlined">
            {{ month + ' ' + year }}
          </v-chip>
        </div>
      </div>
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
  border-bottom: 1px solid rgb(var(--v-theme-text-color));

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

.chat-header {
  height: 10%;
}

.chat-title {
  height: 50%;
  font-size: xx-large;
  display: flex;
  align-items: center;
  font-weight: 300;

  .icon {
    cursor: pointer;

    &:hover {
      color: rgb(var(--v-theme-primary));
    }
  }
}

.chat-summary {
  height: 50%;

  .in, .out {
    width: 50%;
    display: flex;
    align-items: center;
    padding: 12px;
    font-weight: 300;
    font-size: x-large;
  }

  .in {
    justify-content: end;
  }
}

.chat-date {
  display: flex;
  justify-content: center;
  padding: 12px;
}
</style>../stores/shared.store