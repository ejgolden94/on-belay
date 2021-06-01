import React, {useState, useEffect} from 'react' 
import { Link } from 'react-router-dom'
import {Container, Header, Button, Icon} from 'semantic-ui-react'
import BackButton from './BackButton'
import ClimbCard from './ClimbCard'

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

    console.log(climbs);
    return (
        <Container style={{margin:'50px auto', minHeight:'80vh'}}>
        <BackButton />
        <Header as='h2'>Your Climbs</Header>
        {climbs? climbs.map(climb => <ClimbCard key={climb.id} climb={climb}/>): ''}
        <Button icon circular as={Link} to={'/climbs/type'} color='purple'>
            <Icon name='add'/>
        </Button>
        </Container>
    )
}
