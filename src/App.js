import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//// Components
import UserForm from './components/UserForm'
import Routes from './components/Routes'
import ClimbRoute from './components/ClimbRoute'
import Climbs from './components/Climbs'
import Climb from './components/Climb'
import ClimbForm from './components/ClimbForm';
import RouteForm from './components/RouteForm';
import ClimbType from './components/ClimbType';
import HomePage from './components/HomePage';


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
  const [climbSetting, setClimbSetting] = useState('Outdoor')
  const [indoorRouteId, setIndoorRouteId] = useState('')

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

  return (
    <div className="App" style={{margin:'0', padding: '0'}}>
      <BrowserRouter>
          <Switch>

            {/* /// User Login /// */}
            <Route path="/user/login">
              <UserForm context='login' baseURL={baseURL} setCurrentUser={setCurrentUser}/>
            </Route>


            {/* /// User Sign Up /// */}
            <Route path="/user/new">
              <UserForm context='signup' baseURL={baseURL} setCurrentUser={setCurrentUser}/>
            </Route>

            {/* /// Create Route /// */}
            <Route 
              path="/routes/new"
              render={(props) => <RouteForm {...props} baseURL={baseURL} currentUser={currentUser} climbSetting={climbSetting} setIndoorRouteId={setIndoorRouteId}/>}
            />

            {/* /// Edit Route /// */}
            <Route 
              path="/routes/:routeId/edit"
              render={(props) => <RouteForm {...props} baseURL={baseURL} route={currentRoute.data} climbSetting={climbSetting} currentUser={currentUser}/>}
            />

            {/* /// Show Route /// */}
            <Route path="/routes/:routeId">
              <ClimbRoute baseURL={baseURL} setCurrentRoute={setCurrentRoute} setClimbSetting={setClimbSetting} currentUser={currentUser}/>
            </Route>

            {/* /// Routes /// */}
            <Route path="/routes">
              <Routes baseURL={baseURL}/>
            </Route>
            
            {/* /// Create Climb /// */}
            <Route 
              path="/climbs/type"
              render={(props) => <ClimbType {...props} baseURL={baseURL} setClimbSetting={setClimbSetting} currentUser={currentUser}/>}
            />

            {/* /// Create Climb /// */}
            <Route 
              path="/climbs/new"
              render={(props) => <ClimbForm {...props} baseURL={baseURL} currentUser={currentUser} route={currentRoute.data} indoorRouteId={indoorRouteId}/>}
            />

            {/* /// Edit Climb /// */}
            <Route 
              path="/climbs/:climbId/edit"
              render={(props) => <ClimbForm {...props} baseURL={baseURL} currentUser={currentUser} climb={currentClimb.data}/>}
            />

            {/* /// Show Climb /// */}
            <Route path="/climbs/:climbId">
              <Climb baseURL={baseURL} setCurrentClimb={setCurrentClimb} currentUser={currentUser}/>
            </Route>

            {/* /// Climbs /// */}
            <Route path="/climbs"
              render={(props) => <Climbs {...props} baseURL={baseURL} currentUser={currentUser}/>} 
            />

            {/* /// HOME PAGE /// *** this must be the last route because its the least specific */}
            <Route path="/">
              {/* if current user is not logged in this will redirect you to user login */}
              {!currentUser? <Redirect to='/user/login'/> : 
              <HomePage currentUser={currentUser} currentUser={currentUser} baseURL={baseURL}/>
              }
            </Route>


          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
