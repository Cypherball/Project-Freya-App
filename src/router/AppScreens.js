import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { useReactiveVar } from '@apollo/client';

import { isUserSignedIn } from '../config/app_cache';
import SignIn from '../screens/Auth/SignIn';
import SignUp from '../screens/Auth/Signup';
import HomeTabs from '../screens/Home';

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const AppScreens = () => {
  const isAuth = useReactiveVar(isUserSignedIn);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuth ? 'Home' : 'SignIn'}
        headerMode="none">
        {isAuth ? (
          <>
            <Stack.Screen name="Home" component={HomeTabs} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppScreens;
