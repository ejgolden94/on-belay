import React, {useState, useEffect} from 'react' 
import {Form, Message, Icon, Image } from 'semantic-ui-react'
import Footer from './Footer';
import Nav from './Nav';
import {capitalize} from '../capitalize'
import {formatDate} from '../formatDate'


export default function HomePage (props){
    const {currentUser, baseURL} = props
    const [climbs, setClimbs] = useState([])
    const [routes, setRoutes] = useState([])

    const sumFeetClimbed = () => {
        
        return climbs.length> 0? climbs.map(climb => climb.route.height).reduce((acc, cv)=> acc + cv): 0
    }

    useEffect(() => {
        const getClimbs = async() => {
            const url = baseURL+'/climbs/my_climbs'
            const requestOptions = {
                method:'GET',
                credentials: 'include',
            }
            const climbs = await fetch(url,requestOptions).then(response => response.json())
            setClimbs(climbs.data)
            }

        const getRoutes = async() => {
            const url = baseURL+'/routes/my_routes'
            const requestOptions = {
                method:'GET',
                credentials: 'include',
            }
            const routes = await fetch(url,requestOptions).then(response => response.json())
            setRoutes(routes.data)
            }

        getClimbs()
        getRoutes()
    },[baseURL])

    return (
        <div className='page-and-footer'>
            <Nav baseURL={baseURL}/>
            <div className='page-container'>
                <div>
                    <img src='/on-belay_profile-photo-placeholder_orange.png' className='profile-avatar' />
                    <h2 className='font-inherit'>{capitalize(currentUser.username)}'s Profile</h2>
                    <p className='font-inherit user-meta'>User since {formatDate(currentUser.created)} </p>
                    <div className='profile-stats'>
                        <h2 className='profile-stat'>{climbs.length}</h2> 
                        <p className='stat-title'>Total Climbs</p>
                    </div>
                    <div className='profile-stats'>
                        <h2 className='profile-stat'>{sumFeetClimbed()}</h2> 
                        <p className='stat-title'>Feet Climbed</p>
                    </div>
                    <div className='profile-stats'>
                        <h2 className='profile-stat'>{routes.length}</h2>
                        <p className='stat-title'>Routes Created</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}