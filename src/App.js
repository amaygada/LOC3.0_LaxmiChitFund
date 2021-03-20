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
      </Switch>
    </div>
  );
}

export default App;
