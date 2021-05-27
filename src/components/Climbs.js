import React, {useState, useEffect} from 'react' 
import {Card, Icon} from 'semantic-ui-react'

export default function Climbs(props) {
    const {baseURL} = props
    const [climbs, setClimbs] = useState([])

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

      return (
        <ul>
            {climbs? climbs.map(climb => 
            <li key={climb.id}>
                <Icon
                    name='lightning'
                    color='yellow'
                />
                {climb.performance}
            </li>): ''}
        </ul>
      )
}
