import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider as OvermindProvider} from 'overmind-react';
import {Surface, DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createOvermind} from 'overmind';
import {config} from '@state';
import {Navigation} from 'navigation';
import {initialWindowMetrics, SafeAreaProvider} from 'react-native-safe-area-context';

declare const global: {HermesInternal: null | {}};

const overmind = createOvermind(config, {
  devtools: '192.168.0.136:3031',
  logProxies: true
})

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#18181F',
    accent: '#18181F',
    background: '#fff',
    backdrop: '#000',
    surface: '#000'
  }
}

function App() {

  return (
    <OvermindProvider value={overmind}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <Navigation />
        </SafeAreaProvider>
      </PaperProvider>
    </OvermindProvider>
  );
};


export default App;
