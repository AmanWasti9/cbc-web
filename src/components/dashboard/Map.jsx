import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 24.82, // Karachi Latitude
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


// import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const center = {
//   lat: 24.82, // Karachi Latitude
//   lng: 67.0011, // Karachi Longitude
// };

// // Replace with your actual Google Maps API key
// // const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

// const Map = () => {
//   const [geojsonData, setGeojsonData] = useState(null);
//   const [mapInstance, setMapInstance] = useState(null);

//   // Fetch GeoJSON data
//   useEffect(() => {
//     fetch("../../data/sanitationSectors.geojson") // Update the path
//       .then((response) => response.json())
//       .then((data) => setGeojsonData(data))
//       .catch((error) => console.error("Error fetching GeoJSON:", error));
//   }, []);

//   // const onLoad = (map) => {
//   //   setMapInstance(map);
//   //   if (geojsonData) {
//   //     map.data.addGeoJson(geojsonData); // Add GeoJSON data to the map
//   //   }
//   // };

//   const zoomToArea = (coordinates) => {
//     if (mapInstance && coordinates) {
//       const bounds = new window.google.maps.LatLngBounds();
//       coordinates[0].forEach(([lng, lat]) => bounds.extend({ lat, lng }));
//       mapInstance.fitBounds(bounds);
//     }
//   };

//   // Function to convert Google Drive sharing URL to direct download URL
//   const getDirectKmzUrl = (fileId) => {
//     return `https://drive.google.com/uc?export=download&id=${fileId}`;
//   };

//   const onLoad = (map) => {
//     // Extract file IDs from your Google Drive URLs
//     const cbcBoundaryId = "1-Ph6KIaICzyMEowFPw3GSHdR3ZcR5CB3";
//     const garbagePointsId = "1hK0BSZOq8VsTVLmVr7WCDr-eUiZTY2Y-";
//     const sanitationSectorsId = "1t190XPT4a-IDxm70Re4ZK33ckiz7ifmb";

//     // Create KML layers using direct download URLs
//     new window.google.maps.KmlLayer({
//       url: getDirectKmzUrl(cbcBoundaryId),
//       map: map,
//       preserveViewport: true,
//       suppressInfoWindows: false,
//     });

//     new window.google.maps.KmlLayer({
//       url: getDirectKmzUrl(garbagePointsId),
//       map: map,
//       preserveViewport: true,
//       suppressInfoWindows: false,
//     });

//     new window.google.maps.KmlLayer({
//       url: getDirectKmzUrl(sanitationSectorsId),
//       map: map,
//       preserveViewport: true,
//       suppressInfoWindows: false,
//     });
//   };

//   return (
//     <div className="flex w-full h-screen">
//       <div className="w-1/4 p-4 overflow-y-auto bg-gray-100">
//         <h2 className="text-lg font-bold mb-4">Areas</h2>
//         {geojsonData &&
//           geojsonData.features.map((feature, index) => (
//             <button
//               key={index}
//               className="block w-full p-2 mb-2 text-left bg-blue-100 hover:bg-blue-200 rounded"
//               onClick={() => zoomToArea(feature.geometry.coordinates)}
//             >
//               {feature.properties.name}
//             </button>
//           ))}
//       </div>
//       <div className="w-3/4">
//         <LoadScript>
//           <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={12}
//             onLoad={onLoad}
//             options={{
//               mapTypeControl: true,
//               streetViewControl: true,
//               fullscreenControl: true,
//             }}
//           />
//         </LoadScript>
//       </div>
//     </div>
//   );
// };

// export default Map;



