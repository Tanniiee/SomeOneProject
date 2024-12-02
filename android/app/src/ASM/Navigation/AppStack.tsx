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
import { NavigationContainer } from '@react-navigation/native';
import {Stack} from './Stack';

const AppStack = () => {
  return (
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
  );
};
export default AppStack;

