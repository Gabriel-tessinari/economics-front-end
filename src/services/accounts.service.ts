import Account from '@/types/Account';
import api from './base';

const route = '/account';

export default {
  getAccounts() {
    return api().get(route);
  },

  saveAccount(account: Account) {
    return api().post(route, account);
  }
}