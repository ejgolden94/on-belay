import React, {useState, useEffect} from 'react' 
import NotFound from './NotFound'
import {Header, Image, Segment, Divider, Rating, Container, Button, Icon} from 'semantic-ui-react'
import {useLocation, Link} from 'react-router-dom'
import {formatDate} from '../formatDate'
import ClimbCard from './ClimbCard'
import BackButton from './BackButton'
import RouteDetails from './RouteDetails'
import RouteStats from './RouteStats'

export default function ClimbRoute (props){
    const location = useLocation();
    const locationId = location.pathname.split('/')[2]

    const {baseURL, setCurrentRoute} = props
    const [route, setRoute] = useState([])
    const [climbs, setClimbs] = useState([])
    const [seeAllClimbs, setSeeAllClimbs] = useState(false)

    const getRoute = async() => {
        const url = baseURL + '/routes/' + locationId
        const requestOptions = {
          method:'GET',
          credentials: 'include'
        }
    
        let foundRoute = await fetch(url,requestOptions).then(response => response.json())
        setRoute(foundRoute)
        setCurrentRoute(foundRoute)
    }

    const getUsersRouteClimbs = async () => {
        const url = baseURL + '/routes/' + locationId + '/climbs?user=true'
        const requestOptions = {
            method:'GET',
            credentials: 'include'
        }
        const climbs = await fetch(url, requestOptions).then(response => response.json())
        setClimbs(climbs.data)
    } 

    const handleRate = () =>{

    }

    useEffect(()=> {
        getRoute()
        getUsersRouteClimbs()
    },[])

    if(route.status === 404){
        return (
            <NotFound redirect='Routes' redirectTo='/routes'/>
        )
    } else {
        return(
            route.data?
            <>
            <BackButton />
            <Segment className='page-container'>
                <Header style={{margin:'2vh', fontSize:'2.5em', fontWeight:'900'}}>
                    {route.data.name}
                </Header>
                <Image 
                    src={route.data.image? route.data.image:'/climb-route-stock.jpeg' } 
                    style={{width: '100%', height:'30vh', objectFit: 'cover', margin: '0 auto'}}
                />

                {/* ------------  Stats ----------- */}
                <RouteStats climbs={climbs} route={route.data}/>
                {/* ------------  Description ----------- */}
                <Divider horizontal>
                    <Header as='h3'>
                        Description
                    </Header>
                </Divider>
                <Container style={{padding:'1vh'}}>
                    <Button 
                        inverted circular icon color='purple' className='float-right'
                        as={Link} to={'/routes/'+route.data.id+'/edit'}>
                        <Icon name='pencil'/>
                    </Button>
                    <RouteDetails route={route.data} />
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
                    {!seeAllClimbs&&climbs? 
                    <>
                    {climbs.slice(0,2).map(climb => <ClimbCard key={climb.id} climb={climb}/>)}
                    <Button inverted size='mini' color='purple' onClick={() => setSeeAllClimbs(true)}>See All</Button>
                    </>: ''}
                    {seeAllClimbs&&climbs? 
                    <>
                    {climbs.map(climb => <ClimbCard key={climb.id} climb={climb}/>)}
                    <Button inverted size='mini' color='purple' onClick={() => setSeeAllClimbs(false)}>Collapse</Button>
                    </>: ''}
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