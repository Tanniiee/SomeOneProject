import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import axios from 'axios';

const TextToSpeed = () => {
    const goiAPI = () =>{
axios
  .post(`https://api.fpt.ai/hmi/tts/v5`, 'Ngay mới dui dẻ', {
    headers: {
      'api-key': 'TFfGg9zHQP5hLTxSMJvGuo1kn7QIjGnP',
      voice: 'linhsan',
      speed: +1,
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
  return (
    <View>
      <TouchableOpacity onPress={goiAPI}>
        <Text>click để nghe</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TextToSpeed

const styles = StyleSheet.create({})