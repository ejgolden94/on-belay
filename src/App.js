import './App.css';
import React, {useState, useEffect} from 'react'

let baseURL = ''

if (process.env.NODE_ENV === 'development'){
  baseURL = process.env.REACT_APP_LOCAL_URL
} else {
  baseURL = process.env.REACT_APP_PROD_URL
}

function App() {
  // [currentUser, setCurrentUser] = useState()
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
      <header className="App-header">
        Routes
        {routes? routes.map(route => <li key={route.id}>{route.name}</li>): ''}
      </header>
    </div>
  );
}

export default App;
