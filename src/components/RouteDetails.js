import React from 'react'
import {formatDate} from '../formatDate'

export default function RouteDetails (props){
    const {route} = props
    return (
        <div style={{width:'90%', maxWidth:'1024px', margin: '0 auto'}}>
        <div style={{fontSize: 'calc(14px + 2 * ((100vw - 320px) / 1050))', lineHeight:'1.5'}}>
        {route.description?
        <div className='route-desc'>
            {route.description}
        </div> : ''}
        <div className='route-desc'>
            <p style={{marginRight:'10px', fontWeight:'700'}}>Height:</p>
            {route.height}'
        </div>
        {route.gym_outdoor === 'Outdoor'?
        <div className='route-desc'>
            <p style={{marginRight:'10px', fontWeight:'700'}}>Protection:</p>
            {route.protection}
        </div>:''}
        <div className='route-desc'>
            <p style={{marginRight:'10px', fontWeight:'700'}}>Location:</p>
            {route.location}
        </div>
        <div className='route-desc'>
            <p style={{marginRight:'10px', fontWeight:'700'}}>Wall Characteristic:</p>
            {route.wall_type}
        </div>
        </div>
        <div className='route-meta'>
            <em style={{display:'block'}}>This route was created on {formatDate(route.created)}.</em>
            <em style={{display:'block'}}>This route was created by On Belay user, {route.creator.username}.</em>
        </div>
        </div>
        )
}