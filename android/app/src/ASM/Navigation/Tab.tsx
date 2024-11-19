import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../TabScreen/Home';
import Notifications from '../TabScreen/Notifications';
import Search from '../TabScreen/Search';
import User from '../TabScreen/User';

import Icon from 'react-native-vector-icons/FontAwesome';

const TabBar = createBottomTabNavigator();

const Tab = () => {
  return (
    <TabBar.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Search') {
            iconName = focused ? 'heart' : 'heart-o';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'bell' : 'bell-o';
          } else if (route.name === 'User') {
            iconName = focused ? 'user' : 'user-o';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007537',
        tabBarInactiveTintColor: 'gray',
      })}>
      <TabBar.Screen name="Home" component={Home} />
      <TabBar.Screen name="Notifications" component={Notifications} />
      <TabBar.Screen name="Search" component={Search} />
      <TabBar.Screen name="User" component={User} />
    </TabBar.Navigator>
  );
};

export default Tab;
