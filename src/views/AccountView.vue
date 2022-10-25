<template>
  <TheToast :show="toastShow" :severity="toastSeverity" :message="toastMessage"/>
  <div class="columns">
    <div class="column is-one-quarter">
      <label class="label">Conta</label>
      <div class="select is-primary is-fullwidth">
        <select v-model="account">
          <option v-for="element in accounts" :key="element._id" :value="element">
            {{element.description}}
          </option>
        </select>
      </div>
    </div>
    <div class="column is-one-quarter">
      <label class="label">Mês</label>
      <div class="select is-primary is-fullwidth">
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
      <input class="input is-primary" type="text" v-model="year" placeholder="Ex.: 2022">
    </div>
    <div class="column is-one-quarter">
      <label class="label is-invisible">*</label>
      <button class="button is-primary is-fullwidth"
      :disabled="account._id == '' || month == '' || year == ''"
      @click="loadTransactions()">
        Carregar
      </button>
    </div>
  </div>
  
  <div class="container">
    <h1 class="title has-text-centered">
      <div class="columns">
        <div class="column is-one">
          {{title}}
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <button class="button is-primary is-fullwidth"
          :disabled="accounts.length == 0"
          @click="toggleAddModal()">
            Adicionar Transação
          </button>
        </div>
        <div class="column is-half">
          <button class="button is-primary is-fullwidth"
          :disabled="title == 'Tabela Vazia' || transactions.length == 0"
          @click="generateReport()">
            Gerar Relatório
          </button>
        </div>
      </div>
    </h1>
    
    <TransactionTable :transactions="transactions"
    v-if="transactions.length > 0"/>
  </div>

  <AccountViewTransactionModal :accounts="accounts" :showModal="showAddModal"
  @close="toggleAddModal()" @error="showToast('error', 'Algo de errado ocorreu. Tente novamente.')"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheToast from "@/components/TheToast.vue";
import AccountViewTransactionModal from "@/components/AccountViewTransactionModal.vue";
import TransactionTable from "@/components/TheTransactionTable.vue";
import transactionService from "@/services/transactions.service";
import accountService from "@/services/accounts.service";
import Account from "@/types/Account";

export default defineComponent({
  name: 'AccountView',
  components: {
    TheToast,
    TransactionTable,
    AccountViewTransactionModal
  },
  setup() {
    const account = ref<Account>({
      _id: '',
      description: '',
      total: 0
    });
    const accounts = ref<Account[]>([]);
    const month = ref('');
    const year = ref('');
    const showAddModal = ref(false);
    const title = ref('Tabela Vazia');
    const transactions = ref([]);
    const toastMessage = ref('');
    const toastSeverity = ref('');
    const toastShow = ref(false);

    //functions
    const clean = () => {
      month.value = '';
      year.value = '';
      account.value = {
        _id: '',
        description: '',
        total: 0
      };
    };

    const showToast = (severity: string, message: string) => {
      toastMessage.value = message;
      toastSeverity.value = severity;
      toastShow.value = true;
      setTimeout(() => toastShow.value = false, 5000);
    }

    const loadAccounts = async () => {
      await accountService.getAccounts()
      .then(response => {
        accounts.value = response.data;
      })
      .catch(err => {
        console.log(err);
        showToast('error', 'Algo de errado ocorreu. Tente novamente.');
      })
    };

    const loadTransactions = async () => {
      await transactionService.getTransactions(account.value._id, month.value, year.value)
      .then(response => {
        transactions.value = response.data;
        title.value = account.value.description + ' - ' + month.value + '/' + year.value;
        clean();
      })
      .catch(err => {
        console.log(err);
        showToast('error', 'Algo de errado ocorreu. Tente novamente.');
      })
    };

    const toggleAddModal = () => {
      showAddModal.value = !showAddModal.value;
    };

    const generateReport = () => {
      alert('Gera relatório.');
    }

    return { account, accounts, clean, generateReport, loadAccounts, loadTransactions, month,
    showAddModal, showToast, title, toastMessage, toastSeverity, toastShow, toggleAddModal, 
    transactions, year }
  },
  mounted() {
    this.loadAccounts();
  }
});
</script>

<style lang="scss">
  
</style>