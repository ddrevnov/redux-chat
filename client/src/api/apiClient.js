import axios from 'axios';

try {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
} catch (err) {
  console.warn(err);
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