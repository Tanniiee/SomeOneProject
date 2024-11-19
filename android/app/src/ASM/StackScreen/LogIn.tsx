import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({navigation, route}) {
  const {email, password} = route.params || {};
  const [userEmail, setEmail] = useState(email || '');
  const [userPassword, setPassword] = useState(password || '');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.17:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: userEmail, password: userPassword}),
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Thành công', 'Đăng nhập thành công');
        navigation.navigate('Home');
      } else {
        Alert.alert('Lỗi', data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể kết nối tới máy chủ');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image
          style={styles.backImg}
          source={require('../assets/arrowBack.png')}
        />
      </TouchableOpacity>

      <Image
        source={require('../assets/logo.png')}
        style={styles.backgroundImage}
      />
      <Text style={styles.welcomeText}>Chào mừng bạn</Text>
      <Text style={styles.signInText}>Đăng nhập tài khoản</Text>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="Nhập email hoặc số điện thoại"
          value={userEmail}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Mật khẩu"
            value={userPassword}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color="#8B8B8B"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <View style={styles.signUpContainer}>
          <Text style={styles.noAccountText}>Bạn không có tài khoản?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Tạo tài khoản</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerInput: {
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backImg: {
    width: 32,
    height: 32,
  },
  backgroundImage: {
    width: '100%',
    height: 360,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  signInText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#8B8B8B',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 46,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8B8B8B',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 46,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
  },
  loginButton: {
    backgroundColor: '#007537',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    color: '#666',
  },
  signUpText: {
    color: '#009245',
    marginLeft: 5,
  },
});
