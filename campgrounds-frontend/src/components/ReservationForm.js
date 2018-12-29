import React from 'react';
import { Form, Segment, Button, Grid, Header } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class ReservationForm extends React.Component {
  state = {
    startDate: null,
    endDate: null,
    selectedActivities: []
  }

  // componentDidMount() {
  //   console.log('in ReservationForm componentDidMount this.props', this.props);
  //   if (!!this.props.location.state.facility) {
  //     this.setState({facility: this.props.location.state.facility}, ()=> console.log('in ReservationForm after componentDidMount setState', this.state))
  //   }
  // }
  //
  // componentDidUpdate(prevProps, prevState) {
  //   // conditional is not preventing infinite loop
  //   if (prevProps.location.state.facility.FacilityID === this.props.location.state.facility.FacilityID) {
  //     this.setState({facility: null})
  //   } else if (this.state.facility !== null && (prevProps.location.state.facility.FacilityID !== this.props.location.state.facility.FacilityID)) {
  //     this.setState({facility: this.props.location.state.facility.FacilityID})
  //   }
  // }

  handleChangeStart = (date) => {
   this.setState({
     startDate: date
   }, ()=> console.log('in ReservationForm handleChangeStart', this.state));
 }

 handleChangeEnd = (date) => {
   this.setState({
     endDate: date
   }, () => console.log('in ReservationForm handleChangeEnd', this.state));
 }

 handleCheckbox = (a) => {
   console.log('in handleCheckbox', a)
   this.setState(prevState => {
     if (!!prevState.selectedActivities.find(act => act.ActivityName === a.ActivityName)) {
       return {selectedActivities: prevState.selectedActivities.filter(act => act.ActivityName !== a.ActivityName)}
     } else {
       return {selectedActivities: [...prevState.selectedActivities, {ActivityName: a.ActivityName, FacilityID: a.FacilityID}]}
     }
   })
 }

 handleReservationSubmit = (e) => {
   console.log('in handleReservationSubmit', e)
   console.log('in handleReservationSubmit the state', this.state)
   // debugger
   // create reservation table and activities table in backend - then post to backend to persist reservation data
 }

 renderForm = (facility) => {
   if (!!facility) {
     return (
       <React.Fragment>
         <Header as='h1' color='teal' textAlign='center'>Make a reservation for {facility.FacilityName}</Header>
         <Form onSubmit={this.handleReservationSubmit}>
         <Segment stacked style={{ maxWidth: 800, margin: 'auto' }}>
         <DatePicker
         placeholderText="Check-in"
         selected={this.state.startDate}
         selectsStart
         startDate={this.state.startDate}
         endDate={this.state.endDate}
         onChange={this.handleChangeStart}
         />
         <DatePicker
         placeholderText="Check-out"
         selected={this.state.endDate}
         selectsEnd
         startDate={this.state.startDate}
         endDate={this.state.endDate}
         onChange={this.handleChangeEnd}
         />
         <Segment>
         <Header as='h3'color='teal' textAlign='center'>Activities</Header>
         <Grid columns={3}>
         {this.props.location.state.facility.ACTIVITY.map(a=> <Grid.Column key={a.ActivityName}><Form.Checkbox key={a.ActivityName} label={a.ActivityName} onChange={()=>this.handleCheckbox(a)}/></Grid.Column>)}
         </Grid>
         </Segment>
         <Button color='teal' fluid size='large' type='submit'>
         Submit Reservation
         </Button>
         </Segment>
         </Form>
       </React.Fragment>
     )
   } else {
     return (
      <Header as='h3'color='teal' textAlign='center'>Please select a camground first</Header>
     )
   }
 }

 render() {
   const facility = !!this.props.location.state ? this.props.location.state.facility : null
   return (
     <div className='reservation-form'>
     {this.renderForm(facility)}
     </div>
   );
 }

} // end ReservationForm

export default ReservationForm;
