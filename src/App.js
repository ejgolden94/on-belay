import './App.css';
import React, {useState, useEffect} from 'react'
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import { Header, Container, Button } from 'semantic-ui-react';
//// Components
import UserForm from './components/UserForm'
import Routes from './components/Routes'
import ClimbRoute from './components/ClimbRoute'
import Climbs from './components/Climbs'
import Climb from './components/Climb'
import Footer from './components/Footer'
import ClimbForm from './components/ClimbForm';
import RouteForm from './components/RouteForm';


let baseURL = ''

if (process.env.NODE_ENV === 'development'){
  baseURL = process.env.REACT_APP_LOCAL_URL
} else {
  baseURL = process.env.REACT_APP_PROD_URL
}

function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [currentClimb, setCurrentClimb] = useState({})
  const [currentRoute, setCurrentRoute] = useState({})

  const getUsers = async() => {
    const url = baseURL+'/users/'
    const requestOptions = {
      method:'GET',
      credentials: 'include',
      mode: 'cors',
    }
    const users = await fetch(url,requestOptions).then(response => response.json())
    console.log(users);
  }

  useEffect(() => {
    // putting this function call inside of an anonymous function due to warning: "Effect callbacks are synchronous to prevent race conditions."
    getUsers()
  },[])

  console.log(currentUser);
  return (
    <div className="App" style={{margin:'0', padding: '0'}}>
      <BrowserRouter>
          <Switch>

            {/* /// User Login /// */}
            <Route path="/user/login">
              <UserForm context='login' baseURL={baseURL} setCurrentUser={setCurrentUser}/>
              <Footer />
            </Route>


            {/* /// User Sign Up /// */}
            <Route path="/user/new">
              <UserForm context='signup' baseURL={baseURL} setCurrentUser={setCurrentUser}/>
              <Footer />
            </Route>

            {/* /// Create Route /// */}
            <Route 
              path="/routes/new"
              render={(props) => <RouteForm {...props} baseURL={baseURL} currentUser={currentUser}/>}
            />

            {/* /// Edit Route /// */}
            <Route 
              path="/routes/:routeId/edit"
              render={(props) => <RouteForm {...props} baseURL={baseURL} climb={currentRoute.data}/>}
            />

            {/* /// Show Route /// */}
            <Route path="/routes/:routeId">
              <ClimbRoute baseURL={baseURL} setCurrentRoute={setCurrentRoute}/>
              <Footer />
            </Route>

            {/* /// Routes /// */}
            <Route path="/routes">
              <Routes baseURL={baseURL}/>
              <Footer />
            </Route>

            {/* /// Create Climb /// */}
            <Route 
              path="/climbs/new"
              render={(props) => <ClimbForm {...props} baseURL={baseURL} currentUser={currentUser}/>}
            />

            {/* /// Edit Climb /// */}
            <Route 
              path="/climbs/:climbId/edit"
              render={(props) => <ClimbForm {...props} baseURL={baseURL} climb={currentClimb.data}/>}
            />

            {/* /// Show Climb /// */}
            <Route path="/climbs/:climbId">
              <Climb baseURL={baseURL} setCurrentClimb={setCurrentClimb}/>
              <footer>
                <Footer />
              </footer>
            </Route>

            {/* /// Climbs /// */}
            <Route path="/climbs">
              <Climbs baseURL={baseURL}/>
              <footer>
                <Footer />
              </footer>
            </Route>

            {/* /// HOME PAGE /// *** this must be the last route because its the least specific */}
            <Route path="/">
              {/* if current user is not logged in this will redirect you to user login */}
              {!currentUser? <Redirect to='/user/login'/> : 
              <>
              <Container style={{ height:'90vh'}}>
                <Header style={{paddingTop: '30vh'}}> Welcome, {currentUser.username} </Header>
                <Button as={Link} to='/routes'>See Routes</Button>
              </Container>
              <footer>
                <Footer style={{margin:'0', padding: '0'}}/>
              </footer>
              </>
              }
            </Route>


          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
