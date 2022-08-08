import Category from "./Category";

interface Subcategory {
  _id: string;
  description: string;
  categoryId: string;
  category?: Category;
}

export default Subcategory;