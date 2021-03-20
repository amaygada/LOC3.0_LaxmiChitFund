import 'react-native-gesture-handler';

//package imports 
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {Provider} from 'react-redux'
import Store from './src/redux/store.js'
import {persistor} from './src/redux/store.js'
import {PersistGate} from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//page imports
import CurvedHeader from './src/components/curved_header.js'
import Login from './src/details/login.js'
import Signup from './src/details/signup.js'
import Test from './src/test.js'
import Map from './src/map_test.js'
import Chat from './src/chat.js'

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  // Specify custom property
  dark: false,
};

export default class App extends React.Component{
  render(){
    return (
      <PaperProvider theme={theme}>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Test">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup}/>
                <Stack.Screen name="Test" component={Test}/>
                <Stack.Screen name="Map" component={Map}/>
                <Stack.Screen name="Chat" component={Chat}/>
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
        </PaperProvider>
    );
  }
}