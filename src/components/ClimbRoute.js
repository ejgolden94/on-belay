import React, {useState, useEffect} from 'react' 
import NotFound from './NotFound'
import {Header, Image, Icon, Segment, Divider, Rating, Container} from 'semantic-ui-react'
import {Link, useLocation} from 'react-router-dom'
import {calculateRatingClass} from '../calculateRatingClass'
import {formatDate} from '../formatDate'
import ClimbCard from './ClimbCard'

export default function ClimbRoute (props){
    const location = useLocation();
    const locationId = location.pathname.split('/')[2]

    const {baseURL} = props
    const [route, setRoute] = useState([])
    const [climbs, setClimbs] = useState([])

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

    const getUsersRouteClimbs = async () => {
        const url = baseURL + '/routes/' + locationId + '/climbs?user=true'
        const requestOptions = {
            method:'GET',
            credentials: 'include'
        }
        const climbs = await fetch(url, requestOptions).then(response => response.json())
        console.log(climbs);
        setClimbs(climbs.data)
    } 

    const handleRate = () =>{

    }

    useEffect(()=> {
        getRoute()
        getUsersRouteClimbs()
    },[])

    console.log(route);
    if(route.status === 404){
        return (
            <NotFound redirect='Routes' redirectTo='/routes'/>
        )
    } else {
        return(
            route.data?
            <>
            <Link to='/routes' style={{color:'inherit'}}>
                    <Icon 
                    circular inverted 
                    color='teal' 
                    name='angle left' 
                    size='large' 
                    className='back-btn'
                    style={{zIndex:'100'}}
                    />
            </Link>
            <Segment style={{width: '80%', maxWidth:'600px', margin: '0 auto 5vh auto', border:'none', padding: '0', boxShadow: 'none'}}>
                <Header style={{margin:'2vh', fontSize:'2.5em', fontWeight:'900'}}>
                    {route.data.name}
                </Header>
                <Image 
                    src={route.data.image? route.data.image:'/climb-route-stock.jpeg' } 
                    style={{width: '100%', height:'30vh', objectFit: 'cover', margin: '0 auto'}}
                />

                {/* ------------  Stats ----------- */}
                <Segment className='stats' style={{backgroundColor:'lightgray', margin:'0 0 2vh 0'}}>
                    <div>Your Stats:</div>
                    <div>--</div>
                    <div>--</div>
                    <div>--</div>
                </Segment>
                {/* ------------  Description ----------- */}
                <Divider horizontal>
                    <Header as='h3'>
                        Description
                    </Header>
                </Divider>
                <Container style={{padding:'1vh'}}>
                    <div className='route-desc'>
                        <div className={'circle '+calculateRatingClass(route.data.rating)} style={{marginRight:'10px', minWidth:'75px', height:'75px'}}>
                            {route.data.rating}
                        </div>
                        <div>
                            {route.data.description}
                        </div>
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Height:</h4>
                        {route.data.height}'
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Protection:</h4>
                        {route.data.protection}
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Location:</h4>
                        {route.data.location}
                    </div>
                    <div className='route-desc'>
                        <h4 style={{marginRight:'10px'}}>Wall Characteristic:</h4>
                        {route.data.wall_type}
                    </div>
                    <div className='route-meta'>
                        <em style={{display:'block'}}>This route was created on {formatDate(route.data.created)}.</em>
                        <em style={{display:'block'}}>This route was created by On Belay user, {route.data.creator.username}.</em>
                    </div>
                </Container>

                {/* ------------  YOUR CLIMBS ----------- */}
                <Divider horizontal>
                    <Header as='h3'>
                        Your Climbs
                    </Header>
                </Divider>
                <Container style={{padding:'1vh'}}>
                    {climbs? climbs.map(climb => <ClimbCard key={climb.id} climb={climb}/>): ''}
                </Container>

                {/* ------------  COMMENTS ----------- */}
                <Divider horizontal>
                    <Header as='h3'>
                        Comments
                    </Header>
                </Divider>
                {/* add comment s component right here */}
                    <Segment rounded style={{display:'flex', width:'80%', margin:'0 auto'}}>
                        <Segment circular style={{height:'75px', width: '75px'}}>User 1</Segment>
                        <Segment style={{border:'none', boxShadow:'none'}}>I have a lot to say a bout this route...</Segment>
                        <Rating defaultRating={3} maxRating={5} disabled={true} clearable onRate={handleRate}/>
                    </Segment>
                    <Segment rounded style={{display:'flex', width:'80%', margin:'20px auto'}}>
                        <Segment circular style={{height:'75px', width: '75px'}}>User 2</Segment>
                        <Segment style={{border:'none', boxShadow:'none'}}>Same...</Segment>
                        <Rating defaultRating={3} maxRating={5} disabled clearable onRate={handleRate}/>
                    </Segment>
                    
            </Segment>
            </>
            :''
        )
    }
}