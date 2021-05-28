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
import EditClimbForm from './components/EditClimbForm';


let baseURL = ''

if (process.env.NODE_ENV === 'development'){
  baseURL = process.env.REACT_APP_LOCAL_URL
} else {
  baseURL = process.env.REACT_APP_PROD_URL
}

function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [currentClimb, setCurrentClimb] = useState({})

  // const postRoute = async() => {
  //   const url = baseURL + '/routes/'
  //   const body = JSON.stringify({
  //       "name":"Brain Surgery 104",
  //       "description":"I love this route! Such a pleasent surprise! It looked fun, but it was way more fun than it looked. Really nice holds, great flowing movement and a crux that is technical and powerful are some of the attributes that make this route rock. \nClimb in to and up the corner using some great holds and the crack. Stemming will make it easier. A good rest before the roof lets you prepare for the crux. Move out right and layback and do some other funky stuff to gain a sweet finger crack that leads to the chains.",
  //       "protection": "6 bolts to anchor.",
  //       "location": "In the middle of the cliff look for the corner crack leading to a roof.",
  //       "height":"50",
  //       "rating":"5.11b",
  //       "wall_type":"overhang",
  //       "creator": 2
  //   })
  //   const requestOptions = {
  //     method:'POST',
  //     credentials: 'include',
  //     headers: {'Content-Type': 'application/json'},
  //     mode: 'cors',
  //     body: body
  //   }
  // 
  //   let newRoute = await fetch(url,requestOptions).then(response => response.json())
  //   console.log(newRoute);
  // }

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
    // postRoute()
  },[])

  console.log(currentUser);
  return (
    <div className="App" style={{margin:'0', padding: '0'}}>
      <BrowserRouter>
          <Switch>

            {/* /// User Login /// */}
            <Route path="/user/login">
              <UserForm context='login' baseURL={baseURL} setCurrentUser={setCurrentUser}/>
              <footer>
                <Footer />
              </footer>
            </Route>


            {/* /// User Sign Up /// */}
            <Route path="/user/new">
              <UserForm context='signup' baseURL={baseURL} setCurrentUser={setCurrentUser}/>
              <footer>
                <Footer />
              </footer>
            </Route>

            {/* /// Show Route /// */}
            <Route path="/routes/:routeId">
              <ClimbRoute baseURL={baseURL}/>
              <footer>
                <Footer />
              </footer>
            </Route>

            {/* /// Routes /// */}
            <Route path="/routes">
              <Routes baseURL={baseURL}/>
              <footer>
                <Footer />
              </footer>
            </Route>

            {/* /// Edit Climb /// */}
            <Route path="/climbs/:climbId/edit">
              <EditClimbForm baseURL={baseURL} climb={currentClimb.data}/>
              <Footer />
            </Route>

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
