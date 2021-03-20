import { Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import Dashboard from './screens/Dashboard';
import PlanScreen from './screens/PlanScreen';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route component={LoginScreen} path="/login" />
        <Route component={SignupScreen} path="/register" />
        <Route component={HomeScreen} path="/" exact />
        <Route component={Dashboard} path="/dashboard" />
        <Route component={PlanScreen} path="/plantrip" />
      </Switch>
    </div>
  );
}

export default App;
