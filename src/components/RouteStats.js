import React from 'react'
import {calculateRatingClass} from '../calculateRatingClass'

export default function RouteStats(props) {
    const {route, climbs} = props
    const countClimbs = (climbsArr) => {
        if(climbsArr){
            return climbsArr.length
        } else {
            return 0
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
            return successes.length
        } else {
            return 0
        }
    }
    const ratingColor = calculateRatingClass(route.rating)
    return (
        <div className='route-stats' style={{backgroundColor:`${ratingColor}`}}>
            <div
                style={{color:'white', padding:'7vw', fontFamily:'Poppins, sans-serif', fontSize:'calc(30px + 30 * ((100vw - 320px) / 1050))', fontWeight:'bold'}}
            >{route.rating}</div>
            <div style={{display:'flex', width:'50%', justifyContent: 'space-evenly', color:'white', fontWeight:'bold'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <h2 style={{fontFamily:'Poppins, sans-serif', margin:'0', fontSize: 'calc(22px + 22 * ((100vw - 320px) / 1050))'}}>{route.height}'</h2>
                    <p style={{fontSize: 'calc(10px + 6 * ((100vw - 320px) / 1050))'}}>Height</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <h2 style={{fontFamily:'Poppins, sans-serif', margin:'0', fontSize: 'calc(22px + 22 * ((100vw - 320px) / 1050))' }}>{countClimbs(climbs)}</h2>
                    <p style={{fontSize: 'calc(10px + 6 * ((100vw - 320px) / 1050))'}}>Climbs</p>
                </div>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <h2 style={{fontFamily:'Poppins, sans-serif', margin:'0', fontSize: 'calc(22px + 22 * ((100vw - 320px) / 1050))'}}>{countSuccesses(climbs)}</h2>
                    <p style={{fontSize: 'calc(10px + 6 * ((100vw - 320px) / 1050))'}}>Successes</p>
                </div>
            </div>
        </div>
    )
}