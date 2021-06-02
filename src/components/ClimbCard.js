import React from 'react' 
import {Card, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {calculateRatingClass} from '../calculateRatingClass'
import {formatDate} from '../formatDate'

export default function ClimbCard (props){
    const {climb} = props

    return(
        <Link to={'/climbs/'+ climb.id} style={{color:'inherit'}}>
        <Card key={climb.id} className='climbcard'>
            <Card.Header>{climb.route.name}</Card.Header>
            <Card.Content className='climbcard-content'>
                <div className={'circle'} style={{height:'50px', width:'50px', color: 'white', backgroundColor:`${calculateRatingClass(climb.route.rating)}`}}>
                    {climb.route.rating}
                </div>
                <div>
                    {formatDate(climb.created, 'long')}
                    <div>
                        <Icon
                            name='lightning'
                            color='yellow'
                        />
                        {climb.performance}
                    </div>
                </div>
            </Card.Content>
        </Card>
        </Link>
    )
}