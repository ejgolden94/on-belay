import React from 'react' 
import { Link } from 'react-router-dom'
import BackButton from './BackButton'
import Footer from './Footer'

export default function CreateClimb(props){
    const {setClimbSetting} = props
    return(
        <>
        <BackButton />
        <div className='climb-type-container'>
            <Link to='/routes'>
            <div 
                onClick={()=>{setClimbSetting('Outdoor')}} 
                className='outdoor circle climb-type'
                >
               <p>Outdoor</p>
            </div> 
            </Link>
            <Link to='/routes/new'>
            <div 
                onClick={()=>{setClimbSetting('Indoor')}} 
                className='indoor circle climb-type'
                >
                <p>Indoor</p>
            </div> 
            </Link>
        </div>
        <Footer />
        </>

    )
}