import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const wordSets = [
  { id: 'cars', title: 'Автомобили', image: require('./assets/images/cars.png') },
  { id: 'animals', title: 'Животные', image: require('./assets/images/animals.png') },
  { id: 'sex', title: 'Секс', image: require('./assets/images/sex.png') },
  { id: 'planes', title: 'Самолеты', image: require('./assets/images/planes.png') },
  // Add more sets as needed
];

const HomeScreen = ({ navigation }) => {
  const numColumns = Math.ceil(Math.sqrt(wordSets.length));

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.button, styles.selectSetScreenButton, { flex: 1, margin: 1 }]} 
      onPress={() => navigation.navigate('SelectTeamScreen', { set: item.id })}
    >
      <Image source={item.image} style={styles.selectSetScreenImage} />
      <Text style={styles.selectSetScreenButtonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('./assets/images/background-image.png')} style={styles.homeScreenBackground}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, styles.homeScreenTitle]}>Игра Угадай Слово</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
            <Ionicons name="settings" size={styles.settingsIcon.fontSize} color={styles.settingsIcon.color} />
          </TouchableOpacity>
        </View>
        <View style={styles.selectSetScreenContainer}>
          <FlatList
            data={wordSets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
