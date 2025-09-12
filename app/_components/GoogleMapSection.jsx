import React, { useCallback, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import MarkerItem from './MarkerItem';

const containerStyle = {
  width: '100%',
  height: '80vh',
};

const center = {
  lat: 28.65103546524678,
  lng: 77.16368940432166
};

function GoogleMapSection({ coordinates, listing }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    // Remove the fitBounds call that was overriding your zoom level
    // Just set the map reference
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded) return <p>Loading Map...</p>;
  if (loadError) return <p>Error loading Google Maps API: {loadError.message}</p>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4} // This will now work as expected
        onLoad={onLoad}
        onUnmount={onUnmount}
        gestureHandling='greedy'
      >
        {listing?.map((item, index) => (
          <MarkerItem key={item.id || index} item={item} />
        ))}
        {coordinates && <Marker position={coordinates} />}
      </GoogleMap>
    </div>
  );
}

export default GoogleMapSection;