import React from 'react';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useOvermind} from '@state';
import {Home, Login} from '@screens';

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();

export default function Navigation() {
  const {authorized} = useOvermind().state.User;

  return (
    <NavigationContainer>
      {authorized && <AppNavigator />}
      {!authorized && <AuthNavigator />}
    </NavigationContainer>
  )
}

function AppNavigator() {
  return (
    <AppStack.Navigator headerMode={'none'}>
      <AppStack.Screen name='Home' component={Home} />
    </AppStack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator headerMode={'none'}>
      <AuthStack.Screen name='Login' component={Login} />
    </AuthStack.Navigator >
  );
}