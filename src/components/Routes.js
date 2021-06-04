import React, {useState, useEffect} from 'react' 
import {Button, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ClimbRouteCard from './ClimbRouteCard'
import Footer from './Footer'
import Nav from './Nav'

export default function Routes(props){
    const {baseURL, currentUser} = props
    const [routes, setRoutes] = useState([])
    const [limit, setlimit] = useState(5)

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
        <Nav baseURL={baseURL} currentUser={currentUser}/>
        <div>
            <h2 as='h2' className='page-headers'>Climb Routes</h2>
            <h2 className='page-sub-headers'>Choose Your Climb Route</h2>
            {routes.slice(0,limit).map(route => 
                <ClimbRouteCard key={route.id} route={route}/>
            )}
            <Button className='route-btns' onClick={()=>{setlimit(limit+5)}}>See More Routes</Button>
            <Button icon circular as={Link} to={'/routes/new'} color='purple' className='add-btn'>
                <Icon name='add' size='big'/>
            </Button>
        </div>
        <Footer/>
        </div>
    )
}