import axios from "axios";

const api = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const fetchUsersById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  export const fetchUserProfile = async () => {

    const token = localStorage.getItem('token');
    if(!token) throw new Error('Token not found');

    const response = await api.get('/users/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  export const fetchUsers = async (search, sortBy, sortOrder) => {
    const token = localStorage.getItem('token')
    const response = await api.get(`/users?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }

  export const registration = async (userData) => {
      try {
          const response = await api.post('/users/registration', userData);
          return response.data;
      } catch (error) {
          console.error("Error in registration:", error.response?.data || error.message);
          throw error;
      }
  };

  export const login = async (data) => {
    const response = await api.post('/users/login', data)
    return response.data
  }

  export const fetchUpdateUser = async (id, data) => {
    const response = await api.put(`/users/update/${id}`, data);
    return response.data;
  }


  export const fetchRoles = async () => {
      try {
        const response = await api.get('/roles');
        return response.data;
      } catch (error) {
        console.error('Failed to fetch roles:', error.response?.data || error.message);
        throw error;
      }
    };

  export const fetchPosts = async (search, sortBy, sortOrder) => {
    const response = await api.get(`/posts?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
    return response.data;
  }

  export const fetchPostsById = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  }

  export const fetchCreatePosts = async (data) => {
      const response = await api.post('/posts', data)
      return response.data;
  }
