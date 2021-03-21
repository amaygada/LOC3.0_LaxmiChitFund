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
import Hotels from './src/Screens/PlanNew/hotel_list';
import Settings from './src/Screens/settings';
import IndivisualLandmark from './src/Screens/PlanNew/IndivisualLandmark.js';
import Navigate from './src/Screens/navigate.js';
import Loader from './src/components/loader.js';
import Expense from './src/Screens/expense';
import AddExpense from './src/Screens/add_expense';
import IndivisualHotel from './src/Screens/PlanNew/IndivisualHotel';
import AddLandmarkIten from './src/Screens/PlanNew/add_landmark_iten'
import AddHotelIten from './src/Screens/PlanNew/add_hotel_iten'
import Splash from './src/Screens/Splash/splash'
import FP from './src/Screens/PlanNew/final_pg'
import Emergency from './src/Screens/PlanNew/emergency'
import MI from './src/Screens/my_itens'
import Midd from './src/Screens/midd.js'
import Itinerary from './src/Screens/Itinerary.js';

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
                initialRouteName="Splash">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Nav" component={Navigate} />
                <Stack.Screen name="Loading" component={Loader} />
                <Stack.Screen name="Add Expense" component={AddExpense} />
                <Stack.Screen name="Test" component={Test} />
                <Stack.Screen name="Select Country" component={chooseCountry} />
                <Stack.Screen name="Chat" component={Chat} />
                <Stack.Screen name="Opt" component={Options} />
                <Stack.Screen name="ALI" component={AddLandmarkIten} />
                <Stack.Screen name="City List" component={CityList} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="Landmark" component={Landmarks} />
                <Stack.Screen name="Extra" component={Extra} />
                <Stack.Screen name="AHI" component={AddHotelIten} />
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="FP" component={FP} />
                <Stack.Screen name="MI" component={MI} />
                <Stack.Screen name = "M" component={Midd}/>
                <Stack.Screen
                  name="Indivisual City"
                  component={IndivisualCity}
                />
                <Stack.Screen name="EM" component={Emergency} />
                <Stack.Screen name="Hotel" component={Hotels} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen
                  name="Indivisual Landmark"
                  component={IndivisualLandmark}
                />
                <Stack.Screen name="Expense" component={Expense} />
                <Stack.Screen name="Itinerary" component={Itinerary} />
                <Stack.Screen
                  name="Indivisual Hotel"
                  component={IndivisualHotel}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </PaperProvider>
    );
  }
}
