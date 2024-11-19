import AxiosInstance from './BookInstance';

// đăng ký tài khoản
const register = async data => {
  try {
    const response = await AxiosInstance().post(
      'https://vieclam.shop/register.php',
      data,
    );
    return response.status === true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// đăng nhập tài khoản
const login = async data => {
  try {
    const response = await AxiosInstance().post(
      'https://vieclam.shop/login.php',
      data,
    );
    return response.status === true ? response.user : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getCate = async () => {
  try {
    const response = await AxiosInstance().get(
      'https://vieclam.shop/list-category.php',
    );
   return response
  } catch (error) {
    console.log(error);
    return [];
  }
};


const getProductByIdCate = async id => {
  try {
    const response = await AxiosInstance().get(
      `https://vieclam.shop/list-product-by-cate.php?id=${id}`,
    );
    if (response.data && response.data.status === true) {
      return response.data.products || [];
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return false;
  }
};


export {register, login,getCate,getProductByIdCate};
