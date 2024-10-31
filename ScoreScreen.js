import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';

const ScoreScreen = ({ route, navigation }) => {
  const { score, team1, team2, roundsPlayed } = route.params;
  const winner = score.team1 > score.team2 ? team1 : team2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Итоговый Счет</Text>
      <Text style={styles.score}>Команда {team1}: {score.team1}</Text>
      <Text style={styles.score}>Команда {team2}: {score.team2}</Text>
      <Text style={styles.winner}>Победитель: {winner}</Text>
      <Button title="Начать Сначала" onPress={() => navigation.navigate('HomeScreen')} />
    </View>
  );
};

export default ScoreScreen;
