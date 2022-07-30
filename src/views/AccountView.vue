<template>
  <div class="columns">
    <div class="column is-one-third">
      <label class="label">Conta</label>
      <div class="select is-success is-fullwidth">
        <select v-model="account">
          <option v-for="element in accounts" :key="element._id" :value="element">
            {{element.description}}
          </option>
        </select>
      </div>
    </div>
    <div class="column is-one-third">
      <label class="label">Mês</label>
      <div class="select is-success is-fullwidth">
        <select v-model="month">
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
      </div>
    </div>
    <div class="column is-one-third">
      <label class="label is-invisible">*</label>
      <button class="button is-success is-fullwidth"
      :disabled="account._id == '' || month == ''"
      @click="loadTransactions()">
        Carregar
      </button>
    </div>
  </div>
  
  <div class="container">
    <h1 class="title has-text-centered">{{title}}</h1>
    <TransactionTable :transactions="transactions"
    v-if="transactions.length > 0"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TransactionTable from "@/components/AccountViewTransactionTable.vue";
import transactionService from "@/services/transactions.service";
import accountService from "@/services/accounts.service";

export default defineComponent({
  name: 'AccountView',
  components: {
    TransactionTable
  },
  data() {
    return {
      accounts: [],
      transactions: [],
      account: {
        _id: '',
        description: '',
        total: 0
      },
      month: '',
      title: 'Tabela Vazia'
    }
  },
  mounted() {
    this.loadAccounts()
  },
  methods: {
    clean() {
      this.month = '';
      this.account = {
        _id: '',
        description: '',
        total: 0
      };
    },

    async loadAccounts() {
      await accountService.getAccounts()
      .then(response => {
        this.accounts = response.data;
      })
      .catch(err => {
        console.log(err);
      })
    },

    async loadTransactions() {
      await transactionService.getTransactions(this.account._id, this.month)
      .then(response => {
        this.transactions = response.data;
        this.title = this.account.description + ' - ' + this.month + '/2022';
        this.clean();
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
});
</script>

<style>
  .columns {
    padding: 1rem;
  }

  .is-invisible {
    color: transparent;
  }

  .title {
    border: 1px solid black;
    font-size: 1.5rem;
    font-weight: 900;
    padding: 1rem;
  }
</style>