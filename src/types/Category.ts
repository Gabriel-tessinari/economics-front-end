import Subcategory from "./Subcategory";

class Category {
  _id?: string;
  description: string;
  subcategories: Subcategory[];

  constructor() {
    this.description = '';
    this.subcategories = [];
  }
}

export default Category;