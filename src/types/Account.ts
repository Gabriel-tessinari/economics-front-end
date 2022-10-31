class Account {
  _id?: string;
  description: string;
  total: number;

  constructor() {
    this._id = '';
    this.description = '';
    this.total = 0;
  }
}

export default Account;