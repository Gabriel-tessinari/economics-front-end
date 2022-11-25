import Category from "./Category";
import Subcategory from "./Subcategory";

class SubcategoryListRequest {
  categories: Category[];

  constructor() {
    this.categories = [];
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  hasCategories() {
    return this.categories.length > 0;
  }

  setSubcategories(subcategories: Subcategory[], categoryId: string) {
    const index = this.categories.findIndex(item => {
      return item._id == categoryId;
    });

    this.categories[index].subcategories = subcategories;
  }
}

export default SubcategoryListRequest;