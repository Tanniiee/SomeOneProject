import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const User = (props) => {
  const {navigation} = props;
   const route = useRoute();
 
  return (
    <View style={styles.container}>
      <Text style={styles.tittle}>PROFILE</Text>
      {/* thông tin cá nhân */}
      <View style={styles.profile}>
        <Image style={styles.img} source={require('../assets/gg.png')} />
        <View>
          <Text style={styles.name}>Đặng Thị Thu Thảo </Text>
          <Text style={styles.email}>Dangthao11099@gmail.com</Text>
        </View>
      </View>
      {/* Chung */}
      <View>
        <Text style={styles.tittle2}>Chung</Text>
        <View style={styles.line} />
        <View>
          <TouchableOpacity>
            <Text style={styles.text}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Cẩm nang trồng cây</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Lịch sử giao dịch</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Q & A</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Bảo mật và điều khoản */}
      <View>
        <Text style={styles.tittle2}>Bảo mật và điều khoản</Text>
        <View style={styles.line} />
        <View>
          <TouchableOpacity>
            <Text style={styles.text}>Điều khoản và điều kiện</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.text}>Chính sách quyền riêng tư</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
            <Text style={styles.out}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
  },
  out: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
    color: '#FF0000',
  },
  line: {
    borderWidth: 0.5,
    borderColor: 'black',
    marginVertical: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: 'Black',
  },
  email: {
    fontSize: 14,
    fontWeight: '400',
    color: '#7F7F7F',
  },
  profile: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  img: {
    width: 40,
    height: 40,
  },
  container: {
    padding: 30,
  },
  tittle: {
    textAlign:'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#221F1F',
    marginBottom: 30,
  },
  tittle2: {
    fontSize: 16,
    fontWeight: '400',
    color: '#7F7F7F',
    marginTop: 20,
  },
});
