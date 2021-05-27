import React, {useState, useEffect} from 'react' 
import {useLocation} from 'react-router-dom'
import {Container, Header} from 'semantic-ui-react'
import NotFound from './NotFound'

export default function Climb (props){
    const {baseURL} = props
    const location = useLocation()
    const climbId = location.pathname.split('/')[2]
    const [climb, setClimb] = useState({});

    useEffect(() => {
        const getClimb = async() => {
            const url = baseURL+'/climbs/'+climbId
            const requestOptions = {
                method: 'GET',
                credentials: 'include'
            }
            const climb = await fetch(url, requestOptions).then(response => response.json())
            setClimb(climb)
        }
        getClimb()
    }, []);

    console.log(climb);
    if (climb.status === 404){
        return <NotFound redirect='Climbs' redirectTo='/climbs'/>
    }
    return(
        <Container style={{minHeight:'90vh'}}>
            <Header>Hey Climb {climbId}</Header>
        </Container>
    )
}