import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const MiniGamePikachu = () => {
  const originalAnimal = [
    {id: 1, idCard: 1, name: 'ant', image: require('../asset/animal/ant.jpg')},
    {id: 2, idCard: 2, name: 'bee', image: require('../asset/animal/bee.jpg')},
    {id: 3, idCard: 3, name: 'bt', image: require('../asset/animal/bt.jpg')},
    {id: 4, idCard: 4, name: 'sua', image: require('../asset/animal/sua.jpg')},
    {id: 5, idCard: 1, name: 'ant', image: require('../asset/animal/ant.jpg')},
    {id: 6, idCard: 2, name: 'bee', image: require('../asset/animal/bee.jpg')},
    {id: 7, idCard: 3, name: 'bt', image: require('../asset/animal/bt.jpg')},
    {id: 8, idCard: 4, name: 'sua', image: require('../asset/animal/sua.jpg')},
  ];

  const shuffleArray = array => {
    return array
      .map(item => ({...item, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(item => {
        delete item.sort;
        return item;
      });
  };

  const [animal, setAnimal] = useState(shuffleArray(originalAnimal));
  const [selectedItems, setSelectedItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);

  const clickCard = item => {
    if (
      selectedItems.length === 1 &&
      selectedItems[0].idCard === item.idCard &&
      selectedItems[0].id !== item.id
    ) {
      setHiddenItems([...hiddenItems, selectedItems[0].id, item.id]);
      setSelectedItems([]);
    } else {
      setSelectedItems([item]);
    }
  };

  const PlayAgain = () => {
    setHiddenItems([]);
    setSelectedItems([]);
    setAnimal(shuffleArray(originalAnimal)); // Random lại vị trí
  };

  const renderItem = ({item}) => {
    if (hiddenItems.includes(item.id)) {
      return <View style={styles.hiddenItem} />;
    }

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => clickCard(item)}>
          <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MiniGame Pikachu</Text>
      <FlatList
        data={animal}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
      <TouchableOpacity style={styles.play} onPress={PlayAgain}>
        <Text style={{color: 'white'}}>Chơi lại</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MiniGamePikachu;

const styles = StyleSheet.create({
  play: {
    width: 100,
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 30,
  },
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  row: {
    justifyContent: 'start',
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  hiddenItem: {
    marginHorizontal: 10,
    width: 100,
    height: 100,
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
});
