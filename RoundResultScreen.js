import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Switch } from 'react-native';
import styles from './styles';
import { calculateRoundScore, calculateTotalScore } from './scoreUtils';

const RoundResultScreen = ({ route, navigation, settings }) => {
  const { set, team1, team2, currentTeam, score, roundWords, roundScores, roundsPlayed, roundScore } = route.params;
  const [updatedRoundWords, setUpdatedRoundWords] = useState(roundWords);
  const [updatedRoundScores, setUpdatedRoundScores] = useState(roundScores);
  const [updatedRoundScore, setUpdatedRoundScore] = useState(roundScore);
  const [updatedTotalScore, setUpdatedTotalScore] = useState({
    ...score,
    [currentTeam]: (score[currentTeam] || 0) + roundScore,
  });

  useEffect(() => {
    const newRoundScore = calculateRoundScore(updatedRoundScores);
    setUpdatedRoundScore(newRoundScore);

    const newTotalScore = {
      ...updatedTotalScore,
      [currentTeam]: (score[currentTeam] || 0) + newRoundScore,
    };
    setUpdatedTotalScore(newTotalScore);
  }, [updatedRoundScores]);

  const nextTeam = currentTeam === 'team1' ? 'team2' : 'team1';

  const handleToggle = (index) => {
    const newRoundWords = [...updatedRoundWords];
    const newScores = [...updatedRoundScores];
    const newScoreValue = newRoundWords[index].guessed ? 0 : 1;

    newRoundWords[index].guessed = !newRoundWords[index].guessed;
    newScores[index] = newRoundWords[index].guessed ? 1 : (settings.penalizeForSkip ? -1 : 0);

    setUpdatedRoundWords(newRoundWords);
    setUpdatedRoundScores(newScores);
  };

  const startNextRound = () => {
    navigation.navigate('GameScreen', {
      set,
      team1,
      team2,
      currentTeam: nextTeam,
      score: updatedTotalScore,
      roundWords: [],
      roundsPlayed,
    });
  };

  const finishGame = () => {
    navigation.navigate('ScoreScreen', {
      score: updatedTotalScore,
      team1,
      team2,
      roundsPlayed,
    });
  };

  const isGameOver = updatedTotalScore.team1 >= settings.victoryPoints || updatedTotalScore.team2 >= settings.victoryPoints;
  const team2HasMoreRounds = roundsPlayed % 2 !== 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Результаты Раунда</Text>
      <FlatList
        data={updatedRoundWords}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.roundResultScreenWordItem}>
            <Text style={styles.roundResultScreenWordText}>{item.word}</Text>
            <Switch
              value={item.guessed}
              onValueChange={() => handleToggle(index)}
            />
          </View>
        )}
      />
      <Text style={styles.roundResultScreenScore}>Счет за раунд: {updatedRoundScore}</Text>
      <Text style={styles.roundResultScreenScore}>Общий счет команды {currentTeam === 'team1' ? team1 : team2}: {updatedTotalScore[currentTeam]}</Text>
      {isGameOver && !team2HasMoreRounds ? (
        <Button title="Завершить Игру" onPress={finishGame} />
      ) : (
        <Button title="Начать Следующий Раунд" onPress={startNextRound} />
      )}
    </View>
  );
};

export default RoundResultScreen;
