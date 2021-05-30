import React, {useState} from 'react' 
import {Button, Menu, Sidebar, Icon, Modal} from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'

export default function RouteSidebar (props){

    const {baseURL, route} = props
    const [visible, setVisible] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const toggleModalOpen = () => {
        setModalOpen(!modalOpen)
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
                <Menu.Item onClick={()=>toggleModalOpen()}>
                <Icon name='delete' style={{margin:'1vh auto'}}/>
                Delete
                </Menu.Item>
                <Menu.Item>
                <Icon name='flag' style={{margin:'1vh auto'}}/>
                Flag For Abuse
                </Menu.Item>
                <Menu.Item>
                <Icon name='announcement' style={{margin:'1vh auto'}}/>
                Make an Announcement
                </Menu.Item>
            </Sidebar>
            <Button icon inverted className='menu-btn' onClick={()=>toggleVisible()}>
                <Icon name='sidebar' />
            </Button>


            <Modal
                size='mini'
                open={modalOpen}
                >
                <Modal.Header>Delete This Route</Modal.Header>
                <Modal.Content>
                <p>Hey! Are you Sure you would like to delete this Route?</p>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => toggleModalOpen()}>
                    No
                </Button>
                <Button positive onClick={() => deleteRoute()}>
                    Yes
                </Button>
                </Modal.Actions>
            </Modal>
            </>
        )
        }
    }