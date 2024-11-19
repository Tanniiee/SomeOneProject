import React from 'react'
import DangKy from '../Screen/DangKy'
import Detail from '../Screen/Detail'
import Home from '../Screen/Home'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Camera from '../Screen/Camera'


const GuestStack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <GuestStack.Navigator screenOptions={{headerShown: false}}>
      <GuestStack.Screen name="DangKy" component={DangKy} />
      <GuestStack.Screen name="Home" component={Home} />
      <GuestStack.Screen name="Detail" component={Detail} />
      <GuestStack.Screen name="Camera" component={Camera} />
  
    </GuestStack.Navigator>
  );
}

export { StackNavigation }