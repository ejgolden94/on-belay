import React, {useState, useEffect} from 'react' 
import {Container} from 'semantic-ui-react'
import ClimbRoute from './ClimbRoute'

export default function Routes(props){
    const {baseURL} = props
    const [routes, setRoutes] = useState([])

    const getRoutes = async() => {
        const url = baseURL + '/routes/'
        const requestOptions = {
          method:'GET',
          credentials: 'include'
        }
    
        let foundRoutes = await fetch(url,requestOptions).then(response => response.json())
        setRoutes(foundRoutes.data)
    }

    useEffect(()=> {
        getRoutes()
    },[])

    console.log(routes);
    return (
        <Container style={{margin:'100px auto', minHeight:'90vh'}}>
        {routes.map(route => 
            <ClimbRoute key={route.id} route={route}/>
        )}
        </Container>
    )
}