import React, {useState, useEffect} from 'react' 
import {Button, Comment, Rating} from 'semantic-ui-react'
import {formatDate} from '../formatDate'

export default function RouteComments(props){
    const {baseURL, routeId} = props
    const [comments, setcomments] = useState([]);
    const [seeAll, setSeeAll] = useState(false)

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
    let limit = 2
    if(seeAll){ limit = comments.length }
    console.log(comments.slice(0,limit))
    return(
        <>
        {comments.slice(0,limit).map(comment => {
            return(
            <Comment style={{textAlign:'left'}}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
                <Comment.Author>{comment.creator.username}</Comment.Author>
                <Comment.Metadata>
                {formatDate(comment.created, 'time')}
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
            </Comment.Content>
            </Comment>
        )})}
        {!seeAll?
        <Button size='mini' color='purple' inverted onClick={()=>setSeeAll(true)}>See All Comments</Button> : 
        <Button size='mini' color='purple' inverted onClick={()=>setSeeAll(false)}>Collapse Comments</Button> }
        </>
    )
}