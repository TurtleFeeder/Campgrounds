import React, { Component } from 'react';
import { Form, Input, Grid } from 'semantic-ui-react';

class SearchForm extends Component {
  state = {
    input: ''
  }

  handleChange = (e, {name, value}) => {
    this.setState({[name]: value})
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Input name='input' placeholder='Search by State (ex. NY)' value={this.state.input} onChange={this.handleChange}/>
          <Form.Button content='Search'/>
        </Form.Group>
      </Form>
    )
  }

}

export default SearchForm
