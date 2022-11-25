import Category from "./Category";

class Subcategory {
  _id?: string;
  description: string;
  categoryId: string;
  category?: Category;

  constructor() {
    this.description = '';
    this.categoryId = '';
  }

  compare(subcategory: Subcategory) {
    if(this.description > subcategory.description) return 1;
    if(this.description < subcategory.description) return -1;
    return 0;
  }
}

export default Subcategory;