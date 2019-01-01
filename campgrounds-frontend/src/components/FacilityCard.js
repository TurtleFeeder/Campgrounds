import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function parseDescription(string) {
  // gets a section of the description string with a length of 250 characters, then replaces the first 'overview' it finds with '' then add '...' at the end.
  return string.substring(0, 250).replace(/overview/i,'')+'...'
}

function checkAddress(array) {
  const foundAddress = array.find(f => f.FacilityAddressType === "Physical" || f.FacilityAddressType ==="Default")
  if (foundAddress.City === "") {
    return `${foundAddress.AddressStateCode}, ${foundAddress.AddressCountryCode}`
  } else {
    return `${foundAddress.City}, ${foundAddress.AddressStateCode}`
  }
}

function getImageUrl(array) {
  if (array.length > 0) {
    const foundMedia = array.find(m=> m.MediaType === "Image")
    return foundMedia.URL
  } else {
    return 'https://image.flaticon.com/icons/svg/883/883746.svg'
  }
}

export default function FacilityCard({facility}) {
  const newTo = {
    pathname: "/reservation",
    state: {facility: {...facility, FacilityImg: getImageUrl(facility.MEDIA)}}
  }
  console.log('in FacilityCard newTo', newTo);
  return (
    <div id={facility.FacilityID} className="border-shadow facility-card">
    <img src={getImageUrl(facility.MEDIA)} width={200} height={200} />
    <Link to={newTo}>
      <Button as='div' labelPosition='right' className="reservation-button" size='large'>
        <Button icon>
          <Icon name='calendar check' />
        </Button>
        <Label basic pointing='left'>
          Reserve
        </Label>
      </Button>
    </Link>
      <h4>{facility.FacilityName}</h4>
      <h5>{facility.RECAREA.length >= 1 ? `Part of ${facility.RECAREA[0]['RecAreaName']}` : null}</h5>
      <h6>{checkAddress(facility.FACILITYADDRESS)}</h6>
      <p>Number of Activities Available: {facility.ACTIVITY.length}</p>
      <p>{parseDescription(facility.FacilityDescription)}</p>
    </div>
  )
}
