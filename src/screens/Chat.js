import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Title, Subheading, TextInput, Button } from 'react-native-paper';
import SafeAreaView from 'react-native-safe-area-view';
import colors from '../config/colors';

const Chat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Chat</Text>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: colors.primary_dark,
  },
});
