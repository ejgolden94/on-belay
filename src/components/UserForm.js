import React, { Component } from 'react' 
import { Link } from 'react-router-dom';
import { Container, Form, Button, Header, Message } from 'semantic-ui-react'

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email:'',
            password: '',
        }
    }
    
    handleChange = (event) => {
        this.setState({[event.target.id]:event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state);
    }

    render(){
        return (
            <Container style={{height:'100vh', textAlign:'center'}}>
                <Header as='h1' color='teal' size='huge' textAlign='center' style={{width: '50%', margin:'30vh auto 20px auto'}}>
                {this.props.context === 'login'?
                    <> Login </>:
                    <> Sign Up </>
                    }
                </Header>
                <Form size='large' style={{width: '50%', margin:'20px auto'}} onSubmit={(event)=>this.handleSubmit(event)}>
                    <Form.Input 
                        fluid 
                        icon='user' 
                        name='username'
                        id='username'
                        iconPosition='left' 
                        placeholder='Username' 
                        value={this.state.username}
                        onChange={(event)=>this.handleChange(event)}
                        />
                    <Form.Input
                        fluid
                        icon='lock'
                        name='password'
                        id='password'
                        iconPosition='left'
                        value={this.state.password}
                        placeholder='Password'
                        type='password'
                        onChange={(event)=>this.handleChange(event)}
                    />
                    <Button color='teal' fluid size='large'>
                        {this.props.context === 'login'?
                        <> Login </>:
                        <> Sign Up </>
                        }
                    </Button>
                </Form>
                {/* User login Message */}
                {this.props.context === 'login'?
                <Message color='orange' style={{width: '50%', margin:'0 auto'}}>
                    No Login? <Link to='/user/new'>Sign Up!</Link>
                </Message>:null
                }
                {/* User Sign Up Message */}
                {this.props.context === 'signup'?
                <Message color='orange' style={{width: '50%', margin:'0 auto'}}>
                    Already have an account? <Link to='/user/login'>Sign In!</Link>
                </Message>:null
                }
            </Container>
        )
    }
}