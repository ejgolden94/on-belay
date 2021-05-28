import React, {useState, useEffect} from 'react' 
import {useLocation} from 'react-router-dom'
import {Container, Header, Divider, Segment, Image } from 'semantic-ui-react'
import NotFound from './NotFound'
import BackButton from './BackButton'
import {calculateRatingClass} from '../calculateRatingClass'
import {formatDate} from '../formatDate'
import RouteDetails from './RouteDetails'

export default function Climb (props){
    const {baseURL} = props
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
        }
        getClimb()
    }, []);

    console.log(climb);
    if (climb.status === 404){
        return <NotFound redirect='Climbs' redirectTo='/climbs'/>
    }
    
    return(
        climb.data? 
        <Container style={{minHeight:'90vh'}}>
        <BackButton/>
            <Segment style={{width: '80%', maxWidth:'600px', margin: '0 auto 5vh auto', border:'none', padding: '0', boxShadow: 'none'}}>
                <Header style={{margin:'2vh', fontSize:'2.5em', fontWeight:'900'}}>
                    {climb.data.route.name}
                </Header>
                <Image 
                    src={climb.data.image? climb.data.image: climb.data.route.image? climb.data.route.image: '/climb_stock.jpeg' } 
                    style={{width: '100%', height:'30vh', objectFit: 'cover', margin: '0 auto'}}
                />

                {/* ------------ Your Climb ----------- */}
                <Divider horizontal>
                    <Header as='h3'>
                        Your Climb
                    </Header>
                </Divider>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Date Logged:</h4>
                        {formatDate(climb.data.created,'long time')}
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Climb Type:</h4>
                        {climb.data.climb_type}
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Climb Setting:</h4>
                        {climb.data.gym_outdoor}
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Performance:</h4>
                        {climb.data.performance}
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Your Notes:</h4>
                        {climb.data.notes}
                    </div>
                    {climb.data.time? 
                        <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Your Time:</h4>
                        {climb.data.time} seconds
                    </div>: ''
                    }

                {/* ------------ Route Details ----------- */}
                <Divider horizontal>
                    <Header as='h3'>
                        Route Details
                    </Header>
                </Divider>
                <Container style={{padding:'1vh'}}>
                    <RouteDetails route={climb.data.route} />
                </Container> 
            </Segment> 
        </Container>
        :''
    )
}