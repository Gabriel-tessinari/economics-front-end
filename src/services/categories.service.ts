import api from './base';

const route = '/category';

export default {
  getCategories() {
    return api().get(route);
  }
}