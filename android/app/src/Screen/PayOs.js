import {View, Text, ScrollView, Alert, Button} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import WebView from 'react-native-webview';
import {hmacSHA256} from 'react-native-hmac';

const PayOs = () => {
  const clientID = '5199b196-73a8-4cb3-900c-613e7375d67b';
  const apiKey = '0b1a9fd0-da83-45b4-96a0-bc6109fc89bb';
  const checkSum ='70c56062019e4480197580fd256fb477db563a588793e53a6a1a47516744318f';
  const [paymentLink, setpaymentLink] = useState('');

  const payment = async () => {
    var amount = 5000;
    var cancelUrl = 'https://localhost:3000/cancel';
    var description = 'Đơn hàng của Tannie nè';
    var orderCode = Date.now();
    var returnUrl = 'https://localhost:3000/success';
    var signature = await hmacSHA256(
      'amount=' +
        amount +
        '&cancelUrl=' +
        cancelUrl +
        '&description=' +
        description +
        '&orderCode=' +
        orderCode +
        '&returnUrl=' +
        returnUrl,
      checkSum,
  
    );

    console.log(signature);
    var body = {
      orderCode: orderCode,
      amount: amount,
      description: description,
      cancelUrl: cancelUrl,
      returnUrl: returnUrl,
      signature: signature,
    };

    axios
      .post('https://api-merchant.payos.vn/v2/payment-requests', body, {
        headers: {
          'x-client-id': clientID,
          'x-api-key': apiKey,
        },
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.code == 0) {
          setpaymentLink(response.data.data.checkoutUrl);
        } else {
          console.log('Lỗi rùi!! :(');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleNavigationChange = navState => {
    const {url} = navState;

    console.log('Current URL:', url);
    if (url.includes('/success')) {
      Alert.alert('Thành công', 'Bạn đã thanh toán thành công');
    } else if (url.includes('/cancel')) {
      Alert.alert('Thất bại', 'Đã hủy thanh toán.');
    }
  };

  return (
    <View>
      <Button onPress={payment} title="Thanh Toán"></Button>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <WebView
          source={{uri: paymentLink}}
          style={{width: '100%', height: 600}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onNavigationStateChange={handleNavigationChange}
        />
      </ScrollView>
    </View>
  );
};

export default PayOs;
