import React from 'react' 
import {Button, Header, Container, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


export default function NotFound (props){
    const {redirect, redirectTo} = props
    return(
        <Container style={{minHeight:'90vh'}}>
            <Header style={{paddingTop:'5vh'}}>404 Page not found!</Header>
            <Image size='huge' src='/ohno.jpeg'/>
            <Button as={Link} color='teal' to={redirectTo} style={{marginTop:'5vh'}}>Back To {redirect}?</Button>
        </Container>
    )
}