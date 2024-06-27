import axios from 'axios';
import { create } from 'zustand'

export const DashboardStore = create((set) => ({
  products: [],
  getProducts: async (institution) => {
    try {
      console.log(institution);
        const response = await axios.get('https://squid-api-gdi4.onrender.com/dashboard', {params:{institution}});
        if (response.data.success) {

            set(() => ({ products: response.data.body.data }))
            return response.data.body.data;
        }
        return response;
    } catch (error) {
        console.log(error);
    }
  },
  getSpecificTraps: async(type)=> {
    try {
        const response = await axios.get('https://squid-api-gdi4.onrender.com/dashboard/traps', {params: {type}});
        if (response.data.success) {
            return response.data.body.data;
        }
        return response;
    } catch (error) {
        console.log(error);
    }
  }
}));
