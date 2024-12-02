import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../Redux/Slice/RegisterSlice';

export default function SignUp({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { registerData, registerStatus } = useSelector(state => state.register);

  // Xử lý khi trạng thái thay đổi
  useEffect(() => {
    if (registerStatus === 'succeeded') {
      if (registerData?.status === true) {
        ToastAndroid.show(registerData.message, ToastAndroid.SHORT);
        navigation.navigate('LogIn');
      } else {
        ToastAndroid.show(
          registerData?.message || 'Đăng ký thất bại',
          ToastAndroid.SHORT,
        );
      }
    } else if (registerStatus === 'failed') {
      ToastAndroid.show('Có lỗi xảy ra khi đăng ký', ToastAndroid.SHORT);
    }
  }, [registerStatus, registerData]);

  // Xử lý khi người dùng bấm nút Đăng ký
  const handleSignUp = () => {
    if (password !== confirm) {
     ToastAndroid.show('Mật khẩu không khớp', ToastAndroid.SHORT);
      return;
    }

    dispatch(Register({name, email, password}));
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
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Đăng ký</Text>
        <Text style={styles.signInText}>Tạo tài khoản</Text>
        <View style={styles.containerInput}>
          <TextInput
            style={styles.input}
            placeholder="Họ tên"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mật khẩu"
              value={password}
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

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Xác nhận mật khẩu"
              value={confirm}
              onChangeText={setConfirm}
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

          <View style={styles.containerdk}>
            <View style={styles.dieuKhoan}>
              <Text style={styles.textNotify}>
                Để đăng ký tài khoản, bạn đồng ý
                <Text style={styles.textNotifyLink}> Terms & Conditions </Text>
                <Text> và </Text>
                <Text style={styles.textNotifyLink}>Privacy Policy</Text>.
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleSignUp} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Đăng Ký</Text>
          </TouchableOpacity>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text>Hoặc</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity>
              <Image
                style={styles.socialIcon}
                source={require('../assets/gg.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.socialIcon}
                source={require('../assets/fb.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.noAccountText}>Bạn đã có tài khoản</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
              <Text style={styles.signUpText}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    top: -150,
  },
  containerdk: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dieuKhoan: {
    width: 311,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNotify: {
    textAlign: 'center',
  },
  textNotifyLink: {
    color: '#009245',
    textDecorationLine: 'underline',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginBottom: 40,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#009245',
    marginHorizontal: 10,
  },
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
    top: -150,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  signInText: {
    fontSize: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '400',
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
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 15,
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
