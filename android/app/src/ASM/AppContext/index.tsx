// import React, {useContext, useState, createContext} from 'react';

// const AppContext = createContext(); // tạo ra 1 context

// const index = props => {
//   const {children} = props;
//   const [user, setUser] = useState(null);
//   const [cart, setCart] = useState([]);
//   return (
//     <AppContext.Provider value={{user, setUser, cart, setCart}}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export {index, AppContext};
// AppContext.js
// import React, { createContext, useState } from 'react';

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   // Sử dụng `user` là `null` làm mặc định để giả lập trạng thái chưa đăng nhập
//   const [user, setUser] = useState(null); // null = chưa đăng nhập

//   return (
//     <AppContext.Provider value={{ user, setUser }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

