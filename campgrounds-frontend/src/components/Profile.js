import React from 'react';
import { Header, Card, Image, Button, Icon } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';

const formatDate = (strDate) => {
  // strDate comes from the backend server as YYYY-MM-DD
  const month = strDate.split('-')[1]
  const day = strDate.split('-')[2]
  const year = strDate.split('-')[0]

  return `${month}/${day}/${year}`
}

class Profile extends React.Component {


  handleDeleteClick = (id) => {

    fetch(`${process.env.REACT_APP_RESERVATION_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({reservation: {id}})
    })
      .then(r => r.json())
      .then(JSONResponse => {
        console.log('%c in handleDeleteClick fetch response JSONResponse', 'color: green', JSONResponse)
        this.props.updateUser(JSONResponse, 'deleteReservation')
      })
  }

  render() {
    return (
      <div className='user-profile'>
        <div style={{paddingBottom: '2vh', textAlign: 'center'}}>
          <h1 className='h1-grey'>Reservations for {this.props.user.full_name}</h1>
        </div>
        <Card.Group centered itemsPerRow={3}>
          {this.props.user.reservations.map(reservation => (
            <Card raised key={reservation.id} id={reservation.facility_id} style={{'background-color':'rgba(118,118,118,0.8)'}}>
              <Card.Content>
                <Card.Header as='h3' style={{'color': 'white'}}>Reservation at {reservation.facility_name}</Card.Header>
                <Card.Group centered itemsPerRow={2}>
                  <Card style={{'background-color':'rgba(118,118,118,0.8)'}}>
                    <Card.Meta style={{'color': 'white'}}>Check-in: {formatDate(reservation.start_dt)}</Card.Meta>
                  </Card>
                  <Card style={{'background-color':'rgba(118,118,118,0.8)'}}>
                    <Card.Meta style={{'color': 'white'}}>Check-out: {formatDate(reservation.end_dt)}</Card.Meta>
                  </Card>
                </Card.Group>
              </Card.Content>
              <Image src={reservation.facility_img} size='medium' centered style={{borderRadius: 8}}/>
              <Card.Content extra>
                <Card.Header as='h4' style={{'color': 'white'}}>Activities</Card.Header>
                <Card.Group itemsPerRow={2}>
                  {reservation.activities.map(a => <Card key={a} style={{'background-color':'rgba(118,118,118,0.8)', 'color':'white'}}>{a}</Card>)}
                </Card.Group>
              </Card.Content>
              <Card.Content extra textAlign={'center'}>
                <Button animated='vertical' basic inverted color='red' onClick={()=>this.handleDeleteClick(reservation.id)}>
                  <Button.Content hidden>Delete</Button.Content>
                  <Button.Content visible><Icon name='delete' size='large'/></Button.Content>
                </Button>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    )
  }
} // end Profile class

export default withAuth(Profile);
