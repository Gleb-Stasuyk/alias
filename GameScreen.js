import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import styles from './styles';
import wordSets from './wordSets';
import { calculateRoundScore } from './scoreUtils';

const GameScreen = ({ navigation, route, settings }) => {
  const { set, team1, team2, currentTeam, score, roundsPlayed } = route.params;
  const words = wordSets[set];
  const [currentWord, setCurrentWord] = useState('');
  const [timeLeft, setTimeLeft] = useState(settings.roundDuration);
  const [roundScore, setRoundScore] = useState(0);
  const [currentRoundWords, setCurrentRoundWords] = useState([]);
  const [roundScores, setRoundScores] = useState([]);

  useEffect(() => {
    setNewWord();
    setTimeLeft(settings.roundDuration);
    setCurrentRoundWords([]);
    setRoundScores([]);
  }, [currentTeam]);

  useEffect(() => {
    if (timeLeft === 0) {
      const nextTeam = currentTeam === 'team1' ? 'team2' : 'team1';
      const updatedRoundsPlayed = roundsPlayed + 1;
      const finalRoundScore = calculateRoundScore(roundScores);
      navigation.navigate('RoundResultScreen', {
        set,
        team1,
        team2,
        currentTeam,
        score,
        roundWords: currentRoundWords,
        roundScores,
        roundsPlayed: updatedRoundsPlayed,
        roundScore: finalRoundScore,
      });
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const setNewWord = () => {
    let newWord;
    do {
      newWord = words[Math.floor(Math.random() * words.length)];
    } while (newWord === currentWord);
    setCurrentWord(newWord);
  };

  const handleGuess = (guessedCorrectly) => {
    const newScore = guessedCorrectly ? 1 : (settings.penalizeForSkip ? -1 : 0);
    setRoundScore(roundScore + newScore);
    setRoundScores([...roundScores, newScore]);
    setCurrentRoundWords([...currentRoundWords, { word: currentWord, guessed: guessedCorrectly }]);
    setNewWord();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameScreenWord}>{currentWord}</Text>
      <Text style={styles.gameScreenTimer}>{timeLeft} секунд</Text>
      <Text style={styles.gameScreenTeam}>Текущая команда: {currentTeam === 'team1' ? team1 : team2}</Text>
      <View style={styles.gameScreenButtonContainer}>
        <Button title="Угадал" onPress={() => handleGuess(true)} />
        <Button title="Не угадал" onPress={() => handleGuess(false)} />
      </View>
    </View>
  );
};

export default GameScreen;
