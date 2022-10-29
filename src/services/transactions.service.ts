import Transaction from '@/types/Transaction';
import api from './base';

const route = '/transaction';

export default {
  deleteTransaction(id: string) {
    const url = route + '/' + id;
    return api().delete(url);
  },

  getTransactions(account: string, month: string, year: string) {
    const url = route + '/account/' + account + '/month/' + month + '/year/' + year;
    return api().get(url);
  },

  saveTransaction(transaction: Transaction) {
    return api().post(route, transaction);
  }
}