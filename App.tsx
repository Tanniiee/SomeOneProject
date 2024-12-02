import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import DangKy from './android/app/src/Screen/DangKy';
import Home from './android/app/src/Screen/Home';
import Detail from './android/app/src/Screen/Detail';
import {StackNavigation} from './android/app/src/Navigation/StackNavigation';
import {NavigationContainer} from '@react-navigation/native';
import LogIn from './android/app/src/ASM/StackScreen/LogIn';
import SignUp from './android/app/src/ASM/StackScreen/SignUp';
import {Stack} from './android/app/src/ASM/Navigation/Stack';
import Tab from './android/app/src/ASM/Navigation/Tab';
import TextToSpeed from './android/app/src/Screen/TextToSpeed';
import Camera from './android/app/src/Screen/Camera';
import SpeechToText from './android/app/src/Screen/SpeechToText';
import MiniGamePikachu from './android/app/src/Screen/MiniGamePikachu';
import PayOS from './android/app/src/Screen/PayOs';
import Musicplayer from './android/app/src/Screen/MusicPlayer';
import GameMath from './android/app/src/Screen/GameMath';
import {Provider} from 'react-redux';
import {store} from './android/app/src/ASM/Redux/Store';
import Sms from './android/app/src/Screen/Sms';
import EditProfile from './android/app/src/ASM/StackScreen/EditProfile';
import AppStack from './android/app/src/ASM/Navigation/AppStack';

const App = () => {
  return (
    <Provider store={store}>
      <AppStack/>
    </Provider>
  );
};
export default App;

const styles = StyleSheet.create({});
