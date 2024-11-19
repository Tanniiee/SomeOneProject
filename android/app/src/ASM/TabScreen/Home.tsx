import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';

const Home = props => {
  const route = useRoute();
  const {navigation} = props;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  // Fetch sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://172.16.95.89:3000/product/getProducts',
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const renderPlantItem = ({item}) => (
    <TouchableOpacity
      style={styles.plantItem}
      onPress={() => navigation.navigate('Detail', {product: item})} // Truyền dữ liệu sản phẩm vào
    >
      <Image source={{uri: item.image}} style={styles.plantImage} />
      <Text numberOfLines={1} style={styles.plantName}>
        {item.productName}
      </Text>
      <Text style={styles.plantLight}>{item.type.typeName}</Text>
      <Text style={styles.plantPrice}>{item.price}đ</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerheader}>
        <View style={styles.header1}>
          <View style={styles.header}>
            <Text style={styles.title}>Planta - tỏa sáng</Text>
            <TouchableOpacity style={styles.cartButton}>
              <Icon name="shopping-cart" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Không gian nhà bạn</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Xem hàng mới về</Text>
            <Icon name="arrow-right" size={16} color="#8B8B8B" />
          </TouchableOpacity>
        </View>
        <View style={styles.banner}>
          <Image source={require('../assets/plants/banner.png')} />
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Plants')}>
        <Text style={styles.sectionTitle}>Cây trồng</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#34A853" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderPlantItem}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerheader: {
    marginTop: -80,
  },
  banner: {
    alignItems: 'center',
    height: 205,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header1: {
    top: 105,
    position: 'relative',
    marginVertical: 16,
    zIndex: 1,
    marginStart: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#221F1F',
    marginVertical: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#34A853',
    marginRight: 4,
  },
  cartButton: {
    padding: 8,
    marginEnd: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#221F1F',
    marginTop: 20,
    marginStart: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  plantItem: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    margin: 10,
  },
  plantImage: {
    borderRadius: 5,
    width: 170,
    height: 135,
    resizeMode: 'contain',
    backgroundColor: '#F6F6F6',
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  plantLight: {
    fontSize: 14,
    color: '#666',
  },
  plantPrice: {
    fontSize: 16,
    color: '#007537',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default Home;
