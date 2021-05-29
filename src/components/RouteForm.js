import React, { Component } from 'react'
import { Redirect} from 'react-router'
import {Form, Segment, Container, Header, Button} from 'semantic-ui-react'
import BackButton from './BackButton'

const climbWallOptions = [
    { key: 'Slab', value: 'Slab', text: 'Slab' },
    { key: 'Vetical', value: 'Vertical', text: 'Vertical' },
    { key: 'Overhang', value: 'Overhang', text: 'Overhang' }
  ]
const ratingPrefixOptions=[
    { key: '5', value: '5', text: '5' },
    { key: 'V', value: 'V', text: 'V' }
]
const ratingOptions = [
{ key: 'B', value: 'B', text: 'B' },
{ key: '0', value: '0', text: '0' },
{ key: '1', value: '1', text: '1' },
{ key: '2', value: '2', text: '2' },
{ key: '3', value: '3', text: '3' },
{ key: '4', value: '4', text: '4' },
{ key: '5', value: '5', text: '5' },
{ key: '6', value: '6', text: '6' },
{ key: '7', value: '7', text: '7' },
{ key: '8', value: '8', text: '8' },
{ key: '9', value: '9', text: '9' },
{ key: '10', value: '10', text: '10' },
{ key: '11', value: '11', text: '11' },
{ key: '12', value: '12', text: '12' },
{ key: '13', value: '13', text: '13' },
{ key: '14', value: '14', text: '14' },
{ key: '15', value: '15', text: '15' },
{ key: '16', value: '16', text: '16' }
]
const ratingSuffixOptions=[
    { key: '-', value: '-', text: '-' },
    { key: '+', value: '+', text: '+' },
    { key: 'a', value: 'a', text: 'a' },
    { key: 'b', value: 'b', text: 'b' },
    { key: 'c', value: 'c', text: 'c' },
    { key: 'd', value: 'd', text: 'd' },
    { key: '', value: '', text: 'N/A' },
]

export default class ClimbForm extends Component {
    constructor(props) {
        super(props);
        this.baseURL = this.props.baseURL
        const context = this.props.location.pathname.split('/')[3]? this.props.location.pathname.split('/')[3]: this.props.location.pathname.split('/')[2]
        if (context === 'edit') {

            const image = this.props.route.image? this.props.route.image : 'No Image'
            let ratingPrefix = ''
            let rating = ''
            let ratingSuffix = '' 
            if (this.props.route.rating[0] === 'V'){
                ratingPrefix = 'V'
                rating=this.props.route.rating.slice(1)
            }else{
                ratingPrefix = '5'
                rating=this.props.route.rating.split('.')[1].slice(0,this.props.route.rating.length - 2)
                ratingSuffix=this.props.route.rating[this.props.route.rating.length - 1]
            }

            this.state={
                name: this.props.route.name,
                location: this.props.route.location,
                height: this.props.route.height,
                ratingPrefix: ratingPrefix,
                rating: rating,
                ratingSuffix: ratingSuffix,
                wall_type: this.props.route.wall_type,
                description: this.props.route.description,
                protection: this.props.route.protection,
                image: image,
                id: this.props.route.id,
                success: false,
                context: context
            }
        } else if(context === 'new') {
            this.state={
                name: '',
                location: '',
                height: '',
                ratingPrefix: '',
                rating: '',
                ratingSuffix: '',
                wall_type: '',
                description: '',
                protection: '',
                image: '',
                id: '',
                success: false,
                context: context
            }
        }
    }

    createRoute = async() => {
        const url = this.baseURL + '/routes/'

        const body = this.state
        body.rating =  body.ratingPrefix === 'V'? 
            body.ratingPrefix + body.rating + body.ratingSuffix:
            body.ratingPrefix + '.' + body.rating + body.ratingSuffix
        delete body.success
        delete body.context
        delete body.id
        delete body.ratingPrefix
        delete body.ratingSuffix 
        console.log(body)

        const requestOptions = {
            method:'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }
    
        let newRoute = await fetch(url,requestOptions).then(response => response.json())
        console.log(newRoute);
        if (newRoute.status===201){
            this.setState({
                success: true,
                id: newRoute.data.id
            })
        }
    }


    editRoute = async() => {
        const url = this.baseURL + '/routes/' + this.state.id 

        const body = this.state
        body.rating = body.ratingPrefix + body.rating + body.ratingSuffix
        delete body.success
        delete body.context
        delete body.ratingPrefix
        delete body.ratingSuffix 
        console.log(body)

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        // const editRoute = await fetch(url,requestOptions).then(response => response.json())
        // console.log(editRoute);
        // if (editRoute.status===200){
        //     this.setState({
        //         success: true
        //     })
        // }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleDropDown = (event, data) => {
        this.setState({
            [data.id]: data.value
        })
    }

    handleSubmit = (event) => {
        const {context} = this.state
        event.preventDefault()
        if (context === 'edit'){
            this.editRoute()
        } else if (context === 'new'){
            this.createRoute()
        }
    }

    render() {
        console.log(this.state);
        if (this.state.success){
           return <Redirect to={'/routes/'+this.state.id} />
        }
        return(
            <Container style={{minHeight:'90vh'}}>
            <BackButton/>
            <Header as='h2'>{this.state.context} Route</Header>
            <Segment style={{margin: '2vh auto 5vh auto'}}>
            <Form onSubmit={(event)=>this.handleSubmit(event)} style={{textAlign: 'left'}}>
                <Form.Input 
                    type='text'
                    label='Name'
                    name='name'
                    id='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                    />
                <br/>
                <Form.TextArea 
                    label='Description'
                    name='description'
                    id='description'
                    value={this.state.description}
                    onChange={this.handleChange}
                    />
                <br/>
                <Form.Input 
                    type='text'
                    label='Protection'
                    name='protection'
                    id='protection'
                    value={this.state.protection}
                    onChange={this.handleChange}
                    />
                <br/>
                <Form.Input 
                    type='text'
                    label='Location'
                    name='location'
                    id='location'
                    value={this.state.location}
                    onChange={this.handleChange}
                    />
                <br/>
                <Form.Input 
                    type='number'
                    label='Height'
                    name='height'
                    id='height'
                    value={this.state.height}
                    onChange={this.handleChange}
                    />
                <br/>
                <Form.Dropdown
                    placeholder={this.state.wall_type} 
                    label='Wall Characteristic'
                    fluid
                    search
                    selection
                    name='wall_type'
                    id='wall_type'
                    options={climbWallOptions}
                    value= {this.state.wall_type}
                    onChange={this.handleDropDown}
                />
                <br/>
                <Form.Input 
                    type='text'
                    label='Image'
                    name='image'
                    id='image'
                    value={this.state.image}
                    onChange={this.handleChange}
                />
                <br/>
                <Form.Dropdown
                    placeholder={this.state.ratingPrefix} 
                    fluid
                    label='Rating Prefix'
                    selection
                    name='ratingPrefix'
                    id='ratingPrefix'
                    options={ratingPrefixOptions}
                    value= {this.state.ratingPrefix}
                    onChange={this.handleDropDown}
                />
                <br/>
                <Form.Dropdown
                    placeholder={this.state.rating} 
                    fluid
                    label='Rating'
                    selection
                    name='rating'
                    id='rating'
                    options={ratingOptions}
                    value= {this.state.rating}
                    onChange={this.handleDropDown}
                />
                <br/>
                <Form.Dropdown
                    placeholder={this.state.ratingSuffix} 
                    fluid
                    label='Rating Suffix'
                    selection
                    name='ratingSuffix'
                    id='ratingSuffix'
                    options={ratingSuffixOptions}
                    value= {this.state.ratingSuffix}
                    onChange={this.handleDropDown}
                />
                <div style={{width: '100%', textAlign:'center'}}>
                {this.state.context === 'edit'? 
                    <Button color='purple'>Submit Edits</Button>         
                    :<Button color='purple'>Create New Climb</Button>}
                </div> 
            </Form>
            </Segment>
            </Container>
        )
    }
    
}
