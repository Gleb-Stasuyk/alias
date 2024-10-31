import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import styles from './styles';

const ResultScreen = ({ route, navigation }) => {
  const { score } = route.params;

  const startNewGame = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SelectSetScreen' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over</Text>
      <Text style={styles.score}>Correct: {score.correct}</Text>
      <Text style={styles.score}>Incorrect: {score.incorrect}</Text>
      <Button title="Play Again" onPress={startNewGame} />
      <Button title="Home" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
};

export default ResultScreen;
