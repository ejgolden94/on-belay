import React, { Component } from 'react' 
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button, Header, Message, Icon } from 'semantic-ui-react'

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email:'',
            password: '',
            loginSuccess: false, 
            message: ''
        }

        this.context = props.context
    }
    
    handleChange = (event) => {
        this.setState({[event.target.id]:event.target.value})
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        let url=''
        if(this.props.context === 'login'){
            url = this.props.baseURL +'/users/login'
        }else{
            url = this.props.baseURL +'/users/register'
        }

        let body = JSON.stringify(this.state)

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body,
            credentials: 'include'
        }

        const authUser = await fetch(url,requestOptions).then(response => response.json())
        if(authUser.status === 200 || authUser.status === 201){
            console.log(authUser);
            this.props.setCurrentUser(authUser.data)
            this.setState({
                loginSuccess: true
            })
        } else {
            this.setState({
                message: authUser.message
            })
        }
    }

    render(){
        if (this.state.loginSuccess) {
            return <Redirect to='/' />
          }
        return (
            <Container style={{height:'100vh', textAlign:'center'}}>
                <Header as='h1' color='teal' size='huge' textAlign='center' style={{width: '50%', margin:'30vh auto 20px auto', fontSize:'calc(10px + 3vmin)'}}>
                {this.props.context === 'login'?
                    <> Login </>:
                    <> Sign Up </>
                    }
                </Header>
                <Form size='large' style={{width: '70%', margin:'20px auto'}} onSubmit={(event)=>this.handleSubmit(event)}>
                    <Form.Input 
                        fluid 
                        icon='mail' 
                        name='email'
                        id='email'
                        iconPosition='left' 
                        placeholder='User Email' 
                        value={this.state.email}
                        onChange={(event)=>this.handleChange(event)}
                        />
                    {this.props.context === 'signup'?
                    <Form.Input
                        fluid
                        icon='user'
                        name='username'
                        id='username'
                        iconPosition='left'
                        value={this.state.username}
                        placeholder='Username'
                        type='text'
                        onChange={(event)=>this.handleChange(event)}
                    /> : ''
                    }
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
                    {this.state.message?
                        <Message color='red'>
                            <Icon name='warning sign'/>
                            {this.state.message}
                        </Message>: null
                    }
                    <Button color='teal' fluid size='large'>
                        {this.props.context === 'login'?
                        <> Login </>:
                        <> Sign Up </>
                        }
                    </Button>
                </Form>
                {/* User login Message */}
                {this.props.context === 'login'?
                <Message color='orange' style={{width: '70%', margin:'0 auto'}}>
                    {/* No Login? <Link to='/user/new'>Sign Up!</Link> */}
                    No Login? <a href='/user/new'>Sign Up!</a>
                </Message>:null
                }
                {/* User Sign Up Message */}
                {this.props.context === 'signup'?
                <Message color='orange' style={{width: '70%', margin:'0 auto'}}>
                    {/* Already have an account? <Link to='/user/login'>Sign In!</Link> */}
                    Already have an account? <a href='/user/login'>Sign In!</a>
                </Message>:null
                }
            </Container>
        )
    }
}