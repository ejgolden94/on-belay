import React from 'react'
import {calculateRatingClass} from '../calculateRatingClass'

export default function RouteDetails (props){
    const {route} = props
    return (
        <>
        <div className='route-desc'>
            <div className={'circle '+calculateRatingClass(route.rating)} style={{marginRight:'10px', minWidth:'75px', height:'75px'}}>
                {route.rating}
            </div>
            <div>
                {route.description}
            </div>
        </div>
        <div className='route-desc'>
            <h4 style={{marginRight:'10px'}}>Height:</h4>
            {route.height}'
        </div>
        <div className='route-desc'>
            <h4 style={{marginRight:'10px'}}>Protection:</h4>
            {route.protection}
        </div>
        <div className='route-desc'>
            <h4 style={{marginRight:'10px'}}>Location:</h4>
            {route.location}
        </div>
        <div className='route-desc'>
            <h4 style={{marginRight:'10px'}}>Wall Characteristic:</h4>
            {route.wall_type}
        </div>
        </>
        )
}