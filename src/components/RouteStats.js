import React from 'react'
import {Segment} from 'semantic-ui-react'

export default function RouteStats(props) {
    const {route, climbs} = props
    const countClimbs = (climbsArr) => {
        if(climbsArr){
            return climbsArr.length===1? climbsArr.length + ' climb' :  climbsArr.length + ' climbs' 
        } else {
            return '0 climbs'
        }
    }

    const calcHeightClimbed = (climbsArr) => {
        if(climbsArr){
            return climbsArr.length * route.height
        } else {
            return 0
        }
    }

    const countSuccesses = (climbsArr) => {
        if(climbsArr){
            const successes = climbsArr.filter(element => ['Flash', 'On-sight', 'Redpoint'].includes(element.performance))
            return successes.length === 1? successes.length + ' success': successes.length + ' successes'
        } else {
            return `0 successes`
        }
    }

    return (
        <Segment className='stats' style={{backgroundColor:'lightgray', margin:'0 0 2vh 0'}}>
                    <div>Your Stats:</div>
                    <div>{countClimbs(climbs)}</div>
                    <div>{calcHeightClimbed(climbs)}' climbed</div>
                    <div>{countSuccesses(climbs)}</div>
        </Segment>
    )
}