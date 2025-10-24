import axios from 'axios';
const API_URL = 'http://localhost:8000';

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const addTask = (title) => axios.post(`${API_URL}/tasks`, null, { params: { title } });
export const updateTask = (id, title, completed) => axios.put(`${API_URL}/tasks/${id}`, null, { params: { title, completed } });
export const deleteTask = (id) => axios.delete(`${API_URL}/tasks/${id}`);
