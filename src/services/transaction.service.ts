import Transaction from '../models/transaction';
import api from './_base';

const route = '/transactions';

const service = {
  async findByAccountIdAndInCurrentMonth() {
    try {
      let response: Transaction[] = (await api().get(route)).data;
      return response;
    } catch(error: any) {
      console.log("🚀 ~ findByAccountIdAndInCurrentMonth ~ error:", error);
      throw Error(error.message);
    }
  }
}

const mockService = {
  async findByAccountIdAndInCurrentMonth(accountId: number, month: number) {
    let url = route + '?accountId=' + accountId;
    
    try {
      let response: Transaction[] = (await api().get(url)).data;
      return response;
    } catch(error: any) {
      console.log("🚀 ~ findByAccountIdAndInCurrentMonth ~ error:", error);
      throw Error(error.message);
    }
  }
}

export default import.meta.env.VITE_MOCK ? mockService : service;