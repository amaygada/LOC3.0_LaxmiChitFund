import 'react-native-gesture-handler';

//package imports
import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import Store from './src/redux/store.js';
import {persistor} from './src/redux/store.js';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//page imports
import Login from './src/details/login.js';
import Signup from './src/details/signup.js';
import Test from './src/test.js';
import Chat from './src/chat.js';
import chooseCountry from './src/Screens/PlanNew/chooseCountry.js';
import Options from './src/Screens/options';
import CityList from './src/Screens/PlanNew/CityList';
import Map from './src/map_test';
import Landmarks from './src/Screens/PlanNew/landmark_list';
import Extra from './src/Screens/PlanNew/extra_deets';
import IndivisualCity from './src/Screens/PlanNew/IndivisualCity';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  // Specify custom property
  dark: false,
};

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{headerShown: false}}
                initialRouteName="Test">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Test" component={Test} />
                <Stack.Screen name="Select Country" component={chooseCountry} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="Opt" component={Options} />
                <Stack.Screen name="City List" component={CityList} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="Landmark" component={Landmarks} />
                <Stack.Screen name="Extra" component={Extra} />
                <Stack.Screen
                  name="Indivisual City"
                  component={IndivisualCity}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </PaperProvider>
    );
  }
}
