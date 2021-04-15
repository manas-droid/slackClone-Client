import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
 return (
  <Router>
    <Switch>
        <Route path='/' exact component={Home}/> 
    </Switch>
    <Switch>
        <Route path='/register' exact component={Register}/> 
    </Switch>
    <Switch>
        <Route path='/login' exact component={Login}/> 
    </Switch>
  </Router>  
  );
}

export default App;
