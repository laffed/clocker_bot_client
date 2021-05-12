import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Modal, Button} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
// import Navigation from './navigation';
import {Provider} from 'overmind-react';
import {createOvermind} from 'overmind';
import {config} from './overmind';
import Spinner from 'react-native-spinner';

declare const global: {HermesInternal: null | {}};

const overmind = createOvermind(config, {
  devtools: '192.168.0.136:3031'
})

const App = () => {
  const [modalVis, setModalVis] = React.useState(false);

  return (
    <Provider value={overmind}>
      <SafeAreaView style={{backgroundColor: '#0967ea', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Text>Test</Text>
        <Modal
          visible={modalVis}
          transparent={true}
        >
          <View
            style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}
          >
            <Spinner size={100} type='FadingCircle' color='#ffffff' isVisible={true} />
            <Button title='inModal' onPress={() => setModalVis(!modalVis)}>Click</Button>
          </View>
        </Modal>
        <Button title='modal' onPress={() => setModalVis(!modalVis)}>Click</Button>
        {/* <Navigation /> */}
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
