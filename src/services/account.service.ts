import Account from '../models/account';
import api from './_base';

const route = '/accounts';

const service = {
  async findAll() {
    try {
      let response: Account[] = (await api().get(route)).data;
      return response;
    } catch(error: any) {
      console.log("🚀 ~ findAll ~ error:", error);
      throw Error(error.message);
    }
  }
}

const mockService = {
  async findAll() {
    try {
      let response: Account[] = (await api().get(route)).data;
      return response;
    } catch(error: any) {
      console.log("🚀 ~ findAll ~ error:", error);
      throw Error(error.message);
    }
  }
}

export default import.meta.env.VITE_MOCK ? mockService : service;