import React from 'react';
import {Link} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (e, semanticInputData) => {
    this.setState({[semanticInputData.name]: semanticInputData.value})
  }

  handleLoginSubmit = (e) => {
    console.log('in handleLoginSubmit');
    this.props.loginUser(this.state.email, this.state.password)
    this.setState({email: '', password: ''})
  }

  render(){
    console.log('in LoginForm', this.props);
    return (
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='https://www.freeiconspng.com/uploads/adventure-camping-tent-icon-2.png' /> Log-in to your account
            </Header>
            <Form
              size='large'
              onSubmit={this.handleLoginSubmit}
            >
              <Segment stacked>
                <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                name='email'
                value={this.state.email}
                onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />

                <Button color='teal' fluid size='large' type='submit'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
} // end LoginForm

export default LoginForm
