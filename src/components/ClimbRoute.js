import React, {useState, useEffect} from 'react' 
import {Header,
        Image, 
        Icon,
        Divider, 
        Container, 
        Button} from 'semantic-ui-react'
import {Link, useLocation} from 'react-router-dom'
import NotFound from './NotFound'
import ClimbCard from './ClimbCard'
import RouteDetails from './RouteDetails'
import RouteStats from './RouteStats'
import RouteComments from './RouteComments'
import Footer from './Footer'
import {formatDate} from '../formatDate'
import Nav from './Nav'
import {calculateRatingClass} from '../calculateRatingClass'

export default function ClimbRoute (props){
    const location = useLocation();
    const locationId = location.pathname.split('/')[2]
    const locationName = location.pathname.split('/')[1]
    const {baseURL, setCurrentRoute, setClimbSetting, currentUser} = props

    const [route, setRoute] = useState([])
    const [climbs, setClimbs] = useState([])
    const [seeAllClimbs, setSeeAllClimbs] = useState(false)
    const [announcement, setAnnouncement] = useState('')
    const [comments, setcomments] = useState([]);

    const ratingColor = route.data? calculateRatingClass(route.data.rating) : ''

    useEffect(()=> {
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

        getRoute()
        getUsersRouteClimbs()
        setClimbSetting('Outdoor')
    },[baseURL,setRoute,setCurrentRoute,setAnnouncement,setClimbs, setClimbSetting, locationId])

    if(route.status === 404){
        return (
            <NotFound redirect='Routes' redirectTo='/routes' baseURL={baseURL}/>
        )
    } else {
        return(
            route.data?
            <div className='page-and-footer'>
            {/* ------------------------------- */}
            {/* ------------ Header ----------- */}
            {/* ------------------------------- */}
                <Nav 
                    baseURL={baseURL} 
                    location={locationName}
                    route={route.data} 
                    setAnnouncement={setAnnouncement} 
                    announcement={announcement}
                    currentUser={currentUser}
                    />
            <div>
                <h2 className='page-headers'>Route Info</h2>
                {/* --------------------------------------- */}
                {/* ------------  Announcements ----------- */}
                {/* --------------------------------------- */}
                {announcement? 
                    <div style={{margin:'0', backgroundColor:'black', color:'white', padding: '2vmin'}}>
                        <strong>!Announcement:</strong> {announcement}
                    </div>:''}


                <div className={`${route.data.gym_outdoor.toLowerCase()}-image-background`}>
                    <Image 
                        className='route-img'
                        src={route.data.image? route.data.image: `/on-belay_${route.data.gym_outdoor.toLowerCase()}-${ratingColor.replace('#','')}.png`} 
                        style={{width: '100%', height:'30vh', objectFit: 'cover', margin: '0 auto'}}
                    />
                    {/* ------------------------------- */}
                    {/* ------------ Stats ------------ */}
                    {/* ------------------------------- */}
                    <RouteStats climbs={climbs} route={route.data}/>
                </div>

                {/* ------------------------------------- */}
                {/* ------------  Description ----------- */}
                {/* ------------------------------------- */}
                <div className='route-climb-info'>
                <Button size='small' as={Link} to='/climbs/new' className='route-btns float-right log-climb'>
                    Climb
                </Button>
                    <h2 style={{margin: '2vmin', fontFamily:'Poppins, sans-serif'}}>{route.data.name? route.data.name: route.data.location}</h2>
                    <div style={{margin: '2vmin'}}><Icon name='point'/> <h3 style={{display:'inline',  fontFamily:'Poppins, sans-serif' }}>Burlington, VT</h3></div>
                </div>
                <Divider horizontal>
                    <Header as='h3' className='font-inherit'>
                        Description
                    </Header>
                </Divider>
                <RouteDetails route={route.data} />

                {/* ------------------------------------- */}
                {/* ------------  YOUR CLIMBS ----------- */}
                {/* ------------------------------------- */}
                <Divider horizontal>
                    <Header as='h3' className='font-inherit'>
                        Your Climbs
                    </Header>
                </Divider>
                <Container style={{padding:'1vh'}}>
                    {/* Shows 2 climbs and a button to expand */}
                    {!seeAllClimbs&&climbs.length > 0 ? 
                    <>
                        {climbs.slice(0,2).map(climb => <ClimbCard key={climb.id} climb={climb} location={location.pathname.split('/')[1]}/>)}
                        <Button size='small' className='route-btns' onClick={() => setSeeAllClimbs(true)}>See All</Button>
                    </>: ''}
                    {/* Shows All climbs and a button to collapse */}
                    {seeAllClimbs&&climbs.length > 0? 
                    <>
                        {climbs.map(climb => <ClimbCard key={climb.id} climb={climb} location={location.pathname.split('/')[1]}/>)}
                        <Button size='small' className='route-btns' onClick={() => setSeeAllClimbs(false)}>Collapse</Button>
                    </>: ''}
                    {/* Shows That you havent climbed this route yet */}
                    {climbs.length === 0 ? 
                    <>
                        <p className='font-inherit'>You Haven't Climbed This Route Yet</p>
                    </>: ''}
                </Container>
                 
                {/* ---------------------------------- */}
                {/* ------------  COMMENTS ----------- */}
                {/* ---------------------------------- */}
                {route.data.gym_outdoor === 'Outdoor'? 
                <>
                <Divider horizontal>
                    <Header as='h3' className='font-inherit'>
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
   
                <div className='route-meta route-climb-info'>
                    <em style={{display:'block'}}>This route was created on {formatDate(route.data.created)}.</em>
                    <em style={{display:'block'}}>This route was created by On Belay user, {route.data.creator.username}.</em>
                </div>
            </div>
            <Footer />
            </div>
            :''
        )
    }
}