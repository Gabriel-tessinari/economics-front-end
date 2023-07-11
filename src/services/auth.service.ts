import api from './_base';

const route = '/auth';

export default {
  async authenticateTokenByEmail() {
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    let url = route + '/email/' + email;
    let authorization = 'Bearer ' + token;

    if(!email || !token) {
      return false;
    }

    let response = await api().get(url, { headers: { Authorization: authorization } });
    
    return !!response.data;
  }
}