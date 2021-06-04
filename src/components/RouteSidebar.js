import React, {useState} from 'react' 
import {Button, Menu, Icon, Modal, Form} from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'

export default function RouteSidebar (props){

    const {baseURL, route, setAnnouncement, announcement, currentUser} = props
    const [deleted, setDeleted] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [announceModalOpen, setAnnounceModalOpen] = useState(false)
    const [removeAnnounceModalOpen, setRemoveAnnounceModalOpen] = useState(false)
    

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
            {currentUser.email === route.creator.email?
            <>
            <Menu.Item as={Link} to={`/routes/${route.id}/edit`} className='font-inherit'>
                <Icon name='pencil' className='nav-icon'/>
                Edit
                </Menu.Item>
            <Menu.Item onClick={()=>toggleModalOpen()} className='font-inherit'>
                <Icon name='delete' className='nav-icon'/>
                Delete
            </Menu.Item>
            </>
            :''}
            <Menu.Item className='font-inherit'>
            <Icon name='flag' className='nav-icon'/>
                Flag For Abuse
                </Menu.Item>
            <Menu.Item onClick={()=>toggleAnnounceModalOpen()} className='font-inherit'>
                <Icon name='microphone' className='nav-icon'/>
                Make an Announcement
            </Menu.Item>
            <Menu.Item onClick={()=>toggleRemoveAnnounceModalOpen()} className='font-inherit'>
                <Icon name='microphone slash' className='nav-icon'/>
                Remove Announcement
            </Menu.Item>


            <Modal
                size='small'
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
                size='small'
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
                size='small'
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