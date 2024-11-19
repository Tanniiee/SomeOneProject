// Stack.js
import React from 'react';
import LogIn from '../StackScreen/LogIn';
import SignUp from '../StackScreen/SignUp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Tab from './Tab';
import Plants from '../StackScreen/Plants';
import Detail from '../StackScreen/Detail';


const GuestStack = createNativeStackNavigator();


const Stack = () => {
  return (
    <GuestStack.Navigator screenOptions={{headerShown: false}}>
      <GuestStack.Screen name="LogIn" component={LogIn} />
      <GuestStack.Screen name="SignUp" component={SignUp} />
      <GuestStack.Screen name="Plants" component={Plants} />
      <GuestStack.Screen name="Home" component={Tab} />
      <GuestStack.Screen name="Detail" component={Detail} />

    </GuestStack.Navigator>
  );
};


export {Stack};
