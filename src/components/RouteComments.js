import React, {useState, useEffect} from 'react' 
import {Button, Comment, Container, Form} from 'semantic-ui-react'
import {formatDate} from '../formatDate'

export default function RouteComments(props){
    const {baseURL, routeId, comments, setcomments} = props
    const [newComment, setnewComment] = useState('')
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
    }, [baseURL, routeId, setcomments])

    const handleChange = (event) => {
        setnewComment(event.target.value)
    }

    const handleSubmit = async (event) => {
        const url = baseURL + '/comments/'
        const body = {
            text: newComment,
            route: routeId,
            rating: 5 // hardcoding for now since its currently doesnt accept nulls
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body),
            credentials: 'include'
        }
        const postedComment = await fetch(url,requestOptions).then(response => response.json())
        const commentsCopy = comments
        commentsCopy.unshift(postedComment.data)
        setcomments(commentsCopy)
        setnewComment('')
    }
   
    let limit = 2
    if(seeAll){ limit = comments.length }

    return(
        <Container style={{textAlign:'left', marginBottom: '5vh'}}>
        {!seeAll?
        <Button as='a' size='small' className='route-btns' onClick={()=>setSeeAll(true)}>See All Comments</Button> : 
        <Button as='a' size='small' className='route-btns'  onClick={()=>setSeeAll(false)}>Collapse Comments</Button> }
        <Comment.Group>
        {comments.slice(0,limit).map(comment => {
            return(
            <Comment key={comment.id} style={{marginTop: '2vh'}}>
            <Comment.Avatar src='/on-belay_profile-photo-placeholder_orange.png' />
            <Comment.Content>
                <Comment.Author as='a'>{comment.creator.username}</Comment.Author>
                <Comment.Metadata>
                    <div>{formatDate(comment.created, 'time')}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
            </Comment.Content>
            </Comment>
        )})}
        <Form reply fluid={true} style={{marginTop: '2vh'}} onSubmit={(event)=>handleSubmit(event)}>
            <Form.Input fluid={true} 
                type='text' 
                placeholder='Post a comment...'
                value={newComment}
                onChange={(event)=>handleChange(event)}
                />
        </Form>
        </Comment.Group>
        </Container>
    )
}