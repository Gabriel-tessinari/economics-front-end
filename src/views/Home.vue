<script setup lang="ts">
import { ref, reactive } from 'vue';
import { shared } from '../stores/shared.store';
import Account from '../models/account';
import AccountList from '../components/home/AccountList.vue';
import { onMounted } from 'vue';
import accountService from '../services/account.service';

const accounts = ref<Account[]>([]);

const selectedAccount = ref<Account>(
  { 
    id: 0, 
    name: 'Selecione uma conta', 
    description: '', 
    currentMonthData: 0, 
    currentMonthStartTotal: 0,
    total: 0
  }
);

const today = ref(new Date());
const month = ref(shared.getMonthById(today.value.getMonth()+1));
const year = ref(today.value.getFullYear());
const transactions = ref<any[]>([]);
const data = reactive({ gain: 0, loss: 0 });

onMounted(() => {
  getAccounts();
});

function getAccounts() {
  accountService.findAll().then(response => {
    accounts.value = response;
  });
}

function selectAccount(account: Account) {
  selectedAccount.value = account;
  loadTransactions();
}

function loadTransactions() {
  transactions.value = [
    {id: 'nov01', title: 'Compras', description: 'Compras do mês', total: 50.50, isGain: false, date: new Date('2023-12-01').toISOString()},
    {id: 'nov02', title: 'Salário', description: '', total: 3000, isGain: true, date: new Date('2023-12-01').toISOString()},
    {id: 'nov01', title: 'Compras', description: 'Compras do mês', total: 50.50, isGain: false, date: new Date('2023-12-10').toISOString()},
    {id: 'nov02', title: 'Salário', description: '', total: 3000, isGain: true, date: new Date('2023-12-10').toISOString()}
  ];

  data.gain = 0;
  data.loss = 0;

  transactions.value.forEach(item => {
    item.isGain ? data.gain += item.total : data.loss += item.total;
  });
  console.log(`Implementar transactionService.getByAccountAndDate(${selectedAccount.value.name}, ${today.value.getMonth()+1})`)
}

function transactionHappened(date: string): boolean {
  return date <= today.value.toISOString();
}
</script>

<template>
  <main class="d-flex flex-row justify-space-between">
    <AccountList 
      :accounts="accounts"
      @select="(response: Account) => selectAccount(response)">
    </AccountList>

    <v-card variant="tonal" class="bg-background-lighten d-flex flex-column" width="74%" height="100%">
      <div class="chat-header bg-background">
        <div class="chat-title pa-3">
          {{ selectedAccount.name }}
          <v-spacer></v-spacer>
          <span class="icon material-symbols-outlined mr-4">tune</span>
          <v-btn density="compact" icon="mdi-plus" :disabled="!selectedAccount.id"></v-btn>
        </div>
        <div class="chat-summary d-flex flex-row">
          <div class="out bg-red-darken-2">
            <span class="material-symbols-outlined mr-2">thumb_down</span>
            {{ shared.maskReal(data.loss) }}
          </div>
          <div class="in bg-green-darken-2">
            {{ shared.maskReal(data.gain) }}
            <span class="material-symbols-outlined ml-2">thumb_up</span>
          </div>
        </div>
      </div>
      <div class="chat-body">
        <div class="chat-date">
          <v-chip variant="outlined">{{ month + ' ' + year }}</v-chip>
        </div>
        <div class="chat-message" v-for="item in transactions" 
        :class="{'gain': item.isGain, 'happened': transactionHappened(item.date)}">
          <div class="w-100 d-flex">
            <div class="message-title">{{ item.title }}</div>
            <v-spacer style="min-width: 24px;"></v-spacer>
            <div class="message-total">{{ shared.maskReal(item.total) }}</div>
          </div>
          <div class="message-description">{{ item.description }}</div>
        </div>
      </div>
      <div class="chat-footer bg-background">
        <div class="chat-summary d-flex flex-row">
          <div class="out">
            <span class="material-symbols-outlined mr-2">thumb_down</span>
            {{ shared.maskReal(data.loss) }}
          </div>
          <div class="in">
            {{ shared.maskReal(data.gain) }}
            <span class="material-symbols-outlined ml-2">thumb_up</span>
          </div>
        </div>
      </div>
    </v-card>
  </main>
</template>

<style lang="scss">
.chat-header {
  height: 10%;

  .chat-title {
    align-items: center;
    display: flex;
    font-size: xx-large;
    font-weight: 300;
    height: 50%;

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
      align-items: center;
      display: flex;
      font-size: x-large;
      font-weight: 300;
      padding: 12px;
      width: 50%;
    }

    .in {
      justify-content: end;
    }
  }
}

.chat-body {
  display: flex;
  flex-direction: column;
  height: inherit;
  
  .chat-date {
    display: flex;
    justify-content: center;
    padding: 12px;
  }
  
  .chat-message {
    align-items: center;
    background-color: rgb(var(--v-theme-background));
    border-radius: 12px;
    border: 2px solid rgb(var(--v-theme-loss));
    display:flex;
    flex-direction: column;
    font-weight: 300;
    margin: 0 35px;
    margin-bottom: 8px;
    max-width: 75%;
    padding: 15px;
    width: fit-content;
  
    &.gain {
      align-self: end;
      border-color: rgb(var(--v-theme-gain));

      &.happened {
        background-color: rgb(var(--v-theme-gain));
        border: none;
      }
    }

    &.happened {
      background-color: rgb(var(--v-theme-loss));
      border: none;
    }

    .message-description {
      width: 100%;
    }
  }
}

.chat-footer {
  height: 5%;

  .chat-summary {
    height: 100%;
    
    .in, .out {
      border: 2px solid rgb(var(--v-theme-loss));
      width: 50%;
      display: flex;
      align-items: center;
      padding: 12px;
      font-weight: 300;
      font-size: x-large;
    }

    .in {
      border-color: rgb(var(--v-theme-gain));
      justify-content: end;
    }
  }
}
</style>../stores/shared.store