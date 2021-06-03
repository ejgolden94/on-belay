import React from 'react' 
import {Button, Header, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'


export default function NotFound (props){
    const {redirect, redirectTo} = props
    return(
        <div className='page-and-footer'>
        <Nav/>
        <div className='page-container'>
            <h1 className='font-inherit'>404 Page not found!</h1>
            <Image size='huge' src='/ohno.jpeg'/>
            <Button as={Link} to={redirectTo} className='font-inherit lost-btn'>
                Back To {redirect}?
            </Button>
        </div>
        <Footer/>
        </div>
    )
}