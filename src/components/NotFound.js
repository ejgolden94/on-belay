import React from 'react' 
import {Button, Header, Container, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


export default function NotFound (props){
    const {redirect, redirectTo} = props
    return(
        <Container style={{minHeight:'90vh'}}>
            <Header style={{paddingTop:'5vh'}}>404 Page not found!</Header>
            <Image size='huge' src='https://cf.geekdo-images.com/camo/cba429883803dadea626df689cdbf3ddc0dc1bba/68747470733a2f2f692e696d6775722e636f6d2f456161485557462e6a7067'/>
            <Button as={Link} color='teal' to={redirectTo} style={{marginTop:'5vh'}}>Back To {redirect}?</Button>
        </Container>
    )
}