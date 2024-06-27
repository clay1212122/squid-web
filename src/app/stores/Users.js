
import axios from 'axios';
import { create } from 'zustand'
export const UsersStore = create((set) => ({
  registerUser: async (user) => {
    try {
      console.log(user);
        const response = await axios.post('https://squid-api-gdi4.onrender.com/user/operator', user);
        return response;
    } catch (error) {
      console.log(error);
        return error;
  
    }
  },
  getUsers: async (institution) => {
    try {
        const response = await axios.get('https://squid-api-gdi4.onrender.com/users', {params: {institution}});
        return response.data.body.data;
    } catch (error) {
      console.log(error);
        return error;
  
    }
  } 
}));
