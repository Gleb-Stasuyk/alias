import React from 'react';
import { View, Text, Switch, Button, TextInput } from 'react-native';
import styles from './styles';

const SettingsScreen = ({ navigation, settings, setSettings }) => {
  const [penalizeForSkip, setPenalizeForSkip] = React.useState(settings.penalizeForSkip);
  const [roundDuration, setRoundDuration] = React.useState(settings.roundDuration.toString());
  const [victoryPoints, setVictoryPoints] = React.useState(settings.victoryPoints.toString());

  const saveSettings = () => {
    setSettings({ 
      ...settings, 
      penalizeForSkip, 
      roundDuration: parseInt(roundDuration, 10), 
      victoryPoints: parseInt(victoryPoints, 10) 
    });
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={[styles.container, styles.settingsScreenContainer]}>
      <Text style={[styles.title, styles.settingsScreenTitle]}>Настройки</Text>
      <View style={styles.settingsScreenSettingItem}>
        <Text style={styles.settingsScreenSettingText}>Снимать балл за пропуск слова</Text>
        <Switch
          value={penalizeForSkip}
          onValueChange={setPenalizeForSkip}
        />
      </View>
      <View style={styles.settingsScreenSettingItem}>
        <Text style={styles.settingsScreenSettingText}>Продолжительность раунда (сек)</Text>
        <TextInput
          style={styles.settingsScreenTextInput}
          keyboardType="numeric"
          value={roundDuration}
          onChangeText={setRoundDuration}
        />
      </View>
      <View style={styles.settingsScreenSettingItem}>
        <Text style={styles.settingsScreenSettingText}>Количество очков для победы</Text>
        <TextInput
          style={styles.settingsScreenTextInput}
          keyboardType="numeric"
          value={victoryPoints}
          onChangeText={setVictoryPoints}
        />
      </View>
      <Button title="Сохранить" onPress={saveSettings} />
    </View>
  );
};

export default SettingsScreen;
