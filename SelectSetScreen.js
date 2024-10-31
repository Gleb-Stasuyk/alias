import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

const SelectSetScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, styles.selectSetScreenContainer]}>
      <Text style={[styles.title, styles.selectSetScreenTitle]}>Выберите Набор Слов</Text>
      <TouchableOpacity style={[styles.button, styles.selectSetScreenButton]} onPress={() => navigation.navigate('SelectTeamScreen', { set: 'cars' })}>
        <Image source={require('./assets/images/cars.png')} style={styles.selectSetScreenImage} resizeMode="contain"/>
        <Text style={styles.selectSetScreenButtonText}>Автомобили</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.selectSetScreenButton]} onPress={() => navigation.navigate('SelectTeamScreen', { set: 'animals' })}>
        <Image source={require('./assets/images/animals.png')} style={styles.selectSetScreenImage} resizeMode="contain"/>
        <Text style={styles.selectSetScreenButtonText}>Животные</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.selectSetScreenButton]} onPress={() => navigation.navigate('SelectTeamScreen', { set: 'sex' })}>
        <Image source={require('./assets/images/sex.png')} style={styles.selectSetScreenImage} resizeMode="contain"/>
        <Text style={styles.selectSetScreenButtonText}>Секс</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.selectSetScreenButton]} onPress={() => navigation.navigate('SelectTeamScreen', { set: 'planes' })}>
        <Image source={require('./assets/images/planes.png')} style={styles.selectSetScreenImage} resizeMode="contain"/>
        <Text style={styles.selectSetScreenButtonText}>Самолеты</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectSetScreen;
