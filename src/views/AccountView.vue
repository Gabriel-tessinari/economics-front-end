<template>
  <TheToast :request="toastRequest"/>
  <div class="tile is-ancestor content-height">
    <div class="tile is-12">
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <AccountViewHeader @error="(error) => showToast(error)"
          @info="(request) => setTransactionRequest(request)"/>
        </article>
      </div>
    </div>
    <div class="tile is-12" v-if="transactionRequest.isValid()">
      <div class="tile is-parent">
        <article class="tile is-child notification is-cyan">
          <div class="has-space-between">
            <p class="title">Transações</p>
            <p>
              {{transactionRequest.month}}/{{transactionRequest.year}}
            </p>
          </div>
          <TransactionTable :request="transactionRequest"
          @error="(error) => showToast(error)"
          @update="(transactions) => updateTransactionRequest(transactions)"/>
        </article>
      </div>
    </div>
  </div>
  <!-- 
  <AccountViewTransactionModal :accounts="accounts" :showModal="showAddModal"
  @close="toggleAddModal()" @error="showToast('error', 'Algo de errado ocorreu. Tente novamente.')"/> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheToast from "@/components/TheToast.vue";
import AccountViewHeader from "@/components/AccountViewHeader.vue";
import TransactionTable from "@/components/TheTransactionTable.vue";
import ToastRequest from '@/types/ToastRequest';
import TransactionTableRequest from '@/types/TransactionTableRequest';
import Transaction from '@/types/Transaction';

export default defineComponent({
  name: 'AccountView',
  inheritAttrs: false,
  components: {
    TheToast,
    AccountViewHeader,
    TransactionTable
  },
  setup() {
    const showAddModal = ref(false);
    const toastRequest = ref<ToastRequest>(
      new ToastRequest()
    );
    const transactionRequest = ref<TransactionTableRequest>(
      new TransactionTableRequest()
    );

    //functions
    const showToast = (request: ToastRequest) => {
      request.config();
      request.toggleShow();
      toastRequest.value = request;
      setTimeout(() => toastRequest.value.toggleShow(), 5000);
    };

    const setTransactionRequest = (request: TransactionTableRequest) => {
      transactionRequest.value = request;
    };

    const updateTransactionRequest = (transactions: Transaction[]) => {
      transactionRequest.value.transactions = transactions;
    };

    const toggleAddModal = () => {
      showAddModal.value = !showAddModal.value;
    };

    return { setTransactionRequest, showToast, toastRequest, toggleAddModal, transactionRequest,
    updateTransactionRequest }
  }
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';

  .notification.is-cyan {
    background-color: $cyan;
    color: $black-bis;
  }

  .tile.content-height {
    flex-direction: column;
  }

  .has-space-between {
    display: flex;
    justify-content: space-between;
  }
</style>