import axios from 'axios';

const BookInstance = (token = '', contentType = 'application/json') => {
  const axiosInstance = axios.create({
    baseURL: 'https://cro101-b166e76cc76a.herokuapp.com/',
  });

  axiosInstance.interceptors.request.use(
    async config => {
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': contentType,
      };
      return config;
    },
    error => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error),
  );

  return axiosInstance;
};

export default BookInstance;
