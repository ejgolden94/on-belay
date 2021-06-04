import React, { Component } from 'react'
import { Redirect} from 'react-router'
import {Form, Segment, Image} from 'semantic-ui-react'
import Footer from './Footer'
import {capitalize} from '../capitalize'
import Nav from './Nav'

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

export default class RouteForm extends Component {
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
                rating=this.props.route.rating.split('.')[1].replace(/\D/g, '')
                ratingSuffix=this.props.route.rating.split('.')[1].replace(/[0-9]/g, '')
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
                gym_outdoor: this.props.climbSetting,
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
                ratingPrefix: 'Choose One',
                rating: 'Choose One',
                ratingSuffix: 'Choose One',
                wall_type: 'Choose One',
                description: '',
                protection: '',
                gym_outdoor: this.props.climbSetting,
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

        if (newRoute.status===201){
            if (body.gym_outdoor === 'Indoor') {
                console.log('setting indoor route id')
                console.log(newRoute.data.id)
                this.props.setIndoorRouteId(newRoute.data.id)} 

            this.setState({
                success: true,
                id: newRoute.data.id
            })
        }
    }


    editRoute = async() => {
        const url = this.baseURL + '/routes/' + this.state.id 

        const body = this.state
        body.rating =  body.ratingPrefix === 'V'? 
            body.ratingPrefix + body.rating + body.ratingSuffix:
            body.ratingPrefix + '.' + body.rating + body.ratingSuffix
        if (body.image === 'No Image') {delete body.image}
        delete body.success
        delete body.context
        delete body.ratingPrefix
        delete body.ratingSuffix 

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        const editRoute = await fetch(url,requestOptions).then(response => response.json())
        if (editRoute.status===200){
            this.setState({
                success: true
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
            this.editRoute()
        } else if (context === 'new'){
            this.createRoute()
        }
    }

    render() {
        if (this.state.success && this.state.gym_outdoor === 'Outdoor'){
           return <Redirect to={'/routes/'+this.state.id} />
        } 
        if (this.state.success && this.state.gym_outdoor === 'Indoor'){
            return <Redirect to={'/climbs/new/'} />
        } 
        return(
            <div className='page-and-footer'>
            <Nav baseURL={this.baseURL} currentUser={this.props.currentUser}/>
            <div>
                <h2 className='page-headers'>{capitalize(this.state.context)} Route</h2>
                <Segment className='form-segment'>
                <Form size='large' onSubmit={(event)=>this.handleSubmit(event)} style={{textAlign: 'left'}}>
                {this.state.gym_outdoor === 'Outdoor'?
                    <>
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
                        label='Image'
                        name='image'
                        id='image'
                        value={this.state.image}
                        onChange={this.handleChange}
                    />
                    <br/> </>: '' }
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
                    <Form.Dropdown
                        placeholder={this.state.ratingPrefix} 
                        fluid
                        search
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
                        search
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
                        search
                        label='Rating Suffix'
                        selection
                        name='ratingSuffix'
                        id='ratingSuffix'
                        options={ratingSuffixOptions}
                        value= {this.state.ratingSuffix}
                        onChange={this.handleDropDown}
                    />
                    <br/>
                    <input
                        type='text'
                        hidden
                        name='gym_outdoor'
                        id='gym_outdoor'
                        defaultValue= {this.state.gym_outdoor}
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
