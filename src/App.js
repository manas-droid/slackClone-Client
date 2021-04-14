import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
function App() {
 return (
  <Router>
    <Switch>
        <Route path='/' exact component={Home}/> 
    </Switch>
    <Switch>
        <Route path='/register' exact component={Register}/> 
    </Switch>
  </Router>  
  );
}

export default App;
