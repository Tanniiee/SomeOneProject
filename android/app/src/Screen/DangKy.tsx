import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ToastAndroid,
} from 'react-native';
import {register, login} from '../Axios/BookHelper'

const DangKy = ({navigation}) => {
  const [email, setEmail] = useState('ThaoNe123@gmail.com');
  const [password, setPassword] = useState('12345');
  const [name, setName] = useState('Thao');

  // Kiểm tra xem các field có trống không
  const isFormValid = email !== '' && password !== '' && name !== '';

  const handleRegister = () => {
    if (isFormValid) {
      Alert.alert('Thông báo', 'Đăng ký thành công');
      navigation.navigate('Home');
    }
  };
const onRegister = async () => {
  try {
    const data = {
      email: email,
      password: password,
      name: name,
    };
    const response = await register(data);

    if (response) {
      console.log('Dang ky Thanh cong');

      ToastAndroid.show('Dang Ky Thanh Cong', ToastAndroid.LONG);
      navigation.navigate('Home');
      return;
    }
  } catch (error) {
    console.log(error);
  }
  ToastAndroid.show('Dang Ky That Bai', ToastAndroid.LONG);
};
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.imageLogo} source={require('../asset/logo.png')} />
      </View>
      <View style={styles.all}>
        <Text style={styles.text}>Register</Text>
        <View style={styles.shadown}>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.shadown}>
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.shadown}>
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View>
          <Text style={styles.textNotify}>
            By signing up, you agree to our
            <Text style={styles.textNotifyLink}> Terms, </Text>
            <Text style={styles.textNotifyLink}>Data Policy</Text>
            <Text> and </Text>
            <Text style={styles.textNotifyLink}>Cookies Policy</Text>.
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.bottomRegister,
            !isFormValid && {backgroundColor: '#ccc'},
          ]}
          onPress={onRegister}
          disabled={!isFormValid}>
          <Text style={styles.textBottom}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomCancel}>
          <Text style={styles.textCancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DangKy;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 50,
  },
  all: {
    flexDirection: 'column',
    gap: 16,
    marginHorizontal: 20,
  },
  imageLogo: {
    width: 120,
    height: 120,
  },
  textInput: {
    backgroundColor: '#F5F5FA',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    fontSize: 14,
    color: '#B8B8C8',
    fontWeight: '500',
  },
  shadown: {
    borderRadius: 8,
    borderColor: 'gray',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9292A2',
  },
  textBottom: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  textCancel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4838D1',
  },
  bottomRegister: {
    backgroundColor: '#4838D1',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomCancel: {
    borderWidth: 1,
    color: '#4838D1',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  textNotify: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9292A2',
  },
  textNotifyLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F77A55',
  },
});
