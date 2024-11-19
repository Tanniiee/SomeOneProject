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

const App = () => {
  return (
    <NavigationContainer>
      <Musicplayer/>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({});
