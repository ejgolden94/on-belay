import React from 'react' 
import {Divider, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {calculateRatingClass} from '../calculateRatingClass'
import {formatDate} from '../formatDate'

export default function ClimbCard (props){
    const {climb, location} = props
    const ratingColor = calculateRatingClass(climb.route.rating)
    return(
        <Link to={'/climbs/'+ climb.id} style={{color:'inherit'}}>
        {/* <Card key={climb.id} className='climbcard'>
            <Card.Content className='climbcard-content'> */}
            <div className='climbcard'> 
                <div className='climbcard-content'>
                    <img src='/on-belay_climb-log-icon.png' alt='climber icon' style={{maxHeight:'8vh'}}/>

                    <div className='climbcard-desc'>
                        {/* CLIMB SETTING */}
                        <div style={{color:'#999999'}}>{formatDate(climb.created, 'long')} | {climb.route.gym_outdoor}</div>
                        
                        {/* CLIMB NAME */}
                        {location === 'climbs'? 
                        <div><h2 style={{margin:'1.5vh'}}>{climb.route.name? climb.route.name : climb.route.location}</h2></div>
                        :''}

                        {/* CLIMB TAGS: type, performance, rating */}
                        <div style={{display:'flex', alignItems: 'center',justifyContent: 'space-evenly'}}>
                            <div style={{color:'white', backgroundColor:`${ratingColor}`, padding:'1.5vmin', borderRadius:'2vmin', fontWeight:'700'}}>
                                {climb.climb_type}
                            </div>
                            <div style={{color:'white', backgroundColor:`${ratingColor}`, padding:'1.5vmin', borderRadius:'2vmin', margin: '1vw', fontWeight:'700'}}>
                                {climb.route.rating}
                            </div>
                            <div style={{color:'white', backgroundColor:`${ratingColor}`, padding:'1.5vmin', borderRadius:'2vmin', fontWeight:'700'}}>
                                {climb.performance}
                            </div>
                        </div>
                    </div>
                    <Icon name='angle right' color='grey' size='large'/>
                </div>
            </div>      
            <Divider className='climbDivider' />








                {/* <div className={'circle'} style={{height:'50px', width:'50px', color: 'white', backgroundColor:`${calculateRatingClass(climb.route.rating)}`}}>
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
                </div> */}
            {/* </Card.Content>
        </Card> */}
        </Link>
    )
}