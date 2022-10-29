import Account from '@/types/Account';
import api from './base';

const route = '/account';

export default {
  deleteAccount(id: string) {
    const url = route + '/' + id;
    return api().delete(url);
  },

  getAccounts() {
    return api().get(route);
  },

  saveAccount(account: Account) {
    return api().post(route, account);
  }
}