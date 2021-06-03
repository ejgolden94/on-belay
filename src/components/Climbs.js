import React, {useState, useEffect} from 'react' 
import { Link } from 'react-router-dom'
import {Button, Icon, Divider} from 'semantic-ui-react'
import BackButton from './BackButton'
import ClimbCard from './ClimbCard'
import Footer from './Footer'

export default function Climbs(props) {
    const {baseURL} = props
    const [climbs, setClimbs] = useState([])

    useEffect(() => {
        const getClimbs = async() => {
            const url = baseURL+'/climbs/my_climbs'
            const requestOptions = {
                method:'GET',
                credentials: 'include',
                mode: 'cors',
            }
            const climbs = await fetch(url,requestOptions).then(response => response.json())
            setClimbs(climbs.data)
            }
        getClimbs()
    },[baseURL])

    return (
        <div className='page-and-footer'>
            <BackButton />
            <div>
                <h2 className='page-headers'>Your Climbs</h2>
                <Divider className='climbDivider'/>
                {climbs? climbs.map(climb => <ClimbCard key={climb.id} climb={climb}/>): ''}
                <Button icon circular as={Link} to={'/climbs/type'} color='purple' className='add-btn'>
                    <Icon name='add' size='big'/>
                </Button>
            </div>
            <Footer />
        </div>
    )
}
