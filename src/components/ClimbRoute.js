import React, {useState, useEffect} from 'react' 
import NotFound from './NotFound'
import {Header, Image, Icon, Segment, Divider} from 'semantic-ui-react'
import {Link, useLocation} from 'react-router-dom'

export default function ClimbRoute (props){
    const location = useLocation();
    const locationId = location.pathname.split('/')[2]

    const {baseURL} = props
    const [route, setRoute] = useState([])

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

    useEffect(()=> {
        getRoute()
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
                    className='float-left'
                    style={{zIndex:'100'}}
                    />
            </Link>
            <Segment style={{maxWidth: '80%', margin: '0 auto 5vh auto', border:'none', padding: '0'}}>
                <Header style={{margin:'2vh', fontSize:'2.5em', fontWeight:'900'}}>
                    {route.data.name}
                </Header>
                <Image 
                    src={route.data.image? route.data.image:'/climb-route-stock.jpeg' } 
                    style={{width: '100%', height:'30vh', objectFit: 'cover', margin: '0 auto'}}
                />
                <Segment className='stats' style={{backgroundColor:'lightgray', margin:'0 0 2vh 0'}}>
                    <div>Your Stats:</div>
                    <div>--</div>
                    <div>--</div>
                    <div>--</div>
                </Segment>
                <Divider horizontal>
                    <Header as='h3'>
                        Description
                    </Header>
                </Divider>
                <p>{route.data.description}</p>
                <Divider horizontal>
                    <Header as='h3'>
                        Comments
                    </Header>
                </Divider>
                {/* add comment s component right here */}
                    <Segment rounded  style={{display:'flex', width:'80%', margin:'0 auto'}}>
                        <Segment circular style={{height:'75px', width: '75px'}}>User 1</Segment>
                        <Segment style={{border:'none', boxShadow:'none'}}>I have a lot to say a bout this route...</Segment>
                    </Segment>
                    <Segment rounded  style={{display:'flex', width:'80%', margin:'20px auto'}}>
                        <Segment circular style={{height:'75px', width: '75px'}}>User 2</Segment>
                        <Segment style={{border:'none', boxShadow:'none'}}>Same...</Segment>
                    </Segment>
                <Divider horizontal>
                    <Header as='h3'>
                        Your Climbs
                    </Header>
                </Divider>
                    <Segment rounded  style={{display:'flex', width:'80%', margin:'0 auto'}}>
                        <Segment style={{border:'none', boxShadow:'none'}}>climb climb climb</Segment>
                    </Segment>
            </Segment>
            </>
            :''
        )
    }
}