import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Payment = (props) => {
  const {navigation} = props;
  const [shippingMethod, setShippingMethod] = useState('fast');
  const [paymentMethod, setPaymentMethod] = useState('visa');

  const shippingOptions = [
    {
      id: 'fast',
      label: 'Giao hàng Nhanh - 15.000đ',
      estimated: 'Dự kiến giao hàng 5-7/9',
    },
    {
      id: 'cod',
      label: 'Giao hàng COD - 20.000đ',
      estimated: 'Dự kiến giao hàng 4-8/9',
    },
  ];

  const paymentOptions = [
    {id: 'visa', label: 'Thẻ VISA/MASTERCARD'},
    {id: 'atm', label: 'Thẻ ATM'},
  ];

  const subtotal = 500000;
  const shippingFee = shippingMethod === 'fast' ? 15000 : 20000;
  const total = subtotal + shippingFee;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require('../assets/icon/goback.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>THANH TOÁN</Text>
      </View>
      {/* Thông tin khách hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên khách hàng"
          value="Đặng Thị Thu Thảo"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value="T1101999@gmail.com"
        />
        <TextInput style={styles.input} placeholder="Địa chỉ" value="quận 12" />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value="0925103825"
          keyboardType="phone-pad"
        />
      </View>

      {/* Phương thức vận chuyển */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
        {shippingOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => setShippingMethod(option.id)}>
            <View>
              <Text style={styles.optionText}>{option.label}</Text>
              <Text style={styles.estimated}>{option.estimated}</Text>
            </View>

            {shippingMethod === option.id && (
              <Icon name="check" size={24} color="#007537" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Phương thức thanh toán */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hình thức thanh toán</Text>
        {paymentOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => setPaymentMethod(option.id)}>
            <Text style={styles.optionText}>{option.label}</Text>
            {paymentMethod === option.id && (
              <Icon name="check" size={24} color="#007537" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Tổng kết chi phí */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>Tạm tính:</Text>
          <Text style={styles.summaryText1}>{subtotal.toLocaleString()}đ</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryText}>Phí vận chuyển:</Text>
          <Text style={styles.summaryText1}>
            {shippingFee.toLocaleString()}đ
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryTotal}>Tổng cộng:</Text>
          <Text style={styles.summaryTotal1}>{total.toLocaleString()}đ</Text>
        </View>
      </View>

      {/* Nút tiếp tục */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>TIẾP TỤC</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1, 
    padding: 16, 
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24,
  },
  icon: {
    height: 24,
    width: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#221F1F',
    flex:1,
    textAlign:'center'
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: 14,
  },
  estimated: {
    fontSize: 12,
    color: '#555',
  },
  checkmark: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  summary: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 16,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  summaryText1: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
    color: '#000',
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  summaryTotal1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#007537',
  },
  continueButton: {
    backgroundColor: '#888',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  continueText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Payment;
