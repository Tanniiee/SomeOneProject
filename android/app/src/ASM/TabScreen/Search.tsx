import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = props => {
  const {navigation} = props;
  const [searchText, setSearchText] = useState('');
  const products = [
    {
      id: '1',
      name: 'Panse Đen | Hybrid',
      price: '250.000đ',
      stock: 156,
      image:
        'https://i.pinimg.com/736x/24/7b/18/247b1802aa4730407bcb9d2a960ba8d0.jpg',
    },
  ];

  const clearSearch = () => setSearchText('');

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TÌM KIẾM</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Nhập từ khoá..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearIcon}>
            <Icon name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {searchText.length > 0 ? (
        filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.productItem}>
                <Image source={{uri: item.image}} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <Text style={styles.productStock}>Còn {item.stock} sp</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noResultText}>Không tìm thấy sản phẩm nào</Text>
        )
      ) : (
        <Text style={styles.placeholderText}>
          Nhập từ khoá để tìm kiếm sản phẩm
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  clearIcon: {
    marginLeft: 8,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  productInfo: {
    marginLeft: 8,
  },
  productName: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  productPrice: {
    color: 'green',
    fontSize: 14,
  },
  productStock: {
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#221F1F',
    textAlign: 'center',
    flex: 1,
  },
  noResultText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 16,
    fontSize: 16,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 16,
    fontSize: 16,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default SearchScreen;
