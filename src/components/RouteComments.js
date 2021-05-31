import React, {useState, useEffect} from 'react' 
import {Comment, Rating} from 'semantic-ui-react'
import {formatDate} from '../formatDate'

export default function RouteComments(props){
    const {baseURL, routeId} = props
    const [comments, setcomments] = useState([]);

    useEffect(()=>{
        const getRouteComments = async() => {
            const url = baseURL+'/comments/route_comments/'+routeId
            const requestOptions = {
                method:'GET',
                credentials:'include'
            }
            const comments = await fetch(url, requestOptions).then(response => response.json())
            setcomments(comments.data)
        }
        getRouteComments()
    }, [baseURL, routeId])


    console.log(comments)
    return(
        'hey'
    )
}