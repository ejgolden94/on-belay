import React, {useState} from 'react' 
import {Button, Menu, Sidebar, Icon, Modal, Form} from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'

export default function RouteSidebar (props){

    const {baseURL, route, setAnnouncement, announcement, visible, setVisible} = props
    const [deleted, setDeleted] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [announceModalOpen, setAnnounceModalOpen] = useState(false)
    const [removeAnnounceModalOpen, setRemoveAnnounceModalOpen] = useState(false)
    
    const toggleVisible = () => {
        setVisible(!visible)
    }

    const toggleModalOpen = () => {
        setModalOpen(!modalOpen)
    }

    const toggleAnnounceModalOpen = () => {
        setAnnounceModalOpen(!announceModalOpen)
    }

    const toggleRemoveAnnounceModalOpen = () => {
        setRemoveAnnounceModalOpen(!removeAnnounceModalOpen)
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
        await fetch(url, requestOptions).then(request => request.json())
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
        await fetch(url, requestOptions).then(request => request.json())
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
                vertical
                visible={visible}
                width='thin'
            >
                <Menu.Item as={Link} to={`/routes/${route.id}/edit`} className='font-inherit'>
                <Icon name='pencil' style={{margin:'1vh auto'}}/>
                    Edit
                    </Menu.Item>
                <Menu.Item onClick={()=>toggleModalOpen()} className='font-inherit'>
                <Icon name='delete' style={{margin:'1vh auto'}}/>
                    Delete
                    </Menu.Item>
                <Menu.Item className='font-inherit'>
                <Icon name='flag' style={{margin:'1vh auto'}}/>
                    Flag For Abuse
                    </Menu.Item>
                <Menu.Item onClick={()=>toggleAnnounceModalOpen()} className='font-inherit'>
                    <Icon name='microphone' style={{margin:'1vh auto'}}/>
                    Make an Announcement
                </Menu.Item>
                <Menu.Item onClick={()=>toggleRemoveAnnounceModalOpen()} className='font-inherit'>
                    <Icon name='microphone slash' style={{margin:'1vh auto'}}/>
                    Remove Announcement
                </Menu.Item>
                <Menu.Item onClick={()=>toggleVisible()} className='font-inherit'>
                    <Icon name='arrow right' style={{margin:'1vh auto'}}/>
                    Collapse Menu
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
                        value={announcement}
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

            <Modal
                size='mini'
                open={removeAnnounceModalOpen}
                >
                <Modal.Header>Remove the Announcement on this Route</Modal.Header>
                <Modal.Content>
                <h4>Are you sure you what to remove the current announcement? :</h4>
                <p>"{announcement}"</p>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => toggleRemoveAnnounceModalOpen()}>
                    Cancel
                </Button>
                <Button positive onClick={() => {
                    removeAnnouncement() 
                    toggleRemoveAnnounceModalOpen()
                    }}>
                    Remove Announcement
                </Button>
                </Modal.Actions>
            </Modal>
            </>
        )
        }
    }