import {Redirect , Route} from 'react-router-dom';
import decode from 'jwt-decode';


function isAuthenticated(){
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        decode(token);
        decode(refreshToken);
    } catch (error) {
        
        return false;
    }    
    return true;
}

function PrivateRoute({component : Component , ...rest}) {
    const user = isAuthenticated();
    return (
      <Route
        {...rest}
        render = {
          (props) =>
            !user ? <Redirect to = '/login' /> : <Component {...props} />
        }
       />
    )
}

  export default PrivateRoute;