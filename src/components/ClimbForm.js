import React, { Component } from 'react'
import { Redirect } from 'react-router'
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
            success: false
        }
    }

    editClimb = async() => {
        const url = this.baseURL + '/climbs/' + this.props.climb.id 
        const body = this.state
        delete body.success;

        const requestOptions = {
            method:'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        let editClimb = await fetch(url,requestOptions).then(response => response.json())
        console.log(editClimb);
        if (editClimb.status===200){
            this.setState({
                success: true
            })
        }
        ;
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
        event.preventDefault()
        this.editClimb()
    }

    render() {
        console.log(this.state);
        if (this.state.success){
           return <Redirect to={'/climbs/'+this.props.climb.id} />
        }
        return(
            <Container style={{minHeight:'90vh'}}>
            <BackButton/>
            <Header as='h2'>Edit Climb Log</Header>
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
                <Button color='purple'>Submit Edits</Button>
            </Form>
            </Segment>
            </Container>
        )
    }
    
}
