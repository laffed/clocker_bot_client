import React from 'react';
import {Provider} from 'overmind-react';
import {createOvermind} from 'overmind';
import {config} from '@state';
import {Navigation} from 'navigation';
import {initialWindowMetrics, SafeAreaProvider} from 'react-native-safe-area-context';

declare const global: {HermesInternal: null | {}};

const overmind = createOvermind(config, {
  devtools: '192.168.0.136:3031',
  logProxies: true
})

function App() {

  return (
    <Provider value={overmind}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
};


export default App;
