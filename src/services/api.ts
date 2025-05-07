import axios from 'axios';

const API_URL = 'http://localhost:8000/api/services/';

export const createService = async (formData: FormData) => {
  try {
    const res = await axios.post(`${API_URL}create/`, formData);
    return res.data;
  } catch (err) {
    console.error('Error creating service:', err);
  }
};

export const getServices = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error('Error fetching services:', err);
  }
};

export const getCategories = async () => {
  try {
    const res = await axios.get(`${API_URL}categories/`);
    return res.data;
  } catch (err) {
    console.error('Error fetching categories:', err);
  }
};

export const getServiceById = async (id: number) => {
  try {
    const res = await axios.get(`${API_URL}${id}`);
    return res.data;
  } catch (err) {
    console.error(`Error fetching service with ID ${id}:`, err);
  }
};

export const updateService = async (id: number, formData: FormData) => {
  try {
    const res = await axios.put(`${API_URL}${id}/update/`, formData);
    return res.data;
  } catch (err) {
    console.error(`Error updating service with ID ${id}:`, err);
  }
};
