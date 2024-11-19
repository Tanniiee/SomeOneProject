import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';

const Detail = props => {
  const {navigation} = props;
  const route = useRoute();
  const {product} = route.params;

  // Thêm state để lưu trữ số lượng sản phẩm và tổng tiền
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);

  // Cập nhật tổng tiền khi số lượng thay đổi
  useEffect(() => {
    setTotal(quantity * product.price);
  }, [quantity]);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require('../assets/icon/goback.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{product.productName}</Text>
        <Image
          style={styles.icon}
          source={require('../assets/icon/cart.png')}
        />
      </View>

      {/* Image product */}
      <View style={styles.containerImage}>
        <Image style={styles.image} source={{uri: product.image}} />
      </View>

      <View style={styles.prevNext}>
        <Image
          style={styles.icon}
          source={require('../assets/icon/prev.png')}
        />
        <Image
          style={styles.icon}
          source={require('../assets/icon/next.png')}
        />
      </View>

      {/* loại */}
      <View style={styles.type}>
        <TouchableOpacity>
          <Text style={styles.text}>{product.type.typeName}</Text>
        </TouchableOpacity>
      </View>

      {/* Giá */}
      <View>
        <Text style={styles.price}>{product.price}đ</Text>
      </View>

      {/* Chi tiết sản phẩm */}
      <View style={{paddingHorizontal: 40}}>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <View style={styles.line} />
        <View style={styles.detail}>
          <Text style={styles.textdetai}>Kích cỡ</Text>
          <Text style={styles.textdetai}>{product.size}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.detail}>
          <Text style={styles.textdetai}>Xuất xứ</Text>
          <Text style={styles.textdetai}>{product.origin}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.detail}>
          <Text style={styles.textdetai}>Tình trạng</Text>
          <Text style={styles.textsl}>Còn {product.stockQuantity} sp</Text>
        </View>
        <View style={styles.line} />
      </View>

      {/* total */}
      <View style={styles.total}>
        <View>
          <Text style={styles.textdetai}>Đã chọn {quantity} sản phẩm</Text>
          <View style={styles.slcontainer}>
            <TouchableOpacity onPress={handleDecrease}>
              <Image
                style={styles.icon2}
                source={require('../assets/icon/minus.png')}
              />
            </TouchableOpacity>
            <Text style={{fontSize: 16, color: '#000'}}>{quantity}</Text>
            <TouchableOpacity onPress={handleIncrease}>
              <Image
                style={styles.icon2}
                source={require('../assets/icon/plus.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginLeft: 100}}>
          <Text style={styles.textdetai}>Tạm tính</Text>
          <View style={styles.slcontainer}>
            <Text style={{fontSize: 24, color: '#000'}}>{total}đ</Text>
          </View>
        </View>
      </View>

      {/* button mua */}
      <TouchableOpacity
        style={[
          styles.buyButton,
          {backgroundColor: quantity > 0 ? '#009245' : '#ABABAB'}, // Đổi màu nút tùy vào số lượng sản phẩm
        ]}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '500',
            color: '#fff',
          }}>
          CHỌN MUA
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  total: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginVertical: 20,
    marginLeft: 20,
  },
  slcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 120,
  },
  type: {
    padding: 8,
    backgroundColor: '#009245',
    borderRadius: 8,
    marginTop: 160,
    width: 80,
    marginLeft: 20,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
  },
  line: {
    borderWidth: 0.5,
    borderColor: 'black',
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
  textdetai: {
    color: '#3A3A3A',
    fontSize: 14,
    fontWeight: '400',
  },
  textsl: {
    color: '#007537',
    fontSize: 14,
    fontWeight: '400',
  },
  price: {
    color: '#007537',
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 40,
    marginVertical: 20,
  },
  prevNext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  icon: {
    height: 24,
    width: 24,
  },
  icon2: {
    height: 30,
    width: 30,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#221F1F',
  },
  containerImage: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 260,
    height: 260,
  },
  buyButton: {
    paddingVertical: 12,
    marginHorizontal: 20,
    borderRadius: 8,
  },
});
