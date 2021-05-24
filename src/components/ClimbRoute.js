import React from 'react' 
import {Card, Icon, Image, Segment, Header} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function ClimbRoute (props) {
    const {route} = props
    return (
        
    <Segment style={{width:'60%'}}>
        <div style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <Image
                floated='left'
                size='small'
                rounded
                src='https://ptrenew.com/wp-content/uploads/Screen-Shot-2019-04-05-at-1.35.48-PM.png'
                />
            <div style={{textAlign:'left'}}>
                <Header>{route.name}</Header>
                <div>{route.description.slice(0,100)+'...'}</div>
                <Icon name='fire' style={{marginTop:'10px'}}/>6 climbs Logged
            </div>
        </div>
    </Segment>
    )
}