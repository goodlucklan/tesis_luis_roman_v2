import { Map, Marker, APIProvider } from '@vis.gl/react-google-maps';

export default function UserPage() {
  const position = { lat: -12.065423669689228, lng: -77.01384328466004 };

  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
      }}
    >
      <APIProvider apiKey="AIzaSyCAkDgo-h1zXVu0T5LhYD_w5wDSjYk7J3c">
        <Map center={position} zoom={15} mapId="dc22e5e793d387ab">
          <Marker position={position} />
        </Map>
      </APIProvider>
    </div>
  );
}
