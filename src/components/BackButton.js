import React from 'react' 
import {useHistory} from 'react-router-dom'
import {Button, Icon} from 'semantic-ui-react'


export default function BackButton (){
    const history = useHistory()

    const goBack = () => {
        history.goBack()
    }
    
    return(
        <Button icon onClick={goBack} className='back-btn' circular 
            color='teal'>
            <Icon 
            name='angle left' 
            size='large' 
            />
        </Button>
    )
}