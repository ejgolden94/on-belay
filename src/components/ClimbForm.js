import React, { Component } from 'react'
import { Redirect} from 'react-router'
import {Form, Segment, Container, Header, Button} from 'semantic-ui-react'
import BackButton from './BackButton'

const climbTypeOptions = [
    { key: 'Sport', value: 'Sport', text: 'Sport' },
    { key: 'Top Rope', value: 'Top Rope', text: 'Top Rope' },
    { key: 'Boulder', value: 'Boulder', text: 'Boulder' },
    { key: 'Trad', value: 'Trad', text: 'Trad' },
    { key: 'Mountaineering', value: 'Mountaineering', text: 'Mountaineering' },
    { key: 'Free Solo', value: 'Free Solo', text: 'Free Solo'}
  ]

  const climbSettingOptions = [
    { key: 'Gym', value: 'Gym', text: 'Gym' },
    { key: 'Outdoor', value: 'Outdoor', text: 'Outdoor'}
  ]

  const performanceOptions = [
    { key: 'On-sight', value: 'On-sight', text: 'On-sight' },
    { key: 'Flash', value: 'Flash', text: 'Flash' },
    { key: 'Redpoint', value: 'Redpoint', text: 'Redpoint' },
    { key: 'Smooth Project', value: 'Smooth Project', text: 'Smooth Project' },
    { key: 'Rough Project', value: 'Rough Project', text: 'Rough Project' },
    { key: 'Did Not Complete', value: 'Did Not Complete', text: 'Did Not Complete'}
  ]

export default class ClimbForm extends Component {
    constructor(props) {
        super(props);
        this.baseURL = this.props.baseURL
        const context = this.props.location.pathname.split('/')[3]? this.props.location.pathname.split('/')[3]: this.props.location.pathname.split('/')[2]
        if (context === 'edit') {
            const image = this.props.climb.image? this.props.climb.image : 'No Image'
            const notes = this.props.climb.notes? this.props.climb.notes : 'No Notes'
            const time = this.props.climb.time? this.props.climb.time : 'No Time Recorded'
            this.state={
                climb_type: this.props.climb.climb_type,
                gym_outdoor: this.props.climb.gym_outdoor,
                image: image,
                notes: notes,
                performance: this.props.climb.performance,
                time: time,
                id: this.props.climb.id,
                success: false,
                context: context
            }
        } else if(context === 'new') {
            this.state={
                climb_type: '',
                gym_outdoor: '',
                image: '',
                notes: '',
                performance: '',
                time: 0,
                id:'',
                route: 1,
                success: false,
                context: context
            }
        }
    }

    editClimb = async() => {
        const url = this.baseURL + '/climbs/' + this.state.id 
        const body = this.state
        delete body.success;
        delete body.context;

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        const editClimb = await fetch(url,requestOptions).then(response => response.json())
        console.log(editClimb);
        if (editClimb.status===200){
            this.setState({
                success: true
            })
        }
    }

    createClimb = async() => {
        const url = this.baseURL + '/climbs/'
        const body = this.state
        delete body.success;
        delete body.context;
        delete body.id;

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        const newClimb = await fetch(url,requestOptions).then(response => response.json())
        console.log(newClimb);
        if (newClimb.status===201){
            this.setState({
                success: true,
                id: newClimb.data.id
            })
        }
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
            this.editClimb()
        } else if (context === 'new'){
            this.createClimb()
        }
    }

    render() {
        console.log(this.state);
        if (this.state.success){
           return <Redirect to={'/climbs/'+this.state.id} />
        }
        return(
            <Container style={{minHeight:'90vh'}}>
            <BackButton/>
            <Header as='h2'>{this.state.context} Climb Log</Header>
            <Segment style={{margin: '2vh auto 5vh auto'}}>
            <Form onSubmit={(event)=>this.handleSubmit(event)}>
                <Form.Dropdown
                    placeholder={this.state.climb_type} 
                    fluid
                    search
                    selection
                    name='climb_type'
                    id='climb_type'
                    options={climbTypeOptions}
                    value= {this.state.climb_type}
                    onChange={this.handleDropDown}
                />
                <Form.Dropdown
                    placeholder={this.state.gym_outdoor} 
                    fluid
                    selection
                    name='gym_outdoor'
                    id='gym_outdoor'
                    options={climbSettingOptions}
                    value= {this.state.gym_outdoor}
                    onChange={this.handleDropDown}
                />
                <Form.Input 
                    type='text'
                    name='image'
                    id='image'
                    value={this.state.image}
                    onChange={this.handleChange}
                />
                <Form.TextArea
                    name='notes'
                    id='notes'
                    value={this.state.notes}
                    onChange={this.handleChange}
                />
                <Form.Dropdown
                    placeholder={this.state.performance} 
                    fluid
                    selection
                    name='performance'
                    id='performance'
                    options={performanceOptions}
                    value= {this.state.performance}
                    onChange={this.handleDropDown}
                />
                <Form.Input 
                    type='number'
                    name='time'
                    id='time'
                    value={this.state.time}
                    onChange={this.handleChange}
                />
                {this.state.context === 'edit'?             
                <Button color='purple'>Submit Edits</Button>:
                <Button color='purple'>Create New Climb</Button>}
            </Form>
            </Segment>
            </Container>
        )
    }
    
}
