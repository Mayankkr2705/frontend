import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

const getToken = () => Cookies.get('token');

export const getTodos = async (userId) => {
  const token = getToken();
  if (!token) return [];

  try {
    const response = await axios.get(`${API_URL}/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        'filters[user][id][$eq]': userId,
        populate: '*'
      }
    });

    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

export const createTodo = async (title, userId) => {
  const token = getToken();
  if (!token) throw new Error('No token found');

  try {
    const response = await axios.post(`${API_URL}/todos`, {
      data: {
        title,
        isCompleted: false,
        user: userId,
      }
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating todo:', error.response?.data || error.message);
    throw error;
  }
};

export const updateTodo = async (id, currentIsCompleted) => {
  const token = getToken();

  try {
    console.log("Updating ID:", id);

    const response = await axios.put(
      `${API_URL}/todos/${id}`,
      {
        data: {
          isCompleted: !currentIsCompleted,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    return response.data.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  const token = getToken();
  if (!token) throw new Error('No token found');

  try {
    await axios.delete(`${API_URL}/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting todo:', error.response?.data || error.message);
    throw error;
  }
};
