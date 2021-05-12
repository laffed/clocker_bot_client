import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, ColorSchemeName} from 'react-native';
import {useOvermind} from '../overmind';

export default function Navigation() {
  const GlobalState = useOvermind().state.Example;

  return (
    <NavigationContainer>
      {/* Add conditional from global state to render either auth or app stack */}
    </NavigationContainer>
  )
}

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

// function AppNavigator() {
//   <AppStack.Navigator>

//   </AppStack.Navigator>
// }

// function AuthNavigator() {
//   <AuthStack.Navigator>

//   </AuthStack.Navigator>
// }