import axios from 'axios';

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