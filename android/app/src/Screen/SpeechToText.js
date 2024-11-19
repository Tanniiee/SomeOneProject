import React, {useState} from 'react';
import {Button, Text, View, StyleSheet, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const apiKey = 'TFfGg9zHQP5hLTxSMJvGuo1kn7QIjGnP';

const SpeechToText = () => {
  const [transcription, setTranscription] = useState('');

  // Hàm chọn file âm thanh từ thư viện của thiết bị
  const pickAudioFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      if (response) {
        sendToFPTAI(response[0]); 
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert.alert('Đã hủy chọn tệp');
      } else {
        Alert.alert('Lỗi', 'Không thể chọn tệp âm thanh');
        console.log(error)
      }
    }
  };

  // Hàm gửi file âm thanh tới API của FPT AI
  const sendToFPTAI = async file => {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });

    try {
      const response = await axios.post(
        `https://api.fpt.ai/hmi/asr/general`,
        formData,
        {
          headers: {
            'api-key': apiKey,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setTranscription(
        response.data.hypotheses[0].utterance || 'Không thể nhận dạng được',
      );
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể gửi file tới API');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Chọn Tệp Âm Thanh" onPress={pickAudioFile} />
      <Text style={styles.text}>Kết quả: {transcription || '...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SpeechToText;
