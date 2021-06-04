import React, {useState} from 'react' 
import {Button, Menu, Icon, Modal} from 'semantic-ui-react'
import {Redirect, Link} from 'react-router-dom'

export default function RouteSidebar (props){

    const {baseURL, route, currentUser, climb} = props
    const [deleted, setDeleted] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    

    const toggleModalOpen = () => {
        setModalOpen(!modalOpen)
    }

    const deleteClimb = async() => {
        const url= baseURL+'/climbs/' + climb.id 
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        }
        const deletedClimb = await fetch(url, requestOptions).then(response => response.json())
        console.log(deletedClimb)
        setDeleted(true)
    }

    if (deleted){
        return <Redirect to='/climbs/'/>
    } else {
        return (
            <>
            {currentUser.email === climb.creator.email?
            <>
            <Menu.Item as={Link} to={`/climbs/${climb.id}/edit`} className='font-inherit'>
                <Icon name='pencil' className='nav-icon'/>
                Edit
                </Menu.Item>
            <Menu.Item onClick={()=>toggleModalOpen()} className='font-inherit'>
                <Icon name='delete' className='nav-icon'/>
                Delete
            </Menu.Item>
            </>
            :''}

            <Modal
                size='small'
                open={modalOpen}
                >
                <Modal.Header>Delete This Climb</Modal.Header>
                <Modal.Content>
                <p>Hey! Are you Sure you would like to delete this Climb?</p>
                </Modal.Content>
                <Modal.Actions>
                <Button negative onClick={() => toggleModalOpen()}>
                    No
                </Button>
                <Button positive onClick={() => deleteClimb()}>
                    Yes
                </Button>
                </Modal.Actions>
            </Modal>

            </>
        )
        }
    }