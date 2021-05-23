import './App.css';
import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//// Components
import UserForm from './components/UserForm'
import Footer from './components/Footer'

let baseURL = ''

if (process.env.NODE_ENV === 'development'){
  baseURL = process.env.REACT_APP_LOCAL_URL
} else {
  baseURL = process.env.REACT_APP_PROD_URL
}

function App() {
  const [currentUser, setCurrentUser] = useState('')
  const [routes, setRoutes] = useState([])

  const getRoutes = async() => {
    const url = baseURL + 'routes/'
    const requestOptions = {
      method:'GET',
      credentials: 'include'
    }

    let foundRoutes = await fetch(url,requestOptions).then(response => response.json())
    setRoutes(foundRoutes.data)

  }

  useEffect(() => {
    getRoutes() // putting this function call inside of an anonymous function due to warning: "Effect callbacks are synchronous to prevent race conditions."
  },[])

  return (
    <div className="App">
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

          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
