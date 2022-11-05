import Subcategory from '@/types/Subcategory';
import api from './base';

const route = '/subcategory';

export default {
  deleteSubcategory(id: string) {
    const url = route + '/' + id;
    return api().delete(url);
  },

  getSubcategories() {
    return api().get(route);
  },

  saveSubcategory(subcategory: Subcategory) {
    return api().post(route, subcategory);
  }
}