import React, {useState, useEffect} from 'react' 
import {Container, Header, Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import BackButton from './BackButton'
import ClimbRouteCard from './ClimbRouteCard'

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

    return (
        <Container style={{margin:'0 auto', minHeight:'90vh'}}>
        <BackButton />
        <Header as='h2'>Climb Routes</Header>
        {routes.map(route => 
            <ClimbRouteCard key={route.id} route={route}/>
        )}
        <Button icon circular as={Link} to={'/routes/new'} color='purple'>
            <Icon name='add'/>
        </Button>
        </Container>
    )
}