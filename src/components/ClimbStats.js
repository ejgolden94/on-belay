import React from 'react'
import {calculateRatingClass} from '../calculateRatingClass'

export default function ClimbStats(props) {
    const {climb} = props
    const route= climb.route

    const ratingColor = calculateRatingClass(climb.route.rating)
    return (
        <div className='route-stats' style={{backgroundColor:`${ratingColor}`}}>
            <div style={{width:'50%'}}>
                <div style={{color:'white', padding:'7vw', fontFamily:'Poppins, sans-serif', fontSize:'calc(30px + 20 * ((100vw - 320px) / 1050))', fontWeight:'bold'}}
                >{route.rating}</div>
                <div style={{display:'flex', justifyContent: 'space-evenly', color:'white', fontWeight:'bold'}}>
                    <div style={{backgroundColor:'rgba(255,255,255,0.2)', padding:'1vh', borderRadius:'1vh'}}>{climb.climb_type}</div>
                    <div style={{backgroundColor:'rgba(255,255,255,0.2)', padding:'1vh', borderRadius:'1vh'}}>{climb.performance}</div>
                </div>
            </div>
        </div>
    )
}