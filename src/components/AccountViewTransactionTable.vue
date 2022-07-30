<template>
  <table class="table is-fullwidth is-hoverable">
    <thead>
      <tr>
        <th>Data</th>
        <th>Descrição</th>
        <th>Categoria</th>
        <th>Valor</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactions" :key="transaction._id"
      :class="isCredit(transaction) ? 'credit' : 'debit'">
        <td>{{transaction.date}}</td>
        <td>{{transaction.description}}</td>
        <td>{{transaction.category.description}}</td>
        <td>{{valueFormat(transaction.value)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TransactionTable',
  props: {
    transactions: Array
  },
  methods: {
    isCredit(transaction: any): boolean {
      console.log(transaction)
      return transaction.type == 'CREDIT';
    },
    valueFormat: (value: string) => {
      return 'R$' + parseFloat(value).toFixed(2);
    }
  }
});
</script>

<style lang="scss">
  .credit {
    color: #48C78E;
  }
  .debit {
    color: #F14668;
  }
</style>