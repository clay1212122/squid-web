import React, { useState, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, StandaloneSearchBox, Marker } from "@react-google-maps/api";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const libraries = ["places"];

const Mapita = ({markers, setMarkers}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 18.9261, lng: -99.23075 });
  const [searchBoxValue, setSearchBoxValue] = useState("");
  const searchBox = useRef(null);

  const onMapClick = useCallback((e) => {
    setMarkers([
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
  }, []);

  const onSearchBoxLoad = useCallback((ref) => {
    searchBox.current = ref;
  }, []);

  const onPlacesChanged = useCallback(() => {
    const places = searchBox.current.getPlaces();

    if (places.length > 0) {
      const selectedPlace = places[0];
      const newMarkers = [
        {
          lat: selectedPlace.geometry.location.lat(),
          lng: selectedPlace.geometry.location.lng(),
        },
      ];
      setMarkers(newMarkers);

      // Update the map center to the selected place
      setMapCenter({
        lat: selectedPlace.geometry.location.lat(),
        lng: selectedPlace.geometry.location.lng(),
      });

      // Clear the search box input
      setSearchBoxValue("");
    }
  }, []);

  const handleSearchBoxChange = (e) => {
    setSearchBoxValue(e.target.value);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDLGElbUmrLsqO_VdCw1Vi4s8vABrx9l7k",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "60vh", // Ajusta la altura según tus necesidades
        }}
        zoom={8}
        center={mapCenter}
      >
        {markers.map((marker, index) => {
          return(
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        )})}
      </GoogleMap>
    </div>
  );
};

export default Mapita;