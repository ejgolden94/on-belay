import React, { Component } from 'react'
import {Form} from 'semantic-ui-react'

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


export default class EditClimbForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            climb_type: this.props.climb.climb_type,
            gym_outdoor: this.props.climb.gym_outdoor,
            image: this.props.climb.image,
            notes: this.props.climb.notes,
            performance: this.props.climb.performance,
            time: this.props.climb.time
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

    render() {
        console.log(this.state);
        return(
            <Form>
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
                    value={this.state.image? this.state.image: 'No Image' }
                    onChange={this.handleChange}
                />
                <Form.TextArea
                    name='notes'
                    id='notes'
                    value={this.state.notes? this.state.notes: 'No Notes' }
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
                    value={this.state.time? this.state.time: 'No Time Recorded' }
                    onChange={this.handleChange}
                />
            </Form>
        )
    }
    
}
