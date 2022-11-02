import Account from "./Account";

class AccountViewTransactionModalRequest {
  account: Account;
  month: string;
  year: number;

  constructor() {
    this.account = new Account();
    this.month = '';
    this.year = 0;
  }
}

export default AccountViewTransactionModalRequest;