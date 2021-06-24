import React, {useState, useCallback, useRef} from 'react';
import {Animated, Easing, StyleSheet, View, Text} from 'react-native';
import {useFocusEffect} from '@react-navigation/core';
import LottieView from 'lottie-react-native';
import rocket from '../assets/lottie_rocket.json';
import {useOvermind} from '@state';

function Loading() {
	const {loadingMsg} = useOvermind().state.User;
	const lottieRef = useRef<LottieView>(null);

	useFocusEffect(
		useCallback(() => {
			lottieRef?.current?.play();
		}, [lottieRef])
	)

	return (
		<View style={styles.container}>
			<LottieView
				style={styles.lottie}
				source={rocket}
				ref={lottieRef}
			/>
			<Text style={styles.msg}>{loadingMsg}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignContent: 'flex-start',
		textAlign: 'center'
	},
	msg: {
		fontSize: 28,
		fontWeight: 'bold',
		margin: 0,
		alignSelf: 'center'
	},
	lottie: {
		width: '80%',
		alignSelf: 'center',
	}
})

export default Loading;
