import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import axios from 'axios';

const SendOtpScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('0925103825');
  const [otpCode, setOtpCode] = useState('');

  const sendSms = async (phoneNumber, otpCode) => {
    const API_URL =
      'https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/';
    const API_KEY = '0C763999E32C2C46C4ABB3DE8D5761';
    const SECRET_KEY = '494A329C2CA563DBA91D1EB48E8441'; 
    const BRAND_NAME = 'Baotrixemay';

    const smsData = {
      ApiKey: API_KEY,
      Content: `${otpCode} là mã xác minh đăng ký Baotrixemay của bạn`,
      Phone: phoneNumber,
      SecretKey: SECRET_KEY,
      Brandname: BRAND_NAME,
      SmsType: '2',
    };

    try {
      const response = await axios.post(API_URL, smsData, {
        headers: {'Content-Type': 'application/json'},
      });
      console.log('Kết quả gửi SMS:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Lỗi khi gửi SMS:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  };

  const generateOtp = () => {
    // Tạo mã OTP ngẫu nhiên (4 chữ số)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtpCode(otp);
    return otp;
  };

  const handleSendSms = async () => {
    if (!phoneNumber) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại.');
      return;
    }

    const otp = generateOtp();
    try {
      const result = await sendSms(phoneNumber, otp);
      if (result.CodeResult === '100') {
        Alert.alert('Thành công', 'Mã OTP đã được gửi.');
      } else {
        Alert.alert('Thất bại', `Lỗi gửi SMS: ${result.ErrorMessage}`);
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Gửi SMS thất bại, vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập số điện thoại:</Text>
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Gửi OTP" onPress={handleSendSms} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  otp: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default SendOtpScreen;
