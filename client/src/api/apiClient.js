import axios from 'axios';

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

axios.interceptors.response.use(
  res => res,
  (err) => {
    if (err.response.status === 401) {
      window.location.href = '/signin';
    }

    throw err;
  }
);

export default axios;