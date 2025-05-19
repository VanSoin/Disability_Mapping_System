import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const UploadPage = () => {
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [isMapReady, setIsMapReady] = useState(false);

  const filterTypes = [
    { label: "Disable Friendly Restaurants", type: "disable_friendly_restaurants" },
    { label: "Disable Friendly Parks", type: "disable_friendly_parks" },
    { label: "Disable Friendly Police Stations", type: "disable_friendly_police_stations" },
    { label: "Wheelchair Friendly Malls", type: "wheelchair_friendly_malls" },
    { label: "Disability Friendly Locations", type: "disability_friendly_locations" },
  ];

  const locationData = {
    disable_friendly_parks: [
      { name: "Jawaharlal Bal Bhavan in Cubbon Park", location: { lat: 12.9763, lng: 77.5937 } },
      { name: "Coles Park", location: { lat: 12.9827, lng: 77.6057 } },
      { name: "MS Krishna Park in Basavanagudi", location: { lat: 12.9431, lng: 77.5735 } },
      { name: "Gayatri Devi Park in Rajajinagar", location: { lat: 12.9921, lng: 77.5527 } },
    ],
    disable_friendly_restaurants: [
      { name: "The Bangalore Cafe, Shanti Nagar", location: { lat: 12.9582, lng: 77.6116 } },
      { name: "The London Curry House, Race Course Road", location: { lat: 12.9767, lng: 77.5924 } },
      { name: "The Druid Garden, Sahakara Nagar", location: { lat: 13.0422, lng: 77.5694 } },
      { name: "Byg Brewski Brewing Company, Hennur", location: { lat: 13.0341, lng: 77.6006 } },
    ],
    disable_friendly_police_stations: [
      { name: "Banashankari Police Station", location: { lat: 12.9279, lng: 77.5466 } },
      { name: "Basavanagudi Women’s Police Station", location: { lat: 12.9442, lng: 77.5715 } },
      { name: "Hanumanthanagar Police Station", location: { lat: 12.9407, lng: 77.5615 } },
    ],
    wheelchair_friendly_malls: [
      { name: "Orion Mall", location: { lat: 13.0114, lng: 77.5565 } },
      { name: "Mantri Square Mall", location: { lat: 12.9933, lng: 77.5700 } },
      { name: "Gopalan Signature Mall", location: { lat: 12.9945, lng: 77.6607 } },
      { name: "Phoenix Market City", location: { lat: 12.9971, lng: 77.6965 } },
    ],
    disability_friendly_locations: [
      { name: "Disability Friendly Children Park - Dr Ambedkar Road", location: { lat: 12.9756, lng: 77.5938 } },
      { name: "Samarthanam Trust For The Disabled", location: { lat: 12.9217, lng: 77.6156 } },
      { name: "Ability In Disability", location: { lat: 12.9602, lng: 77.6014 } },
    ],
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyBh9I9n5JKJhdkYsHhMBWYuuoDqDmz6seM", // Replace with actual API Key
      version: "weekly",
    });

    loader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
              center: location,
              zoom: 14,
            });

            setMap(mapInstance);
            setIsMapReady(true);
          },
          () => alert("Geolocation failed. Please enable location access.")
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    });
  }, []);

  const handleFilter = (type) => {
    if (!isMapReady || !map) return;

    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    const selectedPlaces = locationData[type] || [];
    setPlaces(selectedPlaces);

    const newMarkers = selectedPlaces.map((place) => {
      return new window.google.maps.Marker({
        position: place.location,
        map,
        title: place.name,
      });
    });

    setMarkers(newMarkers);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "'Roboto', sans-serif" }}>
      <h1>Google Maps with Location Filters</h1>

      {isMapReady && (
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {filterTypes.map((filter) => (
              <button
                key={filter.type}
                onClick={() => handleFilter(filter.type)}
                style={{
                  padding: "12px 20px",
                  margin: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#007bff",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div id="map" style={{ height: "500px", width: "100%", marginTop: "20px", borderRadius: "8px" }}></div>

      {places.length > 0 && (
        <div
          style={{
            textAlign: "left",
            padding: "10px 20px",
            maxHeight: "50vh",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            marginTop: "10px",
          }}
        >
          <h3>Selected Locations:</h3>
          <ul>
            {places.map((place) => (
              <li key={place.name}>
                <strong>{place.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
