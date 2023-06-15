import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Favorite from './pages/Favorite';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/menu" component={Menu} />
      <Route exact path="/favorites" component={Favorite} />
    </Switch>
  );
}

export default App;
