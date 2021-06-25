import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {useOvermind} from '@state';
import {Loading} from '@screens';

function Home() {
    const {clockStatus, loading} = useOvermind().state.User;
    const {checkStatus, doClockEvent, logout} = useOvermind().actions.User;

    const onCheck = async () => {
        await checkStatus();
    }

    const onLogin = async () => {
        await doClockEvent();
    }

    return (
        <View style={styles.container}>
            {loading && <Loading />}
            {!loading && (
                <>
                    <Icon
                        name='heart'
                        type='octicon'
                        size={200}
                        style={styles.icon}
                        color={
                            clockStatus === 'unknown'
                                ? 'black'
                                : clockStatus === 'in' ?
                                    'green'
                                    : 'pink'
                        }
                    />
                    <View style={styles.bottom}>
                        <Text style={styles.status}>
                            {clockStatus === 'unknown'
                                ? 'Ping Karen to Get Status'
                                : clockStatus === 'in' ?
                                    'Currently Clocked In'
                                    : 'Currently Clocked Out'}
                        </Text>
                        <Button
                            style={styles.button}
                            mode='contained'
                            color="#fff"
                            onPress={onCheck}
                        >
                            CHECK STATUS
                        </Button>
                        {clockStatus !== 'unknown' &&
                            <Button
                                style={styles.button}
                                mode="contained"
                                color='#fff'
                                onPress={onLogin}
                            >
                                {clockStatus === 'in' ? "CLOCK OUT" : "CLOCK IN"}
                            </Button>
                        }
                        <Button
                            style={styles.button}
                            onPress={() => logout()}
                        >
                            Exit
                        </Button>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        padding: 10

    },
    icon: {
        margin: 20
    },
    bottom: {
        alignItems: 'center',
        width: '100%'
    },
    button: {
        width: '65%',
        margin: 10
    },
    status: {
        textAlign: 'center',
        fontSize: 27,
        marginBottom: 30
    }
});

export default Home;
