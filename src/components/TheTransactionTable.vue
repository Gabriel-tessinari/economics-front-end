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
      :class="isCredit(transaction) ? 'is-green-color' : 'is-red-color'">
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
import Transaction from '@/types/Transaction';

export default defineComponent({
  name: 'TransactionTable',
  props: {
    transactions: {
      required: true,
      type: Array
    }
  },
  setup() {
    //functions
    const isCredit = (transaction: Transaction): boolean => {
      return transaction.type == 'CREDIT';
    }

    const valueFormat = (value: string) => {
      return 'R$' + parseFloat(value).toFixed(2);
    }

    return { isCredit, valueFormat }
  }
});
</script>

<style lang="scss">

</style>