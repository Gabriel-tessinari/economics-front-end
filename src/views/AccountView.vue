<template>
  <TheToast :request="toastRequest"/>
  <div class="tile is-ancestor content-height">
    <div class="tile is-12">
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <AccountViewHeader @error="(error) => toastRequest.appear(error)"
          @info="(request) => transactionRequest.setThis(request)"/>
        </article>
      </div>
    </div>
    <div class="tile is-12" v-if="transactionRequest.isValid()">
      <div class="tile is-parent">
        <article class="tile is-child notification is-cyan">
          <div class="has-space-between">
            <p class="title">Transações</p>
            <p>
              {{transactionRequest.account.description}} - {{transactionRequest.month}}/{{transactionRequest.year}}
            </p>
          </div>
          <TransactionTable :request="transactionRequest"
          @error="(error) => toastRequest.appear(error)"
          @update="(transactions) => transactionRequest.setTransactions(transactions)"/>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheToast from "@/components/TheToast.vue";
import AccountViewHeader from "@/components/AccountViewHeader.vue";
import TransactionTable from "@/components/TheTransactionTable.vue";
import ToastRequest from '@/types/ToastRequest';
import TransactionTableRequest from '@/types/TransactionTableRequest';

export default defineComponent({
  name: 'AccountView',
  inheritAttrs: false,
  components: {
    TheToast,
    AccountViewHeader,
    TransactionTable
  },
  setup() {
    const toastRequest = ref<ToastRequest>(
      new ToastRequest()
    );
    const transactionRequest = ref<TransactionTableRequest>(
      new TransactionTableRequest()
    );

    return { toastRequest, transactionRequest }
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