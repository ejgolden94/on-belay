import React, {useState, useEffect} from 'react' 
import {Card, Container, Icon} from 'semantic-ui-react'

export default function Climbs(props) {
    const {baseURL} = props
    const [climbs, setClimbs] = useState([])

    const convertDate = (dateString) => {
        const d = new Date(dateString)
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return d.toLocaleDateString('en',dateOptions)
    }
    useEffect(() => {
        const getClimbs = async() => {
            const url = baseURL+'/climbs/'
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

    // created_date = new Date(climb.created)
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    console.log(climbs);
    return (
        <Container style={{margin:'50px auto'}}>
        {climbs? climbs.map(climb => 
            <Card key={climb.id} className='climbcard'>
                <Card.Header>{climb.route.name}</Card.Header>
                <Card.Content className='climbcard-content'>
                    <div className='circle' style={{height:'50px', width:'50px'}}>
                        {climb.route.rating}
                    </div>
                    <div>
                        {convertDate(climb.created)}
                        <div>
                            <Icon
                                name='lightning'
                                color='yellow'
                            />
                            {climb.performance}
                        </div>
                    </div>
                </Card.Content>
            </Card>): ''}
        </Container>
    )
}
