
import axios from 'axios';
import { create } from 'zustand'
export const AuthStore = create((set) => ({
  logged: false,
  user: {},
  setUser: (user)=> set(()=> ({user: user})),
  setLogged: (value) => set(() => ({ logged: value })),
  login: async (email, password) => {
    try {
        const response = await axios.post('https://squid-api-gdi4.onrender.com/user/login/', {email, password, role:'Admin'});
        return response;
    } catch (error) {
      console.log(error);
        return error;
  
    }
  } ,
  register: async (user) => {
    try {
      console.log(user);
        const response = await axios.post('https://squid-api-gdi4.onrender.com/user/admin', user);
        return response;
    } catch (error) {
      console.log(error);
        return error;
  
    }
  } 
}));
