import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const Detail = props => {
  const {navigation} = props;
  const route = useRoute();
  const {product} = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            source={require('../asset/icons/goback.png')}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{product.nameProduct}</Text>
        <Image
          style={styles.icon}
          source={require('../asset/icons/more.png')}
        />
      </View>

      {/* Book Image */}
      <View style={styles.containerImage}>
        <Image style={styles.image} source={{uri: product.image}} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {product.nameProduct}
        </Text>
        <Text style={styles.author}>Tannie</Text>
        <Text style={styles.rating}>Price: {product.price}</Text>

        {/* Book Type
        <View style={styles.viewType}>
          {book.type.map((type, index) => (
            <TouchableOpacity key={index} style={styles.type}>
              <Text style={styles.textButton}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View> */}

        {/* Buttons */}
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.buttonPlay}>
            <Image source={require('../asset/icons/play.png')} />
            <Text style={styles.textPlay}>Play Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRead}>
            <Image source={require('../asset/icons/Read.png')} />
            <Text style={styles.textRead}>Read Book</Text>
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View>
          <Text style={styles.summaryTitle}>Summary</Text>
          <Text style={styles.summaryText}>{product.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F29',
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9292a2',
  },
  containerImage: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 260,
    height: 260,
  },
  content: {
    marginLeft: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
    width: '90%',
  },
  author: {
    fontSize: 16,
    color: '#9292a2',
    marginVertical: 12,
  },
  rating: {
    fontSize: 20,
    color: '#F77A55',
    marginBottom: 12,
  },
  viewType: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap', // Giúp gói các loại nếu có quá nhiều loại
  },
  type: {
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: '#6a6a8b',
    marginBottom: 8,
  },
  textButton: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6a6a8b',
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 12,
  },
  buttonPlay: {
    flexDirection: 'row',
    backgroundColor: '#4838D1',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  textPlay: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  buttonRead: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#4838D1',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  textRead: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4838D1',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9292a2',
    marginTop: 32,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    fontWeight: '300',
    color: '#6a6a8b',
  },
});
