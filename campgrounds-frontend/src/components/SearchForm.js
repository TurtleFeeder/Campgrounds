import React, { Component } from 'react';
import { Form, Input, Grid, Search, Segment, Label } from 'semantic-ui-react';
import _ from 'lodash';

const resultRenderer = ({title}) => <Label content={title}/>

class SearchForm extends Component {
  state = {
    isLoading: false,
    results: [],
    value: ''
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

  handleResultSelect = (e, { result }) => {
    this.props.handleSubmit(result)
    this.setState({value: result.title})
  }

  handleSearchChange = (e, { value }) => {
    this.setState({isLoading: true, value})

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.searchStates, isMatch)
      })

    }, 300)
  } // end handleSearchChange


  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {leading: true})}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
          />
        </Grid.Column>
      </Grid>
    )
  }

}

// class SearchForm extends Component {
//   state = {
//     input: ''
//   }
//
//   handleChange = (e, {name, value}) => {
//     this.setState({[name]: value})
//   }
//
//   render() {
//     return (
//       <Form>
//         <Form.Group>
//           <Input name='input' placeholder='Search by State (ex. NY)' value={this.state.input} onChange={this.handleChange}/>
//           <Form.Button content='Search'/>
//         </Form.Group>
//       </Form>
//     )
//   }
//
// }

export default SearchForm
