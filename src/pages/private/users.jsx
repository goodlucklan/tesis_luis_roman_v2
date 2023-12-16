import { useState } from 'react';
import { Map, Pin, InfoWindow, APIProvider, AdvancedMarker } from '@vis.gl/react-google-maps';

export default function UserPage() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const position = { lat: -12.065423669689228, lng: -77.01384328466004 };
  const position2 = {
    lat: -12.068454378886457,
    lng: -77.013939073838,
  };
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
      }}
    >
      <APIProvider apiKey="AIzaSyCAkDgo-h1zXVu0T5LhYD_w5wDSjYk7J3c">
        <Map center={position} zoom={15} mapId="dc22e5e793d387ab">
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin />
          </AdvancedMarker>
          <AdvancedMarker position={position2} onClick={() => setOpen2(true)}>
            <Pin />
          </AdvancedMarker>
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>Creaciones Divinas Tienda</p>
            </InfoWindow>
          )}
          {open2 && (
            <InfoWindow position={position} onCloseClick={() => setOpen2(false)}>
              <p>Almacen</p>
            </InfoWindow>
          )}
          {/* <Marker position={position} />
          <Marker position={position2} /> */}
        </Map>
      </APIProvider>
    </div>
  );
}
