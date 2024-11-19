import React, {useState} from 'react';
import {Alert, Button, Image, StyleSheet, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

const Camera = () => {
  const [images, setImages] = useState();

  // Thiết lập cấu hình chung cho camera và thư viện ảnh
  const commonOptions = {
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
  };

  // Cấu hình cho camera
  const cameraOptions = {
    cameraType: 'front',
    saveToPhotos: true,
    ...commonOptions,
  };

  // Cấu hình cho thư viện ảnh
  const libraryOptions = {
    selectionLimit: 10,
    ...commonOptions,
  };

  // Hàm mở camera
  const onOpenCamera = async () => {
    const response = await launchCamera(cameraOptions);
    if (response?.assets) {
      setImages(response.assets);
    } else {
      Alert.alert(
        'Có lỗi xảy ra',
        response.errorMessage || 'Không thể mở camera',
      );
    }
  };

  // Hàm mở thư viện ảnh
  const onOpenLibrary = async () => {
    const response = await launchImageLibrary(libraryOptions);
    if (response?.assets) {
      setImages(response?.assets);
      goiAPI(response.assets);
    } else {
      Alert.alert(
        'Có lỗi xảy ra',
        response.errorMessage || 'Không thể mở thư viện ảnh',
      );
    }
  };

  const goiAPI = assets => {
    var form = new FormData();
    form.append('image', {
      uri: assets[0].uri,
      type: assets[0].type,
      name: assets[0].fileName,
    });
    axios
      .post(`https://api.fpt.ai/vision/idr/vnm`, form, {
        headers: {
          'api-key': 'TFfGg9zHQP5hLTxSMJvGuo1kn7QIjGnP',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Mở Camera" onPress={onOpenCamera} />
      <Button title="Chọn Từ Thư Viện" onPress={onOpenLibrary} />

      {/* Hiển thị hình ảnh */}
      <Image
        source={{
          uri:
            images?.[0]?.uri ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
        }}
        style={styles.avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  avatar: {
    width: 400,
    height: 300,
  },
});

export default Camera;
