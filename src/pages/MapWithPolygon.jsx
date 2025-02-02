import React, { useState, useRef } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 24.8607, // Karachi Latitude
  lng: 67.0011, // Karachi Longitude
};

const MapWithPolygon = () => {
  const [kmlLayersVisible, setKmlLayersVisible] = useState({
    cbcBoundary: true,
    garbagePoints: true,
    sanitationSectors: true,
  });

  const [polygons, setPolygons] = useState([
    {
      id: 1,
      path: [
        { lat: 24.8615, lng: 67.0015 },
        { lat: 24.862, lng: 67.003 },
        { lat: 24.86, lng: 67.002 },
        { lat: 24.8615, lng: 67.0015 }, // Closed loop
      ],
    },
  ]);

  const [isPolygonBeingDrawn, setIsPolygonBeingDrawn] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState(null);

  const mapRef = useRef(null); // Store the map reference
  const cbcBoundaryLayer = useRef(null);
  const garbagePointsLayer = useRef(null);
  const sanitationSectorsLayer = useRef(null);

  const handlePolygonComplete = (event) => {
    const newPath = event
      .getPath()
      .getArray()
      .map((point) => ({
        lat: point.lat(),
        lng: point.lng(),
      }));

    setIsPolygonBeingDrawn(true);
    setCurrentPolygon({ id: polygons.length + 1, path: newPath });
  };

  const handleUndo = () => {
    if (currentPolygon) {
      // Remove the last point from the current polygon's path
      const updatedPath = currentPolygon.path.slice(
        0,
        currentPolygon.path.length - 1
      );

      if (updatedPath.length === 0) {
        // If no points are left, remove the polygon from the state
        setIsPolygonBeingDrawn(false);
        setCurrentPolygon(null);
      } else {
        setCurrentPolygon({ ...currentPolygon, path: updatedPath });
      }
    }
  };

  const handleConfirm = () => {
    // Confirm and add the current polygon to the polygons list
    if (currentPolygon) {
      setPolygons([...polygons, currentPolygon]);
      setIsPolygonBeingDrawn(false);
      setCurrentPolygon(null);
    }
  };

  const getDirectKmzUrl = (fileId) => {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  };

  const handleKmlToggle = (layer) => {
    setKmlLayersVisible((prevState) => {
      const newState = { ...prevState, [layer]: !prevState[layer] };

      // Access the map reference here
      const map = mapRef.current;

      // Toggle the visibility of KML layers based on the checkbox state
      if (layer === "cbcBoundary") {
        cbcBoundaryLayer.current.setMap(newState.cbcBoundary ? map : null);
      } else if (layer === "garbagePoints") {
        garbagePointsLayer.current.setMap(newState.garbagePoints ? map : null);
      } else if (layer === "sanitationSectors") {
        sanitationSectorsLayer.current.setMap(
          newState.sanitationSectors ? map : null
        );
      }

      return newState;
    });
  };

  const onLoad = (map) => {
    mapRef.current = map; // Store the map reference

    const cbcBoundaryId = "1-Ph6KIaICzyMEowFPw3GSHdR3ZcR5CB3";
    const garbagePointsId = "1hK0BSZOq8VsTVLmVr7WCDr-eUiZTY2Y-";
    const sanitationSectorsId = "1t190XPT4a-IDxm70Re4ZK33ckiz7ifmb";

    cbcBoundaryLayer.current = new window.google.maps.KmlLayer({
      url: getDirectKmzUrl(cbcBoundaryId),
      map: map,
      preserveViewport: true,
      suppressInfoWindows: false,
    });

    garbagePointsLayer.current = new window.google.maps.KmlLayer({
      url: getDirectKmzUrl(garbagePointsId),
      map: map,
      preserveViewport: true,
      suppressInfoWindows: false,
    });

    sanitationSectorsLayer.current = new window.google.maps.KmlLayer({
      url: getDirectKmzUrl(sanitationSectorsId),
      map: map,
      preserveViewport: true,
      suppressInfoWindows: false,
    });

    // Initialize the DrawingManager
    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ["polygon"],
      },
      polygonOptions: {
        editable: true,
        draggable: true,
      },
    });

    drawingManager.setMap(map);

    window.google.maps.event.addListener(
      drawingManager,
      "polygoncomplete",
      handlePolygonComplete
    );
  };

  return (
    <div className="relative w-full h-screen">
      <LoadScript
        // googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
        libraries={["drawing"]} // Add this to load the Drawing library
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={{
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          }}
          onLoad={onLoad}
        >
          {polygons.map((polygon) => (
            <Polygon
              key={polygon.id}
              paths={polygon.path}
              options={{
                fillColor: "#FF0000",
                fillOpacity: 0.4,
                strokeColor: "#FF0000",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          ))}
        </GoogleMap>

        <div className="absolute top-80 left-10 z-50 flex flex-col space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={kmlLayersVisible.cbcBoundary}
              onChange={() => handleKmlToggle("cbcBoundary")}
              className="h-5 w-5"
            />
            <span className="text-white">CBC Boundary</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={kmlLayersVisible.garbagePoints}
              onChange={() => handleKmlToggle("garbagePoints")}
              className="h-5 w-5"
            />
            <span className="text-white">Garbage Points</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={kmlLayersVisible.sanitationSectors}
              onChange={() => handleKmlToggle("sanitationSectors")}
              className="h-5 w-5"
            />
            <span className="text-white">Sanitation Sectors</span>
          </label>
        </div>

        {isPolygonBeingDrawn && (
          <div className="absolute top-10 left-10 z-50 flex space-x-2">
            <button
              onClick={handleConfirm}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Confirm Polygon
            </button>
            <button
              onClick={handleUndo}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Undo
            </button>
          </div>
        )}
      </LoadScript>
    </div>
  );
};

export default MapWithPolygon;
