import React from 'react' 
import {Card, Icon, Image, Segment, Header} from 'semantic-ui-react'
import {useLocation} from 'react-router-dom'

export default function ClimbRoute (props){
    const location = useLocation();
    const locationId = location.pathname.split('/')[2]
    return(
        <Header>Hey {locationId}</Header>
    )
}