import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

export const signUp = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/auth/local/register`, {
    username,
    email,
    password,
  });
  return response.data;
};

export const signIn = async (identifier, password) => {
  const response = await axios.post(`${API_URL}/auth/local`, {
    identifier,
    password,
  });
  return response.data;
};

export const getUserMe = async (token) => {
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
