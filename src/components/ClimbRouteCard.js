import React from 'react' 
import {Icon, Card, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {calculateRatingClass} from '../calculateRatingClass'

export default function ClimbRoute (props) {
    const {route} = props
    const ratingColor = calculateRatingClass(route.rating)

    return (
        <Link to={'/routes/'+route.id} style={{color:'inherit'}} >
        <Card size='small' 
            style={{width:'80%', maxWidth:'600px', margin:'30px auto',color:'white', backgroundColor:`${ratingColor}`}}>
            <Image 
                style={{maxHeight:'200px', objectFit:'cover'}} 
                src={route.image? route.image: `/on-belay_outdoor-${ratingColor.replace('#','')}.png`}
                />
            <Card.Content className='card-content'>
            {/* ROUTE NAME */}
            <div>
                <h2 style={{color:'white', fontFamily:'Poppins, sans-serif' }}>{route.name}</h2>
                <div><Icon name='point'/> <h3 style={{display:'inline',  fontFamily:'Poppins, sans-serif' }}>Burlington, VT</h3></div>
            </div>

            {/* ROUTE RATING */}
            <div style={{color:`${ratingColor}`, backgroundColor:'rgba(255,255,255,0.8)', borderRadius:'1vw', padding:'1vw'}}>
                <h2 style={{fontFamily:'Poppins, sans-serif', fontSize:'2em'}}>{route.rating}</h2>
            </div>
            </Card.Content>
        </Card>
        </Link>
    )
}