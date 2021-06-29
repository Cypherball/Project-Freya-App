import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Text, Title, Subheading, TextInput, Button } from 'react-native-paper';
import Toast, { DURATION } from 'react-native-easy-toast';
import colors from '../../config/colors';
import validator from 'validator';
import SafeAreaView from 'react-native-safe-area-view';
import { useMutation } from '@apollo/client';
import { setAuthToken } from '../../utility/Auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useFirstRender from '../../utility/useFirstRender';
import { SIGN_UP } from '../../graphql/requests';

function SignIn(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confPasswordError, setConfPasswordError] = useState('');
  const [disableSignUp, setDisableSignUp] = useState(false);
  const [hidePass, setHidePass] = useState(true);
  const toast = useRef(null);

  const firstRender = useFirstRender();

  const [signUp, { loading }] = useMutation(SIGN_UP, {
    onCompleted: data => onSignUpComplete(data),
    onError: err => onSignUpError(err),
  });

  const validateName = _name => {
    if (!_name) setNameError('Please enter a name');
    else if (!validator.isAlpha(_name, ['en-US'], { ignore: '.- ' }))
      setNameError('Name can only contain alphabets, dots and dashes');
    else if (_name.length < 3)
      setNameError('Name should be at least 3 characters');
    else {
      setNameError('');
      return true;
    }
    return false;
  };

  const validateEmail = _email => {
    // Validate Name
    if (!_email) setEmailError('Please enter an email');
    else if (!validator.isEmail(_email)) setEmailError('Email is not valid');
    else {
      setEmailError('');
      return true;
    }
    return false;
  };

  const validatePassword = _pass => {
    if (confPassword)
      if (!validator.equals(_pass, confPassword))
        setConfPasswordError('Passwords do not match');
      else setConfPasswordError('');
    if (!_pass) setPasswordError('Please enter a password');
    else if (_pass.includes(' '))
      setPasswordError('Password cannot contain spaces');
    else if (
      !validator.isStrongPassword(_pass, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        returnScore: false,
      })
    )
      setPasswordError(
        'Password must be minimum 8 characters with at least 1 Upper & Lowercase Letters and 1 Number',
      );
    else {
      setPasswordError('');
      return true;
    }
    return false;
  };

  const validateConfPassword = _confPass => {
    // Validate Name
    if (!_confPass) setConfPasswordError('Please re-enter the password');
    else if (!password) {
      setPasswordError('Please enter a password');
      setConfPasswordError('Passwords do not match');
    } else if (!validator.equals(_confPass, password))
      setConfPasswordError('Passwords do not match');
    else {
      setConfPasswordError('');
      return true;
    }
    return false;
  };

  const onChangeName = _name => {
    setName(_name);
    validateName(_name.trim());
  };

  const onChangeEmail = _email => {
    setEmail(_email);
    validateEmail(_email.trim());
  };

  const onChangePassword = _password => {
    setPassword(_password);
    validatePassword(_password);
  };

  const onChangeConfPassword = _password => {
    setConfPassword(_password);
    validateConfPassword(_password);
  };

  const validate = () => {
    const nameValid = validateName(name.trim());
    const emailValid = validateEmail(email.trim());
    const passwordValid = validatePassword(password);
    const confPasswordValid = validateConfPassword(confPassword);

    return nameValid && emailValid && passwordValid && confPasswordValid;
  };

  const onPressSignUp = () => {
    Keyboard.dismiss();
    if (validate())
      signUp({
        variables: {
          email: email.trim().toLowerCase(),
          password: password,
          name: name.trim(),
        },
      });
  };

  const onSignUpComplete = ({ signUp }) => {
    if (signUp) {
      console.log(`DATA ${JSON.stringify(signUp)}`);
      setAuthToken(signUp.token);
    }
  };

  const onSignUpError = err => {
    console.log(`ERROR ${JSON.stringify(err)}`);
    toast.current.show(err.message.replace('GraphQL error:', '').trim(), 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={styles.inner_container}>
        <Title style={styles.app_title}>InfatuNation</Title>
        <View style={styles.signup_container}>
          <Subheading style={styles.subheading}>SignUp</Subheading>
          <TextInput
            label="Full Name"
            mode="outlined"
            disabled={loading}
            error={nameError}
            value={name}
            maxLength={255}
            textContentType="name"
            keyboardType={'name-phone-pad'}
            keyboardAppearance="dark"
            onChangeText={onChangeName}
            style={{ margin: 5 }}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          <TextInput
            label="Email"
            mode="outlined"
            disabled={loading}
            error={emailError}
            value={email}
            maxLength={255}
            keyboardAppearance="dark"
            textContentType="emailAddress"
            keyboardType={'email-address'}
            onChangeText={onChangeEmail}
            style={{ margin: 5 }}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
          <TextInput
            label="Password"
            mode="outlined"
            passwordRules="minlength: 8; maxlength: 255; required: lower; required: upper; required: digit;"
            textContentType="newPassword"
            autoCorrect={false}
            autoCompleteType="off"
            disabled={loading}
            secureTextEntry
            maxLength={255}
            keyboardAppearance="dark"
            error={passwordError}
            value={password}
            onChangeText={onChangePassword}
            style={{ margin: 5 }}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
          <TextInput
            label="Confirm Password"
            mode="outlined"
            autoCorrect={false}
            autoCompleteType="off"
            disabled={loading}
            maxLength={255}
            secureTextEntry={hidePass}
            keyboardAppearance="dark"
            error={confPasswordError}
            right={
              <TextInput.Icon
                name={hidePass ? 'eye' : 'eye-off'}
                onPress={() => setHidePass(!hidePass)}
              />
            }
            value={confPassword}
            onChangeText={onChangeConfPassword}
            style={{ margin: 5 }}
          />
          {confPasswordError ? (
            <Text style={styles.errorText}>{confPasswordError}</Text>
          ) : null}

          <Button
            mode="contained"
            loading={loading}
            disabled={disableSignUp}
            style={styles.signup_button}
            labelStyle={styles.signup_label}
            onPress={onPressSignUp}>
            SIGN UP
          </Button>
          <Button
            mode="text"
            disabled={loading}
            labelStyle={styles.signin_label}
            onPress={() => {
              Keyboard.dismiss();
              props.navigation.navigate('SignIn');
            }}>
            Already have an account? Sign In!
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <Toast
        ref={toast}
        style={{
          backgroundColor: colors.error,
          width: '90%',
        }}
        position="bottom"
        positionValue={90}
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
    backgroundColor: colors.primary_dark,
  },
  inner_container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 20,
  },
  app_title: {
    fontSize: 40,
    padding: 20,
    color: colors.accent,
    marginTop: 30,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 25,
    padding: 20,
    color: colors.accent,
    textAlign: 'center',
  },
  signup_container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  signup_button: {
    margin: 15,
    minHeight: 40,
    justifyContent: 'center',
  },
  signup_label: {
    fontSize: 18,
  },
  signin_label: {
    fontSize: 12,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});

export default SignIn;
