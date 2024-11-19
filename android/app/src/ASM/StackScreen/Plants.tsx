import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const Plants = props => {
  const {navigation} = props;
  const [selectedId, setSelectedId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  // Gọi API để lấy danh sách loại sản phẩm
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.1.17:3000/type/view');
        setCategories([{_id: null, typeName: 'Tất cả'}, ...response.data.data]);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách loại sản phẩm:', error);
      }
    };

    fetchCategories();
  }, []);

  // Hàm lấy sản phẩm theo loại
  const fetchProducts = async (typeId = null) => {
    setLoading(true);
    try {
      const url = typeId
        ? `http://192.168.1.17:3000/product/getProductsByType/${typeId}`
        : 'http://192.168.1.17:3000/product/getProducts';
      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy tất cả sản phẩm ban đầu
  useEffect(() => {
    fetchProducts();
  }, []);

  // Hiển thị từng loại sản phẩm
  const renderCate = ({item}) => (
    <TouchableOpacity
      style={[
        styles.cate,
        {
          backgroundColor: selectedId === item._id ? '#009245' : 'white',
        },
      ]}
      onPress={() => {
        setSelectedId(item._id);
        fetchProducts(item._id);
      }}>
      <Text
        style={{
          color: selectedId === item._id ? 'white' : '#7D7B7B',
          fontSize: 14,
          fontWeight: '400',
          paddingVertical: 8,
          textAlign: 'center',
        }}>
        {item.typeName}
      </Text>
    </TouchableOpacity>
  );

  // Hiển thị từng sản phẩm
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={styles.text}>CÂY TRỒNG</Text>
        <Icon name="cart-outline" size={24} color="black" />
      </View>

      {/* Danh sách loại sản phẩm */}
      <FlatList
        horizontal = {true}
        data={categories}
        renderItem={renderCate}
        keyExtractor={item => item._id?.toString()}
        contentContainerStyle={styles.categoryList}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#34A853" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderPlantItem}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          style={styles.plantListContainer}
        />
      )}
    </View>
  );
};

export default Plants;

const styles = StyleSheet.create({
  plantListContainer: {
    flex: 1,
    marginTop:-780, // Đảm bảo FlatList chiếm không gian còn lại
  },
  row: {
    justifyContent: 'space-between',
  },
  cate: {
    marginHorizontal: 10,
    borderRadius: 5,
    height: 40, // Cố định chiều cao của từng button loại sản phẩm
    justifyContent: 'center', // Canh giữa nội dung bên trong button
    paddingHorizontal: 10, // Đảm bảo padding đều cho button
  },
  categoryList: {
    height: 50, // Cố định chiều cao của danh sách loại sản phẩm
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    height: 60, // Giới hạn chiều cao của header
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  plantItem: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    margin: 5,
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
