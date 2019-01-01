import React from 'react';
import { Form, Segment, Button, Grid, Header, Message } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import withAuth from '../hocs/withAuth';

class ReservationForm extends React.Component {
  state = {
    startDate: null,
    endDate: null,
    selectedActivities: [],
    error: null
  }

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
     if (prevState.selectedActivities.includes(a.ActivityName)) {
       return {selectedActivities: prevState.selectedActivities.filter(actName => actName !== a.ActivityName)}
     } else {
       return {selectedActivities: [...prevState.selectedActivities, a.ActivityName]}
     }
   })
 }

 handleReservationSubmit = (e) => {
   console.log('in handleReservationSubmit', e)
   console.log('in handleReservationSubmit the state', this.state)
   console.log('in handleReservationSubmit the props', this.props)

   // create reservation table and activities table in backend - then post to backend to persist reservation data
   const data = JSON.stringify({
     reservation: {
       user_id: this.props.user.id,
       facility_id: parseInt(this.props.location.state.facility.FacilityID),
       facility_name: this.props.location.state.facility.FacilityName,
       facility_img: this.props.location.state.facility.FacilityImg,
       start_dt: this.state.startDate,
       end_dt: this.state.endDate,
       activities: this.state.selectedActivities
     }
   })

   console.log('in handleReservationSubmit JSON stringify data', data);

   // create fetch to post to backend
   fetch(process.env.REACT_APP_RESERVATION_URL, {
     method: 'POST',
     headers: {
       "Content-Type": "application/json; charset=utf-8",
       "Authorization": `Bearer ${localStorage.getItem('jwt')}`
     },
     body: data
   })
     .then(resp => {
       if (resp.ok) {
         return resp.json()
       } else {
         throw resp
       }
     })
     .then(JSONResponse => {
       console.log('%c in handleReservationSubmit JSONResponse','color: red',JSONResponse)
       // if it's successful - yay!
       this.props.updateUser(JSONResponse)
       this.setState({
         startDate: null,
         endDate: null,
         selectedActivities: [],
         error: null
       }, ()=> this.props.history.push('/profile'))
     })
     .catch(r => r.json().then(e => {
       console.log('in handleReservationSubmit catch', e)
       this.setState({error: e.error})
     }))

   // reset reservation form's state to default
   // then redirect to search pg since there's no profile pg yet
   // add this.props.history.push('/') in a callback after the setState to reset the reservation form's state
 }

 renderForm = (facility) => {
   console.log('in renderForm facility', facility);
   if (!!facility) {
     return (
       <React.Fragment>
         <Header as='h1' color='teal' textAlign='center'>Make a reservation for {facility.FacilityName}</Header>
         {this.state.error ? <Message error header={this.state.error}/> : null}
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

export default withAuth(ReservationForm);
