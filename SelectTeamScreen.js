import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import styles from './styles';

const SelectTeamScreen = ({ navigation, route }) => {
  const { set } = route.params;
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Team Names</Text>
      <TextInput
        style={styles.input}
        placeholder="Team 1"
        value={team1}
        onChangeText={setTeam1}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 2"
        value={team2}
        onChangeText={setTeam2}
      />
      <Button
        title="Start Game"
        onPress={() => navigation.navigate('GameScreen', { set, team1, team2, currentTeam: 'team1', score: { team1: 0, team2: 0 }, roundWords: [], roundScores: [], roundsPlayed: 0 })}
        disabled={!team1 || !team2}
      />
    </View>
  );
};

export default SelectTeamScreen;
