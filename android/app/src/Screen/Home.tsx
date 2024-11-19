import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Home = props => {
  const {navigation} = props;
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [Categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  

  const handleSelect = id => {
    setSelectedCategoryId(id);
  };

  // Lấy danh mục từ API
  const getCategories = async () => {
    try {
      const response = await fetch('https://vieclam.shop/list-category.php');
      const data = await response.json();
      console.log('Categories:', data); // Kiểm tra dữ liệu nhận được
      setCategories(data); // Cập nhật categories
      setSelectedCategoryId(data[0]?.idCate); // Đặt mặc định category được chọn là phần tử đầu tiên
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  // Lấy sản phẩm theo idCate từ API
  const getProducts = async idCate => {
    try {
      // Gửi yêu cầu GET đến API list sản phẩm theo idCate
      const response = await fetch(
        `https://vieclam.shop/list-product-by-cate.php?id=${idCate}`,
      );
      const data = await response.json(); // Dữ liệu trả về từ API
      setProduct(data); // Cập nhật state với danh sách sản phẩm theo category
    } catch (error) {
      console.log('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      getProducts(selectedCategoryId);
    }
  }, [selectedCategoryId]); // Gọi lại getProducts mỗi khi selectedCategoryId thay đổi

  const renderItem = ({item}) => {
    const isSelected = selectedCategoryId === item.idCate;
    return (
      <TouchableOpacity onPress={() => setSelectedCategoryId(item.idCate)}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.categoryText}>{item.nameCate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity onPress={()=> navigation.navigate('Detail',{product:item})}>
        <View style={{flexDirection: 'row', marginRight: 10}}>
        <Image source={{uri: item.image}} style={styles.productImage} />
      </View>
      </TouchableOpacity>
      
    );
  };

  const renderBestseller = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        width: 315,
        height: 144,
        backgroundColor: '#2E2E5D',
        marginBottom: 30,
        marginHorizontal: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius:10,
      }}>
      <Image source={{uri: item.image}} style={{width: 120, height: 120}} />
      <View style={{padding: 15}}>
        <Text
          numberOfLines={1}
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            width: 150,
          }}>
          {item.nameProduct}
        </Text>
        <Text
          numberOfLines={2}
          style={{color: 'white', fontSize: 14, marginTop: 10, width: 150}}>
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
             <Image
            style={styles.logo}
            source={require('../asset/logo.png')}
          />
          </TouchableOpacity>
         
          <Text style={styles.title}>Audi</Text>
          <Text style={styles.title}>Books</Text>
          <Image
            style={styles.settingsIcon}
            source={require('../asset/setting.png')}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.seeMore}>See more</Text>
        </View>

        {/* FlatList để render danh sách categories từ API */}
        <FlatList
          horizontal
          data={Categories}
          renderItem={renderItem}
          keyExtractor={item => item.idCate.toString()} // Sử dụng idCate làm keyExtractor
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <Text style={styles.seeMore}>See more</Text>
        </View>

        {/* FlatList để render sản phẩm của danh mục được chọn */}
        <FlatList
          horizontal
          data={product}
          renderItem={renderProduct}
          keyExtractor={item => item.idProduct.toString()} // Sử dụng idProduct làm keyExtractor
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Seller</Text>
          <Text style={styles.seeMore}>See more</Text>
        </View>
        <FlatList
          horizontal
          data={product}
          renderItem={renderBestseller}
          keyExtractor={item => item.idProduct.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100f2b',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  settingsIcon: {
    width: 30,
    height: 30,
    marginLeft: 130,
  },
  sectionHeader: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeMore: {
    color: '#BBB1FA',
    fontSize: 14,
  },
  categoryText: {
    color: 'white',
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    backgroundColor: '#2E2E5D',
    borderRadius: 15,
    fontSize: 17,
  },
  productImage: {
    width: 200,
    height: 300,
    marginHorizontal: 10,
    borderRadius:5
  },
});
