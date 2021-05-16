import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Modal, Button} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'overmind-react';
import {createOvermind} from 'overmind';
import {config} from '@state';
import {BackgroundParent} from '@components';
import {Navigation} from 'navigation';

declare const global: {HermesInternal: null | {}};

const overmind = createOvermind(config, {
  devtools: '192.168.0.136:3031'
})

const App = () => {

  return (
    <Provider value={overmind}>
      <BackgroundParent>
        {Navigation}
      </BackgroundParent>
    </Provider>
  );
};


export default App;
