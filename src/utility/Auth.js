import AsyncStorage from '@react-native-async-storage/async-storage';
import { isUserSignedIn } from '../config/app_cache';

export const getAuthToken = async () => {
  let token = '';
  try {
    token = await AsyncStorage.getItem('auth_token');
    console.log(`Auth Token: ${token}`);
    if (token) isUserSignedIn(true);
    else isUserSignedIn(false);
  } catch (err) {
    console.log(err);
    isUserSignedIn(false);
  }
  return token;
};

export const setAuthToken = async token => {
  try {
    await AsyncStorage.setItem('auth_token', token);
    isUserSignedIn(true);
  } catch (err) {
    console.log(err);
    isUserSignedIn(false);
    return false;
  }
  return true;
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('auth_token');
    isUserSignedIn(false);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};
