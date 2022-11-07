import Account from "./Account";
import Transaction from "./Transaction";

class TransactionTableRequest {
  account: Account;
  month: string;
  year: number;
  transactions: Transaction[];

  constructor() {
    this.account = new Account();
    this.month = '';
    this.year = 0;
    this.transactions = [];
  }

  setThis(request: TransactionTableRequest) {
    this.account = request.account;
    this.month = request.month;
    this.year = request.year;
    this.transactions = request.transactions;
  }

  setTransactions(transactions: Transaction[]) {
    this.transactions = transactions;
  }

  isValid(): boolean {
    return (this.account._id != '' && this.month != '' && this.year != 0);
  }
}

export default TransactionTableRequest;