import {configureStore} from '@reduxjs/toolkit';
import registerReducer from '../Redux/Slice/RegisterSlice';
import loginReducer from '../Redux/Slice/LoginSlice';
import  GetProducts  from './Slice/GetProductsSlice';
import  GetCategories  from './Slice/GetCategoriesSlice';
import GetProductByCategory from './Slice/GetProductByCategorySlice';


export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    getProducts: GetProducts,
    getCategories: GetCategories,
    getProductByCategory: GetProductByCategory,
   
  },
});
