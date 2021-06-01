import React from 'react' 
import {Icon, Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function ClimbRoute (props) {
    const {route} = props

    const extra = (
        <>
        <Icon name='fire'/> 
        6 climbs Logged
        </>
    )
    return (
        <Link to={'/routes/'+route.id} style={{color:'inherit'}} >
        <Card style={{width:'80%', maxWidth:'400px', margin:'30px auto' }}>
            <Image 
                style={{maxHeight:'200px', objectFit:'cover'}} 
                src={route.image? route.image:'/climb-route-stock.jpeg'} 
                />
            <Card.Content>
            <Card.Header>{route.name}</Card.Header>
            <Card.Description>
                {route.description.slice(0,100)+'...'}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {extra}
            </Card.Content>
        </Card>
        </Link>
    )
}