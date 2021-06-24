import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
import {useOvermind} from '@state';
import {useFocusEffect} from '@react-navigation/native';

function Home() {
    const {clockStatus} = useOvermind().state.User;
    const {checkStatus, doClockEvent} = useOvermind().actions.User;
    const [loading, setLoading] = useState(true);

    const onCheck = async () => {
        setLoading(true);
        await checkStatus();
        setLoading(false);
    }

    const onLogin = async () => {
        setLoading(true);
        await doClockEvent();
        setLoading(false);
    }

    const onMount = async () => {
        await onCheck();
    }

    useFocusEffect(
        useCallback(() => {
            onMount();
        }, [])
    );

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size='large' />}
            <Text style={styles.status}>
                {loading ? '' : clockStatus ? 'Currently Clocked In' : 'Currently Clocked Out'}
            </Text>
            <Button
                title="CHECK STATUS"
                onPress={onCheck}
            />
            <Button
                title={clockStatus ? "CLOCK OUT" : "CLOCK IN"}
                onPress={onLogin}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    status: {
        fontSize: 30,
        marginBottom: 20
    }
});

export default Home;
