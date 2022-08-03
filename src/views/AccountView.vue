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
    <h1 class="title has-text-centered">
      <div class="columns">
        <div class="column is-one">
          {{title}}
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <button class="button is-success is-fullwidth"
          @click="toggleAddModal()">
            Adicionar Movimentação
          </button>
        </div>
        <div class="column is-half">
          <button class="button is-success is-fullwidth"
          :disabled="title == 'Tabela Vazia' || transactions.length == 0">
            Gerar Relatório
          </button>
        </div>
      </div>
    </h1>
    
    <TransactionTable :transactions="transactions"
    v-if="transactions.length > 0"/>
  </div>

  <AccountViewTransactionModal :accounts="accounts" :showModal="showAddModal"
  @close="toggleAddModal()"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AccountViewTransactionModal from "@/components/AccountViewTransactionModal.vue";
import TransactionTable from "@/components/TheTransactionTable.vue";
import transactionService from "@/services/transactions.service";
import accountService from "@/services/accounts.service";
import Account from "@/types/Account";

export default defineComponent({
  name: 'AccountView',
  components: {
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
    const showAddModal = ref(false);
    const title = ref('Tabela Vazia');
    const transactions = ref([]);

    //functions
    const clean = () => {
      month.value = '';
      account.value = {
        _id: '',
        description: '',
        total: 0
      };
    };

    const loadAccounts = async () => {
      await accountService.getAccounts()
      .then(response => {
        accounts.value = response.data;
      })
      .catch(err => {
        console.log(err);
      })
    };

    const loadTransactions = async () => {
      await transactionService.getTransactions(account.value._id, month.value)
      .then(response => {
        transactions.value = response.data;
        title.value = account.value.description + ' - ' + month.value + '/2022';
        clean();
      })
      .catch(err => {
        console.log(err);
      })
    };

    const toggleAddModal = () => {
      showAddModal.value = !showAddModal.value;
    };

    return { account, accounts, clean, loadAccounts, loadTransactions, month,
    showAddModal, title, toggleAddModal, transactions }
  },
  mounted() {
    this.loadAccounts();
  }
});
</script>

<style lang="scss">
  .columns {
    padding: 0 1rem;
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