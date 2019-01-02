import React from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class SignupForm extends React.Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  handleChange = (e, semanticInputData) => {
    this.setState({[semanticInputData.name]: semanticInputData.value})
  }

  handleSignupSubmit = (e) => {
    this.props.signupUser(this.state)
    this.setState({email: '', password: '', firstName: '', lastName: ''})
  }

  render(){
    return this.props.loggedIn ? (
      <Redirect to="/"/>
    ):(
      <div className='signup-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='violet' textAlign='center'>
              <Image src='https://www.freeiconspng.com/uploads/adventure-camping-tent-icon-2.png' /> Signup
            </Header>
            {this.props.createUserErrorMsg ? <Message error header={this.props.createUserErrorMsg}/> : null}
            <Form
              size='large'
              onSubmit={this.handleSignupSubmit}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='First Name'
                  type='text'
                  name='firstName'
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Last Name'
                  type='text'
                  name='lastName'
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
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

                <Button color='violet' fluid size='large' type='submit'>
                  Signup
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
} // end SignupForm

export default SignupForm
