import axios from 'axios'; 

const API_URL = 'https://28e4-2603-8001-e600-12e8-f9d2-c753-257f-55a5.ngrok-free.app/api/users/signup/';

export const register = (first_name: string, last_name: string, email: string, password: string, role: any) => {
  return axios.post(API_URL + 'signup', { first_name, last_name, email, password, role });
};

export const login = (email: string, password: string) => {
  return axios.post(API_URL + 'signin', { email, password })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};
