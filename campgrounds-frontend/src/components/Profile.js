import React from 'react';
import { Header, Grid, Card, Image } from 'semantic-ui-react';
import withAuth from '../hocs/withAuth';

const formatDate = (strDate) => {
  // strDate comes from the backend server as YYYY-MM-DD
  const month = strDate.split('-')[1]
  const day = strDate.split('-')[2]
  const year = strDate.split('-')[0]

  return `${month}/${day}/${year}`
}

class Profile extends React.Component {


  render() {
    console.log('in Profile render reservations', this.props.user.reservations);
    return (
      <div className='user-profile'>
        <Header as='h1' color='violet' textAlign='center'>Reservations for {this.props.user.full_name}</Header>
        <Card.Group centered itemsPerRow={3}>
          {this.props.user.reservations.map(reservation => (
            <Card raised key={reservation.id} id={reservation.facility_id}>
              <Card.Content>
                <Card.Header as='h3' color='violet'>Reservation at {reservation.facility_name}</Card.Header>
                <Card.Group centered itemsPerRow={2}>
                  <Card>
                    <Card.Meta>Check-in: {formatDate(reservation.start_dt)}</Card.Meta>
                  </Card>
                  <Card>
                    <Card.Meta>Check-out: {formatDate(reservation.end_dt)}</Card.Meta>
                  </Card>
                </Card.Group>
              </Card.Content>
              <Image src={reservation.facility_img} size='medium' centered/>
              <Card.Content extra>
                <Card.Header as='h4'>Activities</Card.Header>
                <Card.Group itemsPerRow={2}>
                  {reservation.activities.map(a => <Card key={a}>{a}</Card>)}
                </Card.Group>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    )
  }
} // end Profile class

export default withAuth(Profile);
