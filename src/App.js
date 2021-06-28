import React, { useEffect } from 'react';
import AppScreens from './router/AppScreens';
import { StatusBar } from 'react-native';
import colors from './config/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import { getAuthToken } from './utility/Auth';
import client from './config/client';

const theme = {
  ...PaperDarkTheme,
  dark: true,
  mode: 'adaptive',
  colors: {
    ...PaperDarkTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.primary_dark,
    surface: colors.surface,
    text: colors.text,
  },
};

const App = () => {
  useEffect(() => {
    getAuthToken();
  }, []);

  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.primary_dark}
          />
          <AppScreens />
        </SafeAreaProvider>
      </PaperProvider>
    </ApolloProvider>
  );
};

export default App;
