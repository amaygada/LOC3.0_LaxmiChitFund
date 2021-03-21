import { Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import PlanScreen from './screens/PlanScreen';
import CityScreen from './screens/CityScreen';
import HotelsScreen from './screens/HotelsScreen';
import LandmarksScreen from './screens/LandmarksScreen';
import FormScreen from './screens/FormScreen';
import HotelScreen from './screens/HotelScreen';
import LandmarkScreen from './screens/LandmarkScreen';
import ItenaryScreen from './screens/ItenaryScreen';
import ExpenseScreen from './screens/ExpenseScreen';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route component={LoginScreen} path="/login" />
        <Route component={SignupScreen} path="/register" />
        <Route component={HomeScreen} path="/" exact />
        <Route component={Dashboard} path="/dashboard" />
        <Route component={PlanScreen} path="/plantrip" />
        <Route component={CityScreen} path="/city" />
        <Route component={HotelsScreen} path="/hotels" />
        <Route component={LandmarksScreen} path="/landmarks" />
        <Route component={FormScreen} path="/planform" />
        <Route component={HotelScreen} path="/hotel" />
        <Route component={LandmarkScreen} path="/landmark" />
        <Route component={ItenaryScreen} path="/itinerary" />
        <Route component={ExpenseScreen} path="/expenses" />
      </Switch>
    </div>
  );
}

export default App;
