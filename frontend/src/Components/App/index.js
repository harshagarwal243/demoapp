import React from 'react';
import Navigation from '../Navigation';
import { BrowserRouter as Router , Route , Redirect , Switch} from 'react-router-dom'
import SignIn from '../SignIn'
import PrivateRoute from './PrivateRoute'
import SignUp from '../SignUp'
import Account from '../Account'

const App = () => {
    return (<Router>
              <Navigation />
              <Switch>
              <Route path="/signin" component ={SignIn} />
              <Route path = "/signup" component={SignUp}/>
              <PrivateRoute path="/account"  component={Account} />
              <Redirect to="/signin" from ="/" />
              </Switch>
           </Router>)
}

export default App ;