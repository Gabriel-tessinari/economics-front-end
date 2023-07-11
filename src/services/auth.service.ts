import api from './_base';

const route = '/auth';

export default import.meta.env.VITE_MODE !== 'mock' ? {
  async authenticateTokenByEmail() {
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    let url = route + '/email/' + email;
    let authorization = 'Bearer ' + token;

    if(!email || !token) return false;

    let response = await api().get(url, { headers: { Authorization: authorization } });
    
    return !!response.data;
  }
} : {
  async authenticateTokenByEmail() {
    let email = localStorage.getItem('email');
    let url = '/users?email=' + email;

    if(!email) return false;

    let response: any = await api().get(url);

    return response.data[0]?.email == email;
  }
}