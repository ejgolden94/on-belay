import React, { Component } from 'react'
import { Redirect} from 'react-router'
import {Form, Segment, Image} from 'semantic-ui-react'
import Footer from './Footer'
import {capitalize} from '../capitalize'
import Nav from './Nav'

const climbTypeOptions = [
    { key: 'Sport', value: 'Sport', text: 'Sport' },
    { key: 'Top Rope', value: 'Top Rope', text: 'Top Rope' },
    { key: 'Boulder', value: 'Boulder', text: 'Boulder' },
    { key: 'Trad', value: 'Trad', text: 'Trad' },
    { key: 'Mountaineering', value: 'Mountaineering', text: 'Mountaineering' },
    { key: 'Free Solo', value: 'Free Solo', text: 'Free Solo'}
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
        this.climbSetting = this.props.climbSetting
        const context = this.props.location.pathname.split('/')[3]? this.props.location.pathname.split('/')[3]: this.props.location.pathname.split('/')[2]
        if (context === 'edit') {
            const image = this.props.climb.image? this.props.climb.image : 'No Image'
            const notes = this.props.climb.notes? this.props.climb.notes : 'No Notes'
            const time = this.props.climb.time? this.props.climb.time : 'No Time Recorded'
            this.state={
                climb_type: this.props.climb.climb_type,
                image: image,
                notes: notes,
                performance: this.props.climb.performance,
                time: time,
                id: this.props.climb.id,
                success: false,
                context: context
            }
        } else if(context === 'new') {
            const route = this.props.indoorRouteId? this.props.indoorRouteId: this.props.route.id
            if(this.props.indoorRouteId){ this.props.setIndoorRouteId('') }
            
            this.state={
                climb_type: 'Choose One',
                image: '',
                notes: '',
                performance:'Choose One',
                time: 0,
                id:'',
                route: route,
                success: false,
                context: context
            }
        }
    }

    editClimb = async() => {
        const url = this.baseURL + '/climbs/' + this.state.id 
        const body = this.state
        if(body.image === 'No Image') { delete body.image }
        if(body.notes === 'No Notes') { delete body.notes }
        if(body.time === 'No Time Recorded') { delete body.time }
        delete body.success;
        delete body.context;

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        const editClimb = await fetch(url,requestOptions).then(response => response.json())

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
        if (this.state.success){
           return <Redirect to={'/climbs/'+this.state.id} />
        }
        return(
            <div className='page-and-footer'>
            <Nav baseURL={this.props.baseURL} currentUser={this.props.currentUser}/>
            <div>
            <h2 className='page-headers'>{capitalize(this.state.context)} Climb Log</h2>
            <Segment className='form-segment'>
            <Form size='large' onSubmit={(event)=>this.handleSubmit(event)} style={{textAlign: 'left'}}>
                <Form.Dropdown
                    placeholder={this.state.climb_type} 
                    label='Climb Type'
                    fluid
                    search
                    selection
                    name='climb_type'
                    id='climb_type'
                    options={climbTypeOptions}
                    value= {this.state.climb_type}
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
                <Form.TextArea
                    name='notes'
                    label='Notes'
                    id='notes'
                    value={this.state.notes}
                    onChange={this.handleChange}
                />
                <br/>
                <Form.Dropdown
                    placeholder={this.state.performance} 
                    fluid
                    label='Performance'
                    selection
                    name='performance'
                    id='performance'
                    options={performanceOptions}
                    value= {this.state.performance}
                    onChange={this.handleDropDown}
                />
                <br/>
                <Form.Input 
                    type='number'
                    label='Time'
                    name='time'
                    id='time'
                    value={this.state.time}
                    onChange={this.handleChange}
                />
                <div style={{width: '100%', textAlign:'center'}}>
                    <Image as='button' src='/on-belay_right-arrow-button.png' className='go-btn'/>
                </div>
            </Form>
            </Segment>
            </div>
            <Footer/>
            </div>
        )
    }
    
}
