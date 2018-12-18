import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

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
        <Form.Field inline>
          <label>Search By State</label>
          <Input name='input' placeholder='NY' value={this.state.input} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Button content='Submit'/>
      </Form>
    )
  }

}

export default SearchForm
