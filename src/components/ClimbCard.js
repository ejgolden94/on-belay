import React from 'react' 
import {Card, Icon} from 'semantic-ui-react'
import {calculateRatingClass} from '../calculateRatingClass'

export default function ClimbCard (props){
    const {climb} = props

    const convertDate = (dateString) => {
        const d = new Date(dateString)
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return d.toLocaleDateString('en',dateOptions)
    }

    return(
        <Card key={climb.id} className='climbcard'>
            <Card.Header>{climb.route.name}</Card.Header>
            <Card.Content className='climbcard-content'>
                <div className={'circle '+calculateRatingClass(climb.route.rating)} style={{height:'50px', width:'50px'}}>
                    {climb.route.rating}
                </div>
                <div>
                    {convertDate(climb.created)}
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
    )
}