import React from 'react' 
import {Card, Icon} from 'semantic-ui-react'

export default function ClimbCard (props){
    const {climb} = props

    const convertDate = (dateString) => {
        const d = new Date(dateString)
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return d.toLocaleDateString('en',dateOptions)
    }

    const calculateRatingClass = (rating) => {
        if (rating === '5.5'){
            return 'five'
        } else if (rating === '5.6'){
            return 'six'
        } else if (rating === '5.7'){ 
          return 'seven'
        } else if (rating === '5.8'){
         return 'eight'
        } else if (rating === '5.9'){
          return 'nine'
        } else if (rating === '5.10-' || rating === '5.10a'){
          return 'ten-minus'
        } else if (rating === '5.10' || rating === '5.10b' || rating === '5.10c'){  
          return 'ten'
        } else if (rating === '5.10+' || rating === '5.10d'){
          return 'ten-plus'
        } else if (rating === '5.11-' || rating === '5.11a'){ 
          return 'eleven-minus'
        } else if (rating === '5.11' || rating === '5.11b' || rating === '5.11c'){    
          return 'eleven'
        } else if (rating === '5.11+' || rating === '5.11d'){  
          return 'eleven-plus'
        } else if (rating === '5.12-' || rating === '5.12a'){   
          return 'twelve-minus'
        } else if (rating === '5.12' || rating === '5.12b' || rating === '5.12c'){    
          return 'twelve'
        } else if (rating === '5.12+' || rating === '5.12d'){   
          return 'twelve-plus'
        } else if (rating.includes('5.13')){  
          return 'thirteen'
        } else if (rating.includes('5.14')){   
          return 'fourteen'
        } else if (rating.includes('5.15')){  
          return 'fifteen'
        }
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