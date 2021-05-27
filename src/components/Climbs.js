import React, {useState, useEffect} from 'react' 
import {Container, Header} from 'semantic-ui-react'
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
    },[])

    console.log(climbs);
    return (
        <Container style={{margin:'50px auto', minHeight:'80vh'}}>
        <Header>Your Climbs</Header>
        {climbs? climbs.map(climb => <ClimbCard key={climb.id} climb={climb}/>): ''}
        </Container>
    )
}
