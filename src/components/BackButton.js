import React from 'react' 
import {useHistory} from 'react-router-dom'
import {Button, Image} from 'semantic-ui-react'


export default function BackButton (){
    const history = useHistory()

    const goBack = () => {
        history.goBack()
    }
    
    return(
        <Button onClick={goBack} className='back-btn'>
            <Image 
                src="/on-belay_left-arrow-button.png"
                className='back-btn-image'
            />
        </Button>
    )
}