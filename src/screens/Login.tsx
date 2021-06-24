import React, {useState} from 'react'
import {View, Text, StyleSheet, Image, useWindowDimensions, TextInput, Button} from 'react-native';
import {useOvermind} from '@state';
import {ENV} from '../env';
import robot from '../assets/robot.png';
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {LoginFormValues} from '../types';
import {loginResolver} from '../formValidation';

function Login() {
  const {loginFirebase} = useOvermind().actions.User;
  const [error, setError] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormValues>({resolver: loginResolver});
  const {width} = useWindowDimensions();

  const onLogin: SubmitHandler<LoginFormValues> = async (data) => {
    let res = await loginFirebase({email: data.email, pw: data.password});
    if (res === false) {
      setError('Wrong credentials');
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image
          source={robot}
          style={[styles.image, {width, resizeMode: 'contain'}]}
        />
      </View>
      <Text>{error}</Text>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
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
              style={styles.inputBox}
              placeholder={"Enter your email address"}
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
              secureTextEntry={true}
              style={styles.inputBox}
              placeholder={"Enter your password"}
              keyboardType="default"
              returnKeyType="send"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
        />
        <Button
          title="SIGN IN"
          onPress={handleSubmit(onLogin)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  image: {
    marginTop: 60,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
    width: 200,
    textAlign: "left",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  containerButton: {
    marginTop: 20,
    marginLeft: 0,
    width: "100%",
  },
  buttonStyle: {
    height: 50,
  },
  loginButton: {
    width: 250,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
});

export default Login;