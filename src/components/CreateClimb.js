import React from 'react' 
import { Link } from 'react-router-dom'
import { Container, Segment } from 'semantic-ui-react'

export default function CreateClimb(props){
    const {setClimbSetting} = props
    return(
        <Container className='climb-type-container'>
            <Segment 
                as={Link}
                to='/routes'
                onClick={()=>{setClimbSetting('Outdoor')}} 
                className='outdoor circle climb-type'
                >
                Outdoor 
            </Segment>
            <Segment 
                as={Link}
                to='/climbs/new'
                className='indoor circle climb-type' 
                onClick={()=>{setClimbSetting('Gym')}}
                >
                Indoor 
            </Segment>
        </Container>
    )
}