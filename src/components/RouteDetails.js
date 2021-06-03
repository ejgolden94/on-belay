import React from 'react'

export default function RouteDetails (props){
    const {route} = props
    return (
        <>
        {route.description?
        <div className='route-desc'>
            {route.description}
        </div> : ''}
        <div className='route-desc'>
            <h4 style={{marginRight:'10px'}}>Height:</h4>
            {route.height}'
        </div>
        {route.gym_outdoor === 'Outdoor'?
        <div className='route-desc'>
            <h4 style={{marginRight:'10px'}}>Protection:</h4>
            {route.protection}
        </div>:''}
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