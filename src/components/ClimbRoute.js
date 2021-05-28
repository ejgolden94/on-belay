import React, {useState, useEffect} from 'react' 
import NotFound from './NotFound'
import {Header, Image, Segment, Divider, Rating, Container} from 'semantic-ui-react'
import {useLocation} from 'react-router-dom'
import {formatDate} from '../formatDate'
import ClimbCard from './ClimbCard'
import BackButton from './BackButton'
import RouteDetails from './RouteDetails'
import RouteStats from './RouteStats'

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
                <RouteStats />
                {/* ------------  Description ----------- */}
                <Divider horizontal>
                    <Header as='h3'>
                        Description
                    </Header>
                </Divider>
                <Container style={{padding:'1vh'}}>
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