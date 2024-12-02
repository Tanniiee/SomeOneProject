// Stack.js
import React from 'react';
import LogIn from '../StackScreen/LogIn';
import SignUp from '../StackScreen/SignUp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from './Tab';
import Plants from '../StackScreen/Plants';
import Detail from '../StackScreen/Detail';
import Cart from '../StackScreen/Cart';
import Payment from '../StackScreen/Payment';
import EditProfile from '../StackScreen/EditProfile';
import QA from '../StackScreen/QA';
import History from '../StackScreen/History';


const GuestStack = createNativeStackNavigator();


const Stack = () => {
  return (
    <GuestStack.Navigator screenOptions={{headerShown: false}}>
      <GuestStack.Screen name="LogIn" component={LogIn} />
      <GuestStack.Screen name="SignUp" component={SignUp} />
      <GuestStack.Screen name="Plants" component={Plants} />
      <GuestStack.Screen name="Home" component={Tab} />
      <GuestStack.Screen name="Detail" component={Detail} />
      <GuestStack.Screen name="Cart" component={Cart} />
      <GuestStack.Screen name="Payment" component={Payment} />
      <GuestStack.Screen name="EditProfile" component={EditProfile} />
      <GuestStack.Screen name="QA" component={QA} />
      <GuestStack.Screen name="History" component={History} />
    </GuestStack.Navigator>
  );
};



// export {Stack};
// import React, {useState} from 'react';
// import LogIn from '../StackScreen/LogIn';
// import SignUp from '../StackScreen/SignUp';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Tab from './Tab';
// import Plants from '../StackScreen/Plants';
// import Detail from '../StackScreen/Detail';
// import Cart from '../StackScreen/Cart';
// import Payment from '../StackScreen/Payment';
// import EditProfile from '../StackScreen/EditProfile';
// import QA from '../StackScreen/QA';
// import History from '../StackScreen/History';

// const GuestStack = createNativeStackNavigator();
// const AuthenticatedStack = createNativeStackNavigator();

// const Stack = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <GuestStack.Navigator screenOptions={{headerShown: false}}>
//       {!isLoggedIn ? (
//         <>
//           <GuestStack.Screen name="LogIn">
//             {props => <LogIn {...props} setIsLoggedIn={setIsLoggedIn} />}
//           </GuestStack.Screen>
//           <GuestStack.Screen name="SignUp" component={SignUp} />
//         </>
//       ) : (
//         <AuthenticatedStack.Navigator screenOptions={{headerShown: false}}>
//           <AuthenticatedStack.Screen name="Home" component={Tab} />
//           <AuthenticatedStack.Screen name="Plants" component={Plants} />
//           <AuthenticatedStack.Screen name="Detail" component={Detail} />
//           <AuthenticatedStack.Screen name="Cart" component={Cart} />
//           <AuthenticatedStack.Screen name="Payment" component={Payment} />
//           <AuthenticatedStack.Screen
//             name="EditProfile"
//             component={EditProfile}
//           />
//           <AuthenticatedStack.Screen name="QA" component={QA} />
//           <AuthenticatedStack.Screen name="History" component={History} />
//         </AuthenticatedStack.Navigator>
//       )}
//     </GuestStack.Navigator>
//   );
// };

 export {Stack};
