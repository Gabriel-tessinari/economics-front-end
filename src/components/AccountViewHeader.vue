<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <label class="label">Conta</label>
      <div class="select is-danger is-fullwidth">
        <select v-model="account">
          <option v-for="element in accounts" :key="element._id" :value="element">
            {{element.description}}
          </option>
        </select>
      </div>
    </div>
    <div class="column is-one-quarter">
      <label class="label">Mês</label>
      <div class="select is-danger is-fullwidth">
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
    <div class="column is-one-quarter">
      <label class="label">Ano</label>
      <input class="input is-danger" type="text" v-model="year" placeholder="Ex.: 2022">
    </div>
    <div class="column is-one-quarter">
      <label class="label is-invisible">*</label>
      <button class="button is-danger is-fullwidth"
      :disabled="loading || account._id == '' || month == '' || year == ''"
      @click="loadTransactions()">
        Carregar
      </button>
    </div>
    <div class="column is-full" v-if="loading">
      <progress class="progress is-warning" max="100"></progress>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import accountService from "@/services/accounts.service";
import transactionService from "@/services/transactions.service";
import Account from "@/types/Account";
import Transaction from '@/types/Transaction';
import ToastRequest from '@/types/ToastRequest';

export default defineComponent({
  name: 'AccountViewHeader',
  emits: ['error'],
  setup(props, { emit }) {
    const loading = ref(false);
    const accounts = ref<Account[]>([]);
    const transactions = ref<Transaction[]>([]);
    const month = ref('');
    const year = ref('');
    const account = ref<Account>(new Account());

    //functions
    const clean = () => {
      month.value = '';
      year.value = '';
      account.value = new Account();
    };

    const loadAccounts = async () => {
      toggleLoading();
      await accountService.getAccounts()
      .then(response => {
        accounts.value = response.data;
        toggleLoading();
      })
      .catch(err => {
        console.log(err);
        emit('error', new ToastRequest(err.response.status, err.response.data));
        toggleLoading();
      })
    };

    const loadTransactions = async () => {
      if(account.value._id) {
        toggleLoading();
        await transactionService.getTransactions(account.value._id, month.value, year.value)
        .then(response => {
          transactions.value = response.data;
          clean();
          toggleLoading();
        })
        .catch(err => {
          console.log(err);
          emit('error', new ToastRequest(err.response.status, err.response.data));
          toggleLoading();
        })
      }
    };

    const toggleLoading = () => {
      loading.value = !loading.value;
    };

    return { account, accounts, loadAccounts, loading, loadTransactions, month, year }
  },
  mounted() {
    this.loadAccounts();
  }
});
</script>

<style lang="scss">
  .columns {
    flex-wrap: wrap;
  }
</style>