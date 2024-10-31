import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import SelectTeamScreen from './SelectTeamScreen';
import GameScreen from './GameScreen';
import RoundResultScreen from './RoundResultScreen';
import ScoreScreen from './ScoreScreen';
import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  const [settings, setSettings] = React.useState({
    penalizeForSkip: false,
    roundDuration: 60,
    victoryPoints: 10,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" options={{ title: 'Главная' }}>
          {(props) => <HomeScreen {...props} settings={settings} />}
        </Stack.Screen>
        <Stack.Screen name="SelectTeamScreen" component={SelectTeamScreen} options={{ title: 'Выбор Команды' }} />
        <Stack.Screen name="GameScreen">
          {(props) => <GameScreen {...props} settings={settings} initialParams={{ roundWords: [], roundsPlayed: 0, score: { team1: 0, team2: 0 } }} />}
        </Stack.Screen>
        <Stack.Screen name="RoundResultScreen">
          {(props) => <RoundResultScreen {...props} settings={settings} />}
        </Stack.Screen>
        <Stack.Screen name="ScoreScreen" component={ScoreScreen} options={{ title: 'Итоговый Счет' }} />
        <Stack.Screen name="SettingsScreen">
          {(props) => <SettingsScreen {...props} settings={settings} setSettings={setSettings} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
