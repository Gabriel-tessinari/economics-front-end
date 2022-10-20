import axios from 'axios';

export default(url=process.env.VUE_APP_SERVICE_URL) => {
  return axios.create({ baseURL: url });
}