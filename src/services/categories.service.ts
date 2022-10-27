import Category from '@/types/Category';
import api from './base';

const route = '/category';

export default {
  getCategories() {
    return api().get(route);
  },

  saveCategory(category: Category) {
    return api().post(route, category);
  }
}