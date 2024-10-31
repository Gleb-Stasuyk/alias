import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import styles from './styles';

const CreateWordSetScreen = ({ navigation }) => {
  const [setTitle, setSetTitle] = useState('');
  const [words, setWords] = useState('');

  const cleanInput = (input) => {
    return input.replace(/[^a-zA-Zа-яА-Я\s,]/g, '');
  };

  const handleAddSet = async () => {
    const cleanSetTitle = cleanInput(setTitle);
    const cleanWords = cleanInput(words).split(/\s*,\s*/);

    const newSet = {
      id: cleanSetTitle.toLowerCase().replace(/\s+/g, '_'),
      title: cleanSetTitle,
      words: cleanWords,
    };

    try {
      const fileUri = FileSystem.documentDirectory + 'customSets.json';
      const fileExists = await FileSystem.getInfoAsync(fileUri);

      let wordSets = [];
      if (fileExists.exists) {
        const fileContents = await FileSystem.readAsStringAsync(fileUri);
        wordSets = JSON.parse(fileContents);
      }

      wordSets.push(newSet);
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(wordSets));

      Alert.alert("Success", "Word set added successfully!");

    } catch (error) {
      console.error('Error saving custom word set:', error);
      Alert.alert("Error", "Failed to add word set.");
    }

    setSetTitle('');
    setWords('');

    navigation.navigate('HomeScreen', { refresh: true });
  };

  const renderWordsInColumns = (words) => {
    const numColumns = Math.ceil(words.length / 10); // Adjust this number based on desired words per column
    const wordsPerColumn = Math.ceil(words.length / numColumns);
    const columns = [];

    for (let i = 0; i < numColumns; i++) {
      columns.push(words.slice(i * wordsPerColumn, (i + 1) * wordsPerColumn));
    }

    return columns.map((column, columnIndex) => (
      <View key={columnIndex} style={styles.previewColumn}>
        {column.map((word, wordIndex) => (
          <Text key={wordIndex} style={styles.previewWord}>
            {columnIndex * wordsPerColumn + wordIndex + 1}. {word}
          </Text>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Создать Набор Слов</Text>
      <TextInput
        style={styles.input}
        placeholder="Название темы"
        value={setTitle}
        onChangeText={setSetTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Список слов (разделенные запятыми)"
        value={words}
        onChangeText={setWords}
        multiline
      />
      <Button title="Добавить" onPress={handleAddSet} />
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Предварительный просмотр:</Text>
        <Text style={styles.previewSetTitle}>{setTitle}</Text>
        <View style={styles.previewWordsContainer}>
          {renderWordsInColumns(words.split(/\s*,\s*/))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CreateWordSetScreen;
