import * as React from 'react';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../config/colors';
import Discover from './Discover';
import Matches from './Matches';
import Profile from './Profile';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      labeled={false}
      initialRouteName="Discover"
      backBehavior="initialRoute"
      activeColor={colors.white}
      inactiveColor={colors.surface}
      shifting={true}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: colors.accent,
        backgroundColor: colors.surface,
        showLabel: false,
        style: styles.barStyle,
      }}>
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover'.toUpperCase(),
          tabBarIcon: ({ color, size }) => {
            return <Icon name="search" size={22} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Matches"
        component={Matches}
        options={{
          tabBarLabel: 'Matches'.toUpperCase(),
          tabBarIcon: ({ color, size }) => {
            return <Icon name="heart" size={22} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile'.toUpperCase(),
          tabBarIcon: ({ color, size }) => {
            return <Icon name="user" size={22} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    //paddingBottom: 5,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default HomeTabs;
