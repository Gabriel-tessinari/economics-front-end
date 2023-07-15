import Login from '../models/login';
import { loginStore } from '../stores/login.store';
import api from './_base';

const route = '/login';

const service = {
  async login(data: Login) {
    let token: string = (await api().post(route, data)).data;
    
    if(token) {
      loginStore.value.setEmail(data.email);
      loginStore.value.setToken(token);
    } else {
      throw Error('Email ou senha incorreto.');
    }
  }
}

const mockService = {
  async login(data: Login) {
    let url = '/users?email=' + data.email;
    let user = (await api().get(url)).data[0];
    
    if(user) {
      loginStore.value.setEmail(data.email);
      loginStore.value.setToken(user.name);
    } else {
      throw Error('Email ou senha incorreto.');
    }
  }
}

export default import.meta.env.VITE_MOCK ? mockService : service;