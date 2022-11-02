<template>
  <div class="columns">
    <div class="column is-half">
      <button class="button is-primary is-fullwidth"
      @click="toggleAddModal()">
        Adicionar Transação
      </button>
    </div>
    <div class="column is-half">
      <button class="button is-primary is-fullwidth"
      :disabled="request.transactions.length == 0"
      @click="generateReport()">
        Gerar Relatório
      </button>
    </div>
    <div class="column is-full" v-if="loading">
      <progress class="progress is-warning" max="100"></progress>
    </div>
    <div class="column is-full" v-if="request.transactions.length == 0">
      <article class="message is-primary">
        <div class="message-body">
          Não há transações cadastradas no período informado.
        </div>
      </article>
    </div>
  </div>
  <div class="columns">
    <div class="column is-full">
      <div class="table-row" v-for="transaction in request.transactions" :key="transaction._id"
      :class="isCredit(transaction) ? 'credit' : 'debit'">
        <div class="columns">
          <div class="column is-2">
            {{transaction.date}}
          </div>
          <div class="column is-4">
            {{transaction.description}}
          </div>
          <div class="column is-3">
            {{categoryFormat(transaction)}}
          </div>
          <div class="column is-2">
            {{valueFormat(transaction.value)}}
          </div>
          <div class="column is-1 align-end">
            <span class="icon material-symbols-rounded"
            @click="deleteTransaction(transaction)">delete</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import TransactionTableRequest from '@/types/TransactionTableRequest';
import Transaction from '@/types/Transaction';
import transactionsService from '@/services/transactions.service';
import ToastRequest from '@/types/ToastRequest';

export default defineComponent({
  name: 'TransactionTable',
  emits: ['error', 'update'],
  props: {
    request: {
      required: true,
      type: Object as PropType<TransactionTableRequest>
    }
  },
  setup(props, { emit }) {
    const loading = ref(false);
    
    //functions
    const isCredit = (transaction: Transaction): boolean => {
      return transaction.type == 'CREDIT';
    };

    const categoryFormat = (transaction: Transaction) => {
      let response = transaction.category?.description;

      if(transaction.subcategory) {
        response += '/' + transaction.subcategory.description;
      }

      return response;
    };

    const valueFormat = (value: string) => {
      return 'R$' + parseFloat(value).toFixed(2).replace('.', ',');
    };

    const generateReport = () => {
      alert('Gera relatório.');
    }

    const deleteTransaction = async (transaction: Transaction) => {
      if(transaction._id) {
        toggleLoading();
        await transactionsService.deleteTransaction(transaction._id)
        .then(() => {
          emit('update', deleteFromList(transaction));
          toggleLoading();
        })
        .catch(err => {
          console.log(err);
          emit('error', new ToastRequest(err.response.status, err.response.data));
          toggleLoading();
        })
      }
    };

    const deleteFromList = (transaction: Transaction) => {
      const response: Transaction[] = props.request.transactions.filter(item => {
        return item._id != transaction._id;
      });

      return response;
    };

    const toggleLoading = () => {
      loading.value = !loading.value;
    };

    return { categoryFormat, deleteTransaction, generateReport, isCredit, loading, 
    valueFormat }
  }
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';

  .table-row {
    border: 1px solid $white;
    border-radius: .25rem;
    color: currentColor;
    display: inline-table;
    font-weight: 700;
    height: 1rem;
    margin-bottom: .5rem;
    padding: .5rem 1rem;
    width: 100%;

    &.credit {
      background-color: $green;
    }

    &.debit {
      background-color: $red;
    }

    >.columns {
      padding: 0;

      .column.align-end {
        text-align: end;
      }
    }

    span {
      cursor: pointer;
    }
  }
</style>