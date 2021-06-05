import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import {Menu, Icon, Sidebar} from 'semantic-ui-react'
import BackButton from './BackButton'
import useWindowSize from '../useWindowSize'
import RouteSidebar from './RouteSidebar'
import ClimbSidebar from './ClimbSidebar'

export default function Nav (props){
    const { width } = useWindowSize();
    const [ sideBarVisible, setSideBarVisible ] = useState(false)
    const [loggedOut, setLoggedOut] = useState(false)
    const {baseURL, location, route, climb, setAnnouncement, announcement, currentUser} = props

    const toggleSideBarVisible =()=>{
        setSideBarVisible(!sideBarVisible)
    }

    const logout = async() => {
        const url=baseURL + '/users/logout' 
        const requestOptions = {
            method:'GET',
            credentials:'include'
        }
        const logout = await fetch(url, requestOptions).then(response=> response.json())
        if(logout){
            setLoggedOut(true)
        }
    }

    const MenuItems = (
        <>
        <Menu.Item name='profile' position='right' className='font-inherit' as={Link} to='/'>
            <Icon inverted name='user' className='nav-icon'/>
            profile
        </Menu.Item>
        <Menu.Item name='home' className='font-inherit' as={Link} to='/'>
            <Icon inverted name='home' className='nav-icon'/>
            home
        </Menu.Item>
        <Menu.Item name='add' className='font-inherit' as={Link} to='/climbs/type'>
            <Icon inverted name='add circle' className='nav-icon'/>
            climb
        </Menu.Item>
        <Menu.Item name='compass outline' className='font-inherit' as={Link} to='/routes'>
                <Icon inverted name='compass outline' className='nav-icon'/>
                routes
        </Menu.Item>
        <Menu.Item name='history' className='font-inherit' as={Link} to='/climbs'>
            <Icon inverted name='history' className='nav-icon'/>
            history
        </Menu.Item>
        <Menu.Item name='sign-out' className='font-inherit' onClick={()=>logout()}>
            <Icon inverted name='sign-out' className='nav-icon'/>
            sign-out
        </Menu.Item>
        </>
    )

    if(loggedOut){
        return <Redirect to='/user/login'/>
    }
    if(width >= 690){
    return (
        <>
        <Menu icon='labeled' size='small' inverted  className='nav'>
            <Menu.Item>
                <BackButton />
            </Menu.Item>
            {MenuItems}
            {(location && location==='routes') || (location && location==='climbs') ?
            <Menu.Item>
                    <Icon inverted name='angle double right' size='large' onClick={()=> toggleSideBarVisible()}/>
                    more
            </Menu.Item> 
            :''}
            </Menu>

            <Sidebar
                as={Menu}
                animation='overlay'
                direction='right'
                inverted
                icon
                vertical
                visible={sideBarVisible}
                width='thin'
                >
                <Menu.Item onClick={()=>toggleSideBarVisible()} className='font-inherit'>
                    <Icon name='arrow right' style={{margin:'1vh auto'}}/>
                    Collapse Menu
                </Menu.Item>

                {location && location==='routes'?
                    <RouteSidebar 
                        baseURL={baseURL} 
                        route={route} 
                        setAnnouncement={setAnnouncement} 
                        announcement={announcement}
                        currentUser={currentUser}
                />:''}

                {location && location==='climbs'?
                    <ClimbSidebar
                        baseURL={baseURL} 
                        climb={climb} 
                        currentUser={currentUser}
                />:''}
            </Sidebar>
            </>
    )
    }else{
        return(
            <>
            <Menu icon='labeled' inverted  className='nav'>
                <Menu.Item>
                    <BackButton />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Icon inverted name='sidebar' size='large' onClick={()=> toggleSideBarVisible()}/>
                </Menu.Item> 
            </Menu>

            <Sidebar
                as={Menu}
                animation='overlay'
                direction='right'
                inverted
                icon
                vertical
                visible={sideBarVisible}
                width='thin'
                >
                <Menu.Item onClick={()=>toggleSideBarVisible()} className='font-inherit'>
                    <Icon name='arrow right' style={{margin:'1vh auto'}}/>
                    Collapse Menu
                </Menu.Item>
                {location && location==='routes'?
                    <RouteSidebar 
                        baseURL={baseURL} 
                        route={route} 
                        setAnnouncement={setAnnouncement} 
                        announcement={announcement}
                        currentUser={currentUser}
                    />:''}

                {location && location==='climbs'?
                    <ClimbSidebar
                        baseURL={baseURL} 
                        climb={climb} 
                        currentUser={currentUser}
                    />:''}
                    
                {MenuItems}
            </Sidebar>
            </>
        )
    }
}