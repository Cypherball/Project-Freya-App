import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Title, Subheading, TextInput, Button } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import colors from '../config/colors';
import { logout } from '../utility/Auth';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title>Profile</Title>
      <Button
        icon="logout-variant"
        mode="contained"
        style={{
          alignSelf: 'flex-end',
          width: '35%',
        }}
        onPress={() => logout()}>
        SignOut
      </Button>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: colors.primary_dark,
  },
});
