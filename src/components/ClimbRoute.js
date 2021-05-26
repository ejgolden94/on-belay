import React, {useState, useEffect} from 'react' 
import NotFound from './NotFound'
import {Button, Header, Container, Image} from 'semantic-ui-react'
import {Link, useLocation} from 'react-router-dom'

export default function ClimbRoute (props){
    const location = useLocation();
    const locationId = location.pathname.split('/')[2]

    const {baseURL} = props
    const [route, setRoute] = useState([])

    const getRoute = async() => {
        const url = baseURL + '/routes/' + locationId
        const requestOptions = {
          method:'GET',
          credentials: 'include'
        }
    
        let foundRoute = await fetch(url,requestOptions).then(response => response.json())
        console.log(foundRoute);
        setRoute(foundRoute)
    }

    useEffect(()=> {
        getRoute()
    },[])

    // console.log(route);
    if(route.status === 404){
        return (
            <NotFound redirect='Routes' redirectTo='/routes'/>
        )
    }
    return(
        <Header>Hey {locationId}</Header>
    )
}