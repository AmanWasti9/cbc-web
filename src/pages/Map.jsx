import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 24.8607, // Karachi Latitude
  lng: 67.0011, // Karachi Longitude
};

// Replace with your actual Google Maps API key
// const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const Map = () => {
  // Function to convert Google Drive sharing URL to direct download URL
  const getDirectKmzUrl = (fileId) => {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  };

  const onLoad = (map) => {
    // Extract file IDs from your Google Drive URLs
    const cbcBoundaryId = "1-Ph6KIaICzyMEowFPw3GSHdR3ZcR5CB3";
    const garbagePointsId = "1hK0BSZOq8VsTVLmVr7WCDr-eUiZTY2Y-";
    const sanitationSectorsId = "1t190XPT4a-IDxm70Re4ZK33ckiz7ifmb";

    // Create KML layers using direct download URLs
    new window.google.maps.KmlLayer({
      url: getDirectKmzUrl(cbcBoundaryId),
      map: map,
      preserveViewport: true,
      suppressInfoWindows: false,
    });

    new window.google.maps.KmlLayer({
      url: getDirectKmzUrl(garbagePointsId),
      map: map,
      preserveViewport: true,
      suppressInfoWindows: false,
    });

    new window.google.maps.KmlLayer({
      url: getDirectKmzUrl(sanitationSectorsId),
      map: map,
      preserveViewport: true,
      suppressInfoWindows: false,
    });
  };

  return (
    <div className="w-full h-screen">
      <LoadScript>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          options={{
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          }}
        />
      </LoadScript>
    </div>
  );
};

export default Map;
