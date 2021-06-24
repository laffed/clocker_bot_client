import React, {useState} from 'react'
import {View, Text, StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useOvermind} from '@state';
import {Loading} from '@screens';
import {ENV} from '../env';
import robot from '../assets/robot_bw.png';
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {LoginFormValues} from '../types';
import {loginResolver} from '../formValidation';

function Login() {
  const {login} = useOvermind().actions.User;
  const {loading} = useOvermind().state.User;
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormValues>({resolver: loginResolver});
  const {width} = useWindowDimensions();

  const onLogin: SubmitHandler<LoginFormValues> = async (data) => {
    let res = await login({user: data.email, pw: data.password});
    if (res === false) {
      setError('Oops! Prolly need to update your cnc pw');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {width}]}
    >
      {loading && <Loading />}
      {!loading && (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.img_container}>
              <Image
                source={robot}
                style={[styles.image]}
              />

            </View>
            <Text>{error}</Text>
            <View style={styles.formContainer}>
              <Controller
                control={control}
                name="email"
                defaultValue=""
                render={({
                  field: {onChange, onBlur, value, name},
                  fieldState: {invalid, isTouched, isDirty, error},
                  formState
                }) => (
                  <TextInput
                    mode='outlined'
                    style={styles.inputBox}
                    label='username'
                    placeholder={"username"}
                    keyboardType="email-address"
                    returnKeyType="next"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({
                  field: {onChange, onBlur, value, name},
                  fieldState: {invalid, isTouched, isDirty, error},
                  formState
                }) => (
                  <TextInput
                    mode='outlined'
                    secureTextEntry={true}
                    style={styles.inputBox}
                    label='password'
                    placeholder={"password"}
                    keyboardType="default"
                    returnKeyType="send"
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                  />
                )}
              />
            </View>
            <Button
              onPress={handleSubmit(onLogin)}
              mode='contained'
              color="#fff"
              style={styles.buttonContainer}
            >
              SIGN IN
            </Button>
          </View>
        </TouchableWithoutFeedback>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  inner: {
    width: '100%',
    height: '100%',
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  img_container: {
    flex: .3,
    margin: 7,
    justifyContent: 'flex-end'
  },
  image: {
    height: '70%',
    resizeMode: 'contain'
  },
  formContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  inputBox: {
    width: '70%',
    textAlign: "left",
    margin: 7
  },
  buttonContainer: {
    borderColor: '#fff',
    width: '45%',
    margin: 20
  },
  button: {
    fontWeight: 'bold',
  },
  loginButton: {
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
});

export default Login;