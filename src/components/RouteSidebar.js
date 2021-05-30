import React, {useState} from 'react' 
import {Button, Menu, Sidebar, Icon, Modal, Form, FormInput} from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'

export default function RouteSidebar (props){

    const {baseURL, route} = props
    const [visible, setVisible] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [announceModalOpen, setAnnounceModalOpen] = useState(false)
    const [announcement, setAnnouncement] = useState(route.announcement)

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const toggleModalOpen = () => {
        setModalOpen(!modalOpen)
    }

    const toggleAnnounceModalOpen = () => {
        setAnnounceModalOpen(!announceModalOpen)
    }

    const addAnnouncement = async() => {
        const url= baseURL+'/routes/' + props.route.id 
        const body = JSON.stringify({announcement: announcement})
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type':'application/json'},
            body: body
        }
        const route = await fetch(url, requestOptions).then(request => request.json())
    }

    const removeAnnouncement = async() => {
        const url= baseURL+'/routes/' + props.route.id 
        const body = JSON.stringify({announcement: ''})
        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type':'application/json'},
            body: body
        }
        const route = await fetch(url, requestOptions).then(request => request.json())
        setAnnouncement('')
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

    const handleChange = (event) => {
        setAnnouncement(event.target.value)
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
                <Menu.Item onClick={()=>toggleAnnounceModalOpen()}>
                <Icon name='microphone' style={{margin:'1vh auto'}}/>
                Make an Announcement
                </Menu.Item>
                <Menu.Item onClick={()=>removeAnnouncement()}>
                <Icon name='microphone slash' style={{margin:'1vh auto'}}/>
                Remove Announcement
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

            <Modal
                size='mini'
                open={announceModalOpen}
                >
                <Modal.Header>Make an Announcement on this Route</Modal.Header>
                <Modal.Content>
                <h3>Hey! What's your announcement?</h3>
                <Form>
                    <Form.TextArea 
                        label='Announcement Text'
                        id='announcement'
                        onChange={(event)=>handleChange(event)}
                    />
                </Form>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => toggleAnnounceModalOpen()}>
                    Cancel
                </Button>
                <Button positive onClick={() => {
                    addAnnouncement() 
                    toggleAnnounceModalOpen()
                    }}>
                    Announce
                </Button>
                </Modal.Actions>
            </Modal>
            </>
        )
        }
    }