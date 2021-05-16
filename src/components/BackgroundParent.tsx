import React, {ReactChildren, ReactNode} from 'react'
import {StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

type Props = {
  children: ReactNode
}

function BackgroundParent({children}: Props) {

  return (
    <LinearGradient
      colors={['purple', 'white']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackgroundParent;