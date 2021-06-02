import React, {useState, useEffect} from 'react' 
import {Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import BackButton from './BackButton'
import ClimbRouteCard from './ClimbRouteCard'
import Footer from './Footer'

export default function Routes(props){
    const {baseURL} = props
    const [routes, setRoutes] = useState([])

    const getRoutes = async() => {
        const url = baseURL + '/routes/?setting=outdoor'
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
        <div className='page-and-footer'>
        <BackButton />
        <Button icon circular as={Link} to={'/routes/new'} color='purple' className='add-route-btn'>
            <Icon name='add'/>
        </Button>
        <div>
            <h2 as='h2' className='page-headers'>Climb Routes</h2>
            <h2 className='page-sub-headers'>Choose Your Climb Route</h2>
            {routes.map(route => 
                <ClimbRouteCard key={route.id} route={route}/>
            )}
        </div>
        <Footer/>
        </div>
    )
}