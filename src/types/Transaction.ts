import Account from './Account';
import Category from './Category';
import Subcategory from './Subcategory';

interface Transaction {
  _id?: string;
  description: string;
  value: number;
  date: string;
  type: string;
  accountId: string;
  categoryId: string;
  subcategoryId?: string;
  account?: Account;
  category?: Category;
  subcategory?: Subcategory;
}

export default Transaction;