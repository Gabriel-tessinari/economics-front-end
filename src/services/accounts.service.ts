import api from './base';

const route = '/account';

export default {
  getAccounts() {
    return api().get(route);
  }
}