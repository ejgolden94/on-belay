import React from 'react'
import {calculateRatingClass} from '../calculateRatingClass'

export default function ClimbStats(props) {
    const {climb} = props
    const route= climb.route

    const ratingColor = calculateRatingClass(climb.route.rating)
    return (
        <div className='climb-stats' style={{backgroundColor:`${ratingColor}`}}>
            <div style={{minWidth:'30%', padding:'1vh'}}>
                <div style={{color:'white', padding:'3vw', fontFamily:'Poppins, sans-serif', fontSize:'calc(30px + 20 * ((100vw - 320px) / 1050))', fontWeight:'bold'}}
                >{route.rating}</div>
                <div style={{display:'flex', justifyContent: 'space-evenly', color:'white', fontWeight:'bold'}}>
                    <div style={{backgroundColor:'rgba(255,255,255,0.2)', padding:'1vh', borderRadius:'1vh'}}>{climb.climb_type}</div>
                    <div style={{backgroundColor:'rgba(255,255,255,0.2)', padding:'1vh', borderRadius:'1vh',marginLeft: '2vw'}}>{climb.performance}</div>
                </div>
            </div>
            <div style={{textAlign:'left', minWidth:'30%', padding:'1vh'}}>
                <p><strong>Wall Type: </strong>{route.wall_type}</p>
                <p><strong>Height: </strong>{route.height}</p>
                <p><strong>Time: </strong>{climb.time > 0? climb.time: '--'}</p>
            </div>
        </div>
    )
}