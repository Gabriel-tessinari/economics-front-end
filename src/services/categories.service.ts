import Category from '@/types/Category';
import api from './base';

const route = '/category';

export default {
  deleteCategory(id: string) {
    const url = route + '/' + id;
    return api().delete(url);
  },

  getCategories() {
    return api().get(route);
  },

  saveCategory(category: Category) {
    return api().post(route, category);
  }
}