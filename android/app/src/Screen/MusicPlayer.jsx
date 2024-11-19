import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import TrackPlayer from 'react-native-track-player';
import {playbackService, usePlayTrack} from './trackService';

TrackPlayer.registerPlaybackService(() => playbackService);

const Musicplayer = () => {
  const songs = [
    {
      id: 2,
      title: 'Awful',
      artist: 'josh pan',
      artwork:
        'https://anhdepbonphuong.com/wp-content/uploads/2024/03/Hinh-nen-luffy-nika-joy-boy-one-piece-dep-nhat-hd-01.jpg',
      url: require('../asset/dienvientoi.mp3'),
    },
    {
      id: 3,
      title: 'Something is Going On',
      artist: 'Godmode',
      artwork:
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/09/hinh-nen-luffy-26.jpg',
      url: require('../asset/dienvientoi.mp3'),
    },
    {
      id: 4,
      title: 'Book The Rental Wit It',
      artist: 'RAGE',
      artwork:
        'https://static.minhtuanmobile.com/uploads/editer/images/2023/08/luffy-gear-5-9.webp',
      url: require('../asset/dienvientoi.mp3'),
    },
    {
      id: 5,
      title: 'Crimson Fly',
      artist: 'Huma-Huma',
      artwork:
        'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/185317/Originals/hinh%20nen%20luffy%20gear%205%20(11).jpg',
      url: require('../asset/dienvientoi.mp3'),
    },
  ];

  const {
    onTogglePlayTrack,
    onSkipToNext,
    onSkipToPrevious,
    trackArtist,
    trackTitle,
    trackArtwork,
  } = usePlayTrack(songs);

  // Animated value for rotation
  const rotation = useRef(new Animated.Value(0)).current;
  const isPlaying = useRef(false);

  // Start rotating animation
  const startRotation = () => {
    isPlaying.current = true;
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
    ).start();
  };

  // Stop rotation animation
  const stopRotation = () => {
    isPlaying.current = false;
    rotation.stopAnimation();
    rotation.setValue(0); 
  };

  const handlePlayPause = () => {
    onTogglePlayTrack();
    if (isPlaying.current) {
      stopRotation();
    } else {
      startRotation();
    }
  };

  // Interpolating rotation value
  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.trackInfo}>{trackTitle}</Text>
      <Animated.Image
        source={{uri: trackArtwork}}
        style={[styles.artwork, {transform: [{rotate: rotateInterpolation}]}]}
      />
      <Text style={styles.trackInfo}>{trackArtist}</Text>

      <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Play / Pause</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={onSkipToPrevious}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSkipToNext}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Musicplayer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  trackInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  artwork: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 100,
  },
});
