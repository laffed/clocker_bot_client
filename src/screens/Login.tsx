import React, {useEffect} from 'react'
import {View, Text} from 'react-native';
import {useOvermind} from '@state';

function Login() {
  const {loginFirebase} = useOvermind().actions.User;

  const mount = async () => {
    let res = await loginFirebase({email: 'roarklaffed@gmail.com', pw: 'ronaldo7'});
    console.log(res);
  }
  useEffect(() => {
    mount();
  }, [])

  return (
    <View>
      <Text>Login</Text>
    </View>
  );
}

export default Login;