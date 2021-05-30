import React, {useState} from 'react' 
import {Button, Menu, Sidebar, Icon} from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'

export default function RouteSidebar (props){

    const {baseURL, route} = props
    const [visible, setVisible] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const deleteRoute = async() => {
        const url= baseURL+'/routes/' + route.id 
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        const deletedRoute = await fetch(url, requestOptions).then(response => response.json())
        console.log(deletedRoute)
        setDeleted(true)
    }
    
    if (deleted){
        return <Redirect to='/routes/'/>
    } else {
        return (
            <>
            <Sidebar
                as={Menu}
                animation='overlay'
                direction='right'
                inverted
                icon
                color='teal'
                vertical
                visible={visible}
                width='thin'
            >
                <Menu.Item as={Link} to={`/routes/${route.id}/edit`}>
                <Icon name='pencil' style={{margin:'1vh auto'}}/>
                Edit
                </Menu.Item>
                <Menu.Item onClick={()=>deleteRoute()}>
                <Icon name='delete' style={{margin:'1vh auto'}}/>
                Delete
                </Menu.Item>
            </Sidebar>
            <Button icon inverted className='menu-btn' onClick={()=>toggleVisible()}>
                <Icon name='sidebar' />
            </Button>
            </>
        )
        }
    }