import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {GetCategories} from '../Redux/Slice/GetCategoriesSlice';
import {GetProductsByCategory} from '../Redux/Slice/GetProductByCategorySlice';

const Plants = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);

  const dispatch = useDispatch();
  const {categoriesData, categoriesStatus} = useSelector(
    state => state.getCategories,
  );
 const {
   getProductByCategoryData: productsData,
   getProductByCategoryStatus: productsStatus,
 } = useSelector(state => state.getProductByCategory);


  useEffect(() => {
    dispatch(GetCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetProductsByCategory()); 
  }, [dispatch]);

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
        dispatch(GetProductsByCategory(item._id));
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

  const renderPlantItem = ({item}) => (
    <TouchableOpacity
      style={styles.plantItem}
      onPress={() => navigation.navigate('Detail', {product: item})}>
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
        <Icon
          name="cart-outline"
          size={24}
          color="black"
          onPress={() => navigation.navigate('Cart')}
        />
      </View>

      {/* Danh sách loại sản phẩm */}
      <FlatList
        horizontal
        data={categoriesData}
        renderItem={renderCate}
        keyExtractor={item => item._id?.toString()}
        contentContainerStyle={styles.categoryList}
      />

      {productsStatus === 'loading' ? (
        <ActivityIndicator size="large" color="#34A853" />
      ) : (
        <FlatList
          data={productsData}
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
    marginTop: -780, // Đảm bảo FlatList chiếm không gian còn lại
  },
  row: {
    justifyContent: 'space-between',
  },
  cate: {
    marginHorizontal: 10,
    borderRadius: 5,
    height: 40, // Cố định chiều cao của từng button loại sản phẩm
    justifyContent: 'center', // Canh giữa nội dung bên trong button
    paddingHorizontal: 10,
  },
  categoryList: {
    height: 110,
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
    backgroundColor: '#fff',
  },
  plantImage: {
    borderRadius: 5,
    width: 170,
    height: 135,
    resizeMode: 'contain',
    backgroundColor: '#fff',
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
