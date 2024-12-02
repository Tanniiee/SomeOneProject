import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {Login} from '../Redux/Slice/LoginSlice';

export default function LoginScreen({navigation, route}) {
  const {email, password} = route.params || {};
  const [userEmail, setEmail] = useState(email || '1');
  const [userPassword, setPassword] = useState(password || '1');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const {loginData, loginStatus} = useSelector(state => state.login);

  useEffect(() => {
     console.log('Login Status:', loginStatus);
     console.log('Login Data:', loginData);
    if (loginStatus === 'succeeded') {
      if (loginData?.status === true) {
        navigation.navigate('Home');
      } else {
        ToastAndroid.show(
          loginData?.message || 'Đăng nhập thất bại',
          ToastAndroid.SHORT,
        );
      }
    } else if (loginStatus === 'failed') {
      ToastAndroid.show('Có lỗi xảy ra khi đăng nhập', ToastAndroid.SHORT);
    }
  }, [loginStatus, loginData]);

  const handleLogin = async () => {
    if (!userEmail || !userPassword) {
    ToastAndroid.show('Vui lòng nhập email và mật khẩu', ToastAndroid.SHORT);
      return;
    }
    dispatch(Login({email: userEmail, password: userPassword}));
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
