import React, { useState, useRef } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text, Title, Subheading, TextInput, Button } from 'react-native-paper';
import Toast, { DURATION } from 'react-native-easy-toast';
import colors from '../../config/colors';
import validator from 'validator';
import SafeAreaView from 'react-native-safe-area-view';
import { useMutation } from '@apollo/client';
import { setAuthToken } from '../../utility/Auth';
import { SIGN_IN } from '../../graphql/requests';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [disableSignIn, setDisableSignIn] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const toast = useRef(null);

  const [signIn, { loading }] = useMutation(SIGN_IN, {
    onCompleted: data => onSignInComplete(data),
    onError: err => onSignInError(err),
  });

  const onChangeEmail = _email => {
    setEmail(_email);
    setEmailError(false);
    if (_email.trim() && password.trim()) setDisableSignIn(false);
    else setDisableSignIn(true);
  };

  const onChangePassword = _password => {
    setPassword(_password);
    setPasswordError(false);
    if (email.trim() && _password.trim()) setDisableSignIn(false);
    else setDisableSignIn(true);
  };

  const onPressSignIn = () => {
    Keyboard.dismiss();
    const _email = email.trim().toLowerCase();
    const _password = password.trim();
    if (!_email || !_password) {
      setDisableSignIn(true);
      if (!_email) setEmailError(true);
      if (!_password) setPasswordError(true);
      toast.current.show('Please enter your Email and Password', 2000);
      return;
    }
    if (!validator.isEmail(_email)) {
      setDisableSignIn(true);
      setEmailError(true);
      toast.current.show('Invalid Email!', 2000);
      return;
    }

    signIn({ variables: { email: _email, password: _password } });
  };

  const onSignInComplete = ({ signIn }) => {
    if (signIn) {
      console.log(`DATA ${JSON.stringify(signIn)}`);
      setAuthToken(signIn.token);
    }
  };

  const onSignInError = err => {
    console.log(`ERROR ${JSON.stringify(err)}`);
    toast.current.show(err.message.replace('GraphQL error:', '').trim(), 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.app_title}>InfatuNation</Title>
      <View style={styles.signin_container}>
        <Subheading style={styles.subheading}>SignIn</Subheading>
        <TextInput
          label="Email"
          mode="outlined"
          textContentType="emailAddress"
          keyboardType={'email-address'}
          keyboardAppearance="dark"
          maxLength={255}
          error={emailError}
          value={email}
          onChangeText={onChangeEmail}
          style={{ width: '100%', margin: 5 }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          textContentType="password"
          secureTextEntry={hidePass}
          keyboardAppearance="dark"
          maxLength={255}
          error={passwordError}
          right={
            <TextInput.Icon
              name={hidePass ? 'eye' : 'eye-off'}
              onPress={() => setHidePass(!hidePass)}
            />
          }
          value={password}
          onChangeText={onChangePassword}
          style={{ width: '100%', margin: 5 }}
        />
        <Button
          mode="text"
          disabled={loading}
          labelStyle={styles.forgot_pass_label}
          onPress={() => {
            Keyboard.dismiss();
            console.log('Forgot Password Pressed');
          }}>
          Forgot Password?
        </Button>
        <Button
          mode="contained"
          loading={loading}
          disabled={disableSignIn}
          style={styles.signin_button}
          labelStyle={styles.signin_label}
          onPress={onPressSignIn}>
          SIGN IN
        </Button>
        <Text style={{ fontSize: 18 }}>OR</Text>
        <Button
          mode="contained"
          disabled={loading}
          style={styles.signin_button}
          labelStyle={styles.signin_label}
          onPress={() => {
            Keyboard.dismiss();
            props.navigation.navigate('SignUp');
          }}>
          SIGN UP
        </Button>
      </View>
      <Toast
        ref={toast}
        style={{ backgroundColor: colors.error }}
        position="bottom"
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={1}
        textStyle={{ color: colors.text }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primary_dark,
  },
  app_title: {
    fontSize: 40,
    padding: 20,
    color: colors.accent,
    marginTop: 30,
  },
  subheading: {
    fontSize: 25,
    padding: 20,
    color: colors.accent,
    //marginBottom: 20,
  },
  signin_container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signin_button: {
    margin: 15,
    width: '100%',
    minHeight: 40,
    justifyContent: 'center',
  },
  signin_label: {
    fontSize: 18,
  },
  forgot_pass_label: {
    fontSize: 12,
  },
});

export default SignIn;
