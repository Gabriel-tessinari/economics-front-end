import Transaction from '@/types/Transaction';
import api from './base';

const route = '/transaction';

export default {
  getTransactions(account: string, month: string) {
    return api().get(route + '/account/' + account + '/month/' + month);
  },

  saveTransaction(transaction: Transaction) {
    return api().post(route, transaction);
  }
}