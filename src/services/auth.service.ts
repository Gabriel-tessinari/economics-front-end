import api from './_base';

const route = '/auth';

const service = {
  async authenticateTokenByEmail() {
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    let url = route + '/email/' + email;
    let authorization = 'Bearer ' + token;

    if(!email || !token) return false;

    let response = await api().get(url, { headers: { Authorization: authorization } });
    
    return !!response.data;
  }
}

const mockService = {
  async authenticateTokenByEmail() {
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    let url = '/users?email=' + email;

    if(!email || !token) return false;

    let response: any = await api().get(url);

    return (response.data[0]?.email == email && response.data[0]?.name == token);
  }
}

export default import.meta.env.VITE_MOCK ? mockService : service;