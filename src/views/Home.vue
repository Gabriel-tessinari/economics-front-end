<script setup lang="ts">
import { ref } from 'vue';
import { shared } from '../stores/shared.store';
import { reactive } from 'vue';

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
const transactions = ref<any[]>([]);
const data = reactive({ gain: 0, loss: 0 });

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
  transactions.value = [
    {id: 'nov01', title: 'Compras', description: 'Compras do mês', total: 50.50, isGain: false},
    {id: 'nov02', title: 'Salário', description: '', total: 3000, isGain: true}
  ];

  data.gain = 0;
  data.loss = 0;

  transactions.value.forEach(item => {
    item.isGain ? data.gain += item.total : data.loss += item.total;
  });
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
            {{ shared.maskReal(data.loss) }}
          </div>
          <div class="in bg-green">
            {{ shared.maskReal(data.gain) }}
            <span class="material-symbols-outlined ml-2">thumb_up</span>
          </div>
        </div>
      </div>
      <div class="chat-body h-100">
        <div class="chat-date">
          <v-chip variant="outlined">
            {{ month + ' ' + year }}
          </v-chip>
        </div>
        <div class="chat-message" v-for="item in transactions" :class="{'gain': item.isGain}">
          <div class="w-100 d-flex">
            <div class="message-title">{{ item.title }}</div>
            <v-spacer style="min-width: 24px;"></v-spacer>
            <div class="message-total">{{ shared.maskReal(item.total) }}</div>
          </div>
          <div class="message-description">{{ item.description }}</div>
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

.chat-body {
  display: flex;
  flex-direction: column;
  
  .chat-date {
    display: flex;
    justify-content: center;
    padding: 12px;
  }
  
  .chat-message {
    display:flex;
    align-items: center;
    flex-direction: column;
    background-color: #ef5350;
    margin: 0 35px;
    margin-bottom: 8px;
    padding: 15px;
    border-radius: 12px;
    max-width: 75%;
    width: fit-content;
    font-weight: 300;
  
    &.gain {
      background-color: #66bb6a;
      align-self: end;
    }

    .message-description {
      width: 100%;
    }
  }
}

</style>../stores/shared.store