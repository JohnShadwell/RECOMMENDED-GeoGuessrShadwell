import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const images = [
    { image: require('./assets/florence.jpg'), coordinate: { latitude: 43.78237, longitude: 11.25499 } },
    { image: require('./assets/moscow.jpg'), coordinate: { latitude: 55.75222, longitude: 37.61556 } },
    { image: require('./assets/tokyo.jpg'), coordinate: { latitude: 35.689487, longitude: 139.691706 } },
    { image: require('./assets/kilimanjaro.jpg'), coordinate: { latitude: -2.9531462, longitude: 37.202152 } },
    { image: require('./assets/nemo.jpg'), coordinate: { latitude: -18.15629, longitude: 147.485962 } },
    { image: require('./assets/golden.jpg'), coordinate: { latitude: 37.819929, longitude: -122.478255 } },
    { image: require('./assets/times.jpg'), coordinate: { latitude: 40.758888, longitude: -73.985197 } },
    { image: require('./assets/opera.jpg'), coordinate: { latitude: -33.856159, longitude: 151.215256 } },
    { image: require('./assets/itza.jpg'), coordinate: { latitude: 20.6843, longitude: -88.5678 } },
    { image: require('./assets/wall.jpg'), coordinate: { latitude: 40.431908, longitude: 116.570374 } },
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [usedIndex, setusedIndex] = useState([]);
  const [guessCoordinate, setGuessCoordinate] = useState(null);
  const [isGuessLockedIn, setIsGuessLockedIn] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(true);
  const [modalNumber, setModalNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const modalNumberCheck = (input) => {
    setModalNumber(input);
    setModalVisible1(!modalVisible1);
  };

  const start = () => {
    setModalNumber(2);
    handleNextImage();
  };

  const handleMarkerPress = (event) => {
    if (!isGuessLockedIn) {
      setGuessCoordinate(event.nativeEvent.coordinate);
    }
  };

  const handleLockInGuess = () => {
    if (guessCoordinate != null) {
      setIsGuessLockedIn(true);
      modalNumberCheck(1);
      setScore(Math.round(20035 - distance) + score);
    }
  };

  const handleNextImage = () => {
    setGuessCoordinate(null);
    setIsGuessLockedIn(false);

    if (usedIndex.length !== 0) {
      modalNumberCheck(2);
    }

    let randomIndex = 0;

    if (usedIndex.length === images.length) {
      modalNumberCheck(3);
    } else {
      do {
        randomIndex = Math.floor(Math.random() * images.length);
      } while (usedIndex.includes(randomIndex));

      setusedIndex([...usedIndex, randomIndex]);
      setCurrentImage(images[randomIndex]);
    }
  };

  const distance = guessCoordinate
    ? haversineDistance(guessCoordinate, currentImage.coordinate)
    : null;

  function haversineDistance(coord1, coord2) {
    const R = 6371;
    const dLat = toRadians(coord2.latitude - coord1.latitude);
    const dLon = toRadians(coord2.longitude - coord1.longitude);
    const lat1 = toRadians(coord1.latitude);
    const lat2 = toRadians(coord2.latitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function toRadians(deg) {
    return (deg * Math.PI) / 180;
  }

  const storeHighScore = async () => {
    await AsyncStorage.setItem('highScore', JSON.stringify(score));
  };

  const setHighScore2 = async () => {
    const value = await AsyncStorage.getItem('highScore');
    if (value) setHighScore(JSON.parse(value));
  };

  const restart = () => {
    setusedIndex([]);
    setScore(0);
    setModalNumber(0);
    setGuessCoordinate(null);
    setIsGuessLockedIn(false);

    if (score > highScore) storeHighScore();
    setHighScore2();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}>

        <Modal transparent visible={modalVisible1} animationType="fade">

          {modalNumber === 0 && (
            <View style={styles.modal}>
              <Text style={styles.title}>Geo Guesser Game</Text>
              <Text style={styles.distanceText}>
                Guess the location of each image by tapping on the map.
              </Text>
              <TouchableOpacity style={styles.button} onPress={start}>
                <Text style={styles.buttonText}>Start Game</Text>
              </TouchableOpacity>
            </View>
          )}

          {modalNumber === 1 && (
            <View style={styles.modal}>
              <Text style={styles.distanceText}>
                {distance && `Distance: ${distance.toFixed(2)} km`}
              </Text>
              <Text style={styles.distanceText}>Score: {score}</Text>
              <Text style={styles.distanceText}>High Score: {highScore}</Text>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible1(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}

          {modalNumber === 2 && (
            <View style={styles.modal}>
              <Image source={currentImage.image} style={styles.image} />
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible1(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}

          {modalNumber === 3 && (
            <View style={styles.modal}>
              <Text style={styles.title}>Game Complete</Text>
              <Text style={styles.distanceText}>Final Score: {score}</Text>
              <TouchableOpacity style={styles.button} onPress={restart}>
                <Text style={styles.buttonText}>Restart Game</Text>
              </TouchableOpacity>
            </View>
          )}

        </Modal>

        <MapView style={styles.map} onPress={handleMarkerPress}>
          {guessCoordinate && <Marker coordinate={guessCoordinate} pinColor="red" />}
          {isGuessLockedIn && (
            <>
              <Marker coordinate={currentImage.coordinate} pinColor="blue" />
              <Polyline
                coordinates={[currentImage.coordinate, guessCoordinate]}
                strokeWidth={3}
                strokeColor="#000"
              />
            </>
          )}
        </MapView>

        <View style={styles.bottomBar}>
          <Button title="View Image" onPress={() => modalNumberCheck(2)} />
          {!isGuessLockedIn ? (
            <Button title="Lock in guess" onPress={handleLockInGuess} />
          ) : (
            <Button title="Next image" onPress={handleNextImage} />
          )}
          <Button title="View Score" onPress={() => modalNumberCheck(1)} />
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  map: { flex: 1 },
  modal: {
    margin: 40,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  distanceText: { textAlign: 'center', marginVertical: 5 },
  image: { width: '100%', height: 200, resizeMode: 'contain' },
  button: {
    marginTop: 15,
    backgroundColor: 'olivedrab',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
});
