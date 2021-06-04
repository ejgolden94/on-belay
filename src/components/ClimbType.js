import React from 'react' 
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Nav from './Nav'

export default function CreateClimb(props){
    const {setClimbSetting, baseURL, currentUser} = props
    return(
        <div className='page-and-footer'>
        <Nav baseURL={baseURL} currentUser={currentUser}/>
        <h2 className='page-headers font-inherit'>Log A Climb</h2>
        <h2 className='page-sub-headers font-inherit'>Choose Your Climb Setting</h2>
        <div className='climb-type-container'>
            <Link to='/routes' className='outdoor circle climb-type' onClick={()=>{setClimbSetting('Outdoor')}}>
            <div >
               <p>Outdoor</p>
            </div> 
            </Link>
            <Link to='/routes/new' className='indoor circle climb-type' onClick={()=>{setClimbSetting('Indoor')}}>
            <div>
                <p>Indoor</p>
            </div> 
            </Link>
        </div>
        <Footer />
        </div>

    )
}