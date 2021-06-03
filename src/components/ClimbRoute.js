import React, {useState, useEffect} from 'react' 
import {Header,
        Image, 
        Segment,
        Divider, 
        Container, 
        Button,
        Message} from 'semantic-ui-react'
import {Link, useLocation} from 'react-router-dom'
import {formatDate} from '../formatDate'
import NotFound from './NotFound'
import ClimbCard from './ClimbCard'
import BackButton from './BackButton'
import RouteDetails from './RouteDetails'
import RouteStats from './RouteStats'
import RouteSidebar from './RouteSidebar'
import RouteComments from './RouteComments'
import Footer from './Footer'
import { calculateRatingClass } from '../calculateRatingClass'

export default function ClimbRoute (props){
    const location = useLocation();
    const locationId = location.pathname.split('/')[2]

    const {baseURL, setCurrentRoute, setClimbSetting} = props
    const [route, setRoute] = useState([])
    const [climbs, setClimbs] = useState([])
    const [seeAllClimbs, setSeeAllClimbs] = useState(false)
    const [announcement, setAnnouncement] = useState('')
    const [visible, setVisible] = useState(false)
    const [comments, setcomments] = useState([]);

    const getRoute = async() => {
        const url = baseURL + '/routes/' + locationId
        const requestOptions = {
          method:'GET',
          credentials: 'include'
        }
    
        let foundRoute = await fetch(url,requestOptions).then(response => response.json())
        setRoute(foundRoute)
        setCurrentRoute(foundRoute)
        setAnnouncement(foundRoute.data.announcement)
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

    useEffect(()=> {
        getRoute()
        getUsersRouteClimbs()
        setClimbSetting('Outdoor')
    },[])

    if(route.status === 404){
        return (
            <NotFound redirect='Routes' redirectTo='/routes'/>
        )
    } else {
        return(
            route.data?
            <div className='page-and-footer'>
            {/* ------------------------------- */}
            {/* ------------ Header ----------- */}
            {/* ------------------------------- */}
            <BackButton />
            <div>
                <h2 className='page-headers'>{route.data.name}</h2>
                <div style={{backgroundColor:'rgba(0,0,0,0.5'}}>
                    <Image 
                        className='route-img'
                        src={route.data.image? route.data.image: route.data.gym_outdoor==='Indoor'? 
                            '/on-belay_indoor-climb-placeholder_orange.png'
                            :'/on-belay_outdoor-climb-placeholder_orange.png' } 
                        style={{width: '100%', height:'30vh', objectFit: 'cover', margin: '0 auto'}}
                        onClick={()=>setVisible(false)}
                    />
                    {/* ------------------------------- */}
                    {/* ------------ Stats ------------ */}
                    {/* ------------------------------- */}
                    <RouteStats climbs={climbs} route={route.data}/>
                </div>
                <RouteSidebar 
                    baseURL={baseURL} 
                    route={route.data} 
                    setAnnouncement={setAnnouncement} 
                    announcement={announcement}
                    visible={visible}
                    setVisible={setVisible}
                    />

                {/* ------------------------------- */}
                {/* ------------ Stats ------------ */}
                {/* ------------------------------- */}
                {/* <RouteStats climbs={climbs} route={route.data}/> */}

                {/* --------------------------------------- */}
                {/* ------------  Announcements ----------- */}
                {/* --------------------------------------- */}
                {announcement? <Message color='orange' style={{margin:'0'}}>{announcement}</Message>:''}

                {/* ------------------------------------- */}
                {/* ------------  Description ----------- */}
                {/* ------------------------------------- */}
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

                {/* ------------------------------------- */}
                {/* ------------  YOUR CLIMBS ----------- */}
                {/* ------------------------------------- */}
                <Divider horizontal>
                    <Header as='h3'>
                        Your Climbs
                    </Header>
                </Divider>
                <Container style={{padding:'1vh'}}>
                    {/* Shows 2 climbs and a button to expand */}
                    {!seeAllClimbs&&climbs.length > 0 ? 
                    <>
                        {climbs.slice(0,2).map(climb => <ClimbCard key={climb.id} climb={climb}/>)}
                        <Button inverted size='mini' color='purple' onClick={() => setSeeAllClimbs(true)}>See All</Button>
                    </>: ''}
                    {/* Shows All climbs and a button to collapse */}
                    {seeAllClimbs&&climbs.length > 0? 
                    <>
                        {climbs.map(climb => <ClimbCard key={climb.id} climb={climb}/>)}
                        <Button inverted size='mini' color='purple' onClick={() => setSeeAllClimbs(false)}>Collapse</Button>
                    </>: ''}
                    {/* Shows That you havent climbed this route yet */}
                    {climbs.length === 0 ? 
                    <>
                        <Header as='h4'>You Haven't Climbed This Route Yet</Header>
                    </>: ''}
                    <Button inverted size='mini' color='purple' as={Link} to='/climbs/new'>
                        Log a Climb
                    </Button>
                </Container>
                 
                {/* ---------------------------------- */}
                {/* ------------  COMMENTS ----------- */}
                {/* ---------------------------------- */}
                {route.data.gym_outdoor === 'Outdoor'? 
                <>
                <Divider horizontal>
                    <Header as='h3'>
                        Comments
                    </Header>
                </Divider>
                <RouteComments 
                    baseURL={baseURL}
                    routeId={route.data.id}
                    comments={comments}
                    setcomments={setcomments}
                />
                </>:''}
            </div>
            <Footer />
            </div>
            :''
        )
    }
}