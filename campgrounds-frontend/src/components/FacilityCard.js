import React from 'react';

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
  return (
    <div id={facility.FacilityID} className="border-shadow">
    <img src={getImageUrl(facility.MEDIA)} width={100} height={100} />
      <h4>{facility.FacilityName}</h4>
      <h5>{facility.RECAREA.length >= 1 ? `Part of ${facility.RECAREA[0]['RecAreaName']}` : null}</h5>
      <h6>{checkAddress(facility.FACILITYADDRESS)}</h6>
      <small>{parseDescription(facility.FacilityDescription)}</small>
    </div>
  )
}
