import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Title, Subheading, TextInput, Button } from 'react-native-paper';
import colors from '../../config/colors';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      disableSignIn: true,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.app_title}>InfatuNation</Title>
        <View style={styles.signin_container}>
          <Subheading style={styles.subheading}>SignUp</Subheading>
          <TextInput
            label="Name"
            mode="outlined"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            style={{ width: '100%', margin: 5 }}
          />
          <TextInput
            label="Email"
            mode="outlined"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={{ width: '100%', margin: 5 }}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={{ width: '100%', margin: 5 }}
          />
          <Button
            mode="contained"
            disabled={this.state.disableSignIn}
            style={styles.signin_button}
            labelStyle={styles.signin_label}
            onPress={() => console.log('Pressed')}>
            SIGN UP
          </Button>
          <Button
            mode="text"
            labelStyle={styles.forgot_pass_label}
            onPress={() => this.props.navigation.navigate('SignIn')}>
            Already have an account? Sign In!
          </Button>
        </View>
      </View>
    );
  }
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

export default SignUp;
