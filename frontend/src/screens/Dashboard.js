import React, {useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';



function Dashboard() {
  const [position, setPosition] = useState(null);
  useEffect(()=>{
    console.log(position);
  },[position])

  const LocationMarker = ()=>{
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }

  return (
    <MapContainer
    center={{ lat: 51.505, lng: -0.09 }}
    zoom={14}
    zoomControl={false}
    scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy;'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker />
  </MapContainer>
  )
}

export default Dashboard
