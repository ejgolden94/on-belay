import React, {useState, useEffect} from 'react' 
import {Link, useLocation} from 'react-router-dom'
import {Header, Divider,Image, Button, Icon } from 'semantic-ui-react'
import NotFound from './NotFound'
import BackButton from './BackButton'
import {formatDate} from '../formatDate'
import {capitalize} from '../capitalize'
import RouteDetails from './RouteDetails'

export default function Climb (props){
    const {baseURL, setCurrentClimb} = props
    const location = useLocation()
    const climbId = location.pathname.split('/')[2]
    const [climb, setClimb] = useState({});

    useEffect(() => {
        const getClimb = async() => {
            const url = baseURL+'/climbs/'+climbId
            const requestOptions = {
                method: 'GET',
                credentials: 'include'
            }
            const climb = await fetch(url, requestOptions).then(response => response.json())
            setClimb(climb)
            setCurrentClimb(climb)
        }
        getClimb()
    }, [baseURL,climbId,setCurrentClimb]);

    console.log(climb);
    if (climb.status === 404){
        return <NotFound redirect='Climbs' redirectTo='/climbs'/>
    }
    
    return(
        climb.data? 
        <div className='page-and-footer'>
        <BackButton/>
        <div>
            <h2 className='page-headers'>{capitalize(climb.data.route.gym_outdoor)} Climb</h2>
            <p>{formatDate(climb.data.created,'long time')}</p>
            <div style={{backgroundColor:'rgba(0,0,0,0.5'}}>
                    <Image 
                        className='route-img'
                        src={climb.data.image? climb.data.image: climb.data.route.image? climb.data.route.image: 
                            climb.data.route.gym_outdoor==='Indoor'? 
                            '/on-belay_indoor-climb-placeholder_orange.png'
                            :'/on-belay_outdoor-climb-placeholder_orange.png' } 
                        style={{width: '100%', height:'30vh', objectFit: 'cover', margin: '0 auto'}}
                    />
                    {/* ------------------------------- */}
                    {/* ------------ Stats ------------ */}
                    {/* ------------------------------- */}
                    {/* <RouteStats climbs={climbs} route={route.data}/> */}
                </div>

                <div className='route-climb-info'>
                    <h2 style={{margin: '2vmin', fontFamily:'Poppins, sans-serif'}}>{climb.data.route.name? climb.data.route.name: climb.data.route.location}</h2>
                    <div style={{margin: '2vmin'}}><Icon name='point'/> <h3 style={{display:'inline',  fontFamily:'Poppins, sans-serif' }}>Burlington, VT</h3></div>
                </div>

                {/* ------------ Your Climb ----------- */}
                <Divider horizontal>
                    <Header as='h3' className='font-inherit'>
                        Your Climb
                    </Header>
                </Divider>
                    <div className='route-climb-info'>
                    <Button 
                        inverted circular icon color='purple' className='float-right'
                        as={Link} to={'/climbs/'+climb.data.id+'/edit'}>
                    <Icon name='pencil'/>
                    </Button>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}} className='font-inherit'>Climb Type:</h4>
                        {climb.data.climb_type}
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}} className='font-inherit'>Performance:</h4>
                        {climb.data.performance}
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}} className='font-inherit'>Your Notes:</h4>
                        {climb.data.notes}
                    </div>
                    {climb.data.time? 
                        <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}} className='font-inherit'>Your Time:</h4>
                        {climb.data.time} seconds
                    </div>: ''
                    }
                    </div>

                {/* ------------ Route Details ----------- */}
                <Divider horizontal>
                    <Header as='h3' className='font-inherit'>
                        Route Details
                    </Header>
                </Divider>
                    <RouteDetails route={climb.data.route} />
                    <Button as={Link} to={`/routes/${climb.data.route.id}`} className='font-inherit' style={{marginBottom: '2vh'}}>Go to Route</Button>
            </div> 
        </div>
        :''
    )
}