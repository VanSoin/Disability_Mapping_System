import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
const App = () => {
 const [map, setMap] = useState(null);
 const [places, setPlaces] = useState([]);
 const [markers, setMarkers] = useState([]);
 const [isMapReady, setIsMapReady] = useState(false);
 // Updated filter types
 const filterTypes = [
 { label: "Disable Friendly Restaurants", type: "disable_friendly_restaurants" },
 { label: "Disable Friendly Parks", type: "disable_friendly_parks" },
 { label: "Disable Friendly Police Stations", type: "disable_friendly_police_stations" },
 { label: "Wheelchair Friendly Malls", type: "wheelchair_friendly_malls" },
 { label: "Disability Friendly Locations", type: "disability_friendly_locations" },
 ];
  // Custom park data
 const parkData = [
 { name: "Jawaharlal Bal Bhavan in Cubbon Park", location: { lat: 12.9763, lng: 77.5937 }
},
 { name: "Coles Park", location: { lat: 12.9827, lng: 77.6057 } },
 { name: "MS Krishna Park in Basavanagudi", location: { lat: 12.9431, lng: 77.5735 } },
 { name: "Gayatri Devi Park in Rajajinagar", location: { lat: 12.9921, lng: 77.5527 } },
 ];
 // Custom restaurant data
 const restaurantData = [
 { name: "The Bangalore Cafe, Shanti Nagar", location: { lat: 12.9582, lng: 77.6116 } },
 { name: "The London Curry House, Race Course Road", location: { lat: 12.9767, lng:
77.5924 } },
 { name: "The Druid Garden, Sahakara Nagar", location: { lat: 13.0422, lng: 77.5694 } },
 { name: "Byg Brewski Brewing Company, Hennur", location: { lat: 13.0341, lng: 77.6006
} },
 { name: "Karama Restaurant, Frazer Town", location: { lat: 12.9795, lng: 77.6154 } },
 { name: "Carnatic, Church Street", location: { lat: 12.9707, lng: 77.6095 } },
 { name: "Yauatcha, MG Road", location: { lat: 12.9754, lng: 77.6070 } },
 { name: "Food Coma, Indiranagar", location: { lat: 12.9758, lng: 77.6413 } },
 { name: "THE RIG, Sarjapur Road", location: { lat: 12.9274, lng: 77.6358 } },
 { name: "Tree Tops Bar & Kitchen, Lavelle Road", location: { lat: 12.9702, lng: 77.6086 }
},
 { name: "Hangover, HSR Layout", location: { lat: 12.9165, lng: 77.6440 } },
 ];
 // Custom police station data
 const policeStationData = [
 { name: "Banashankari Police Station", location: { lat: 12.9279, lng: 77.5466 } },
 { name: "Basavanagudi Women’s Police Station", location: { lat: 12.9442, lng: 77.5715 }
},
 { name: "Hanumanthanagar Police Station", location: { lat: 12.9407, lng: 77.5615 } },
 { name: "Giri Nagar Police Station", location: { lat: 12.9341, lng: 77.5596 } },
 { name: "Jayanagar Police Station", location: { lat: 12.9264, lng: 77.5934 } },
   { name: "Koramangala Police Station", location: { lat: 12.9356, lng: 77.6164 } },
 { name: "KS Layout Police Station", location: { lat: 12.9104, lng: 77.5583 } },
 { name: "Bommanahalli Police Station", location: { lat: 12.9016, lng: 77.6240 } },
 ];
 // Custom mall data
 const mallData = [
 { name: "Orion Mall", location: { lat: 13.0114, lng: 77.5565 } },
 { name: "Mantri Square Mall", location: { lat: 12.9933, lng: 77.5700 } },
 { name: "Gopalan Signature Mall", location: { lat: 12.9945, lng: 77.6607 } },
 { name: "Orion Avenue", location: { lat: 13.0013, lng: 77.6410 } },
 { name: "Phoenix Market City", location: { lat: 12.9971, lng: 77.6965 } },
 { name: "GT World Mall", location: { lat: 12.9651, lng: 77.5831 } },
 { name: "Nexus Mall Koramangala", location: { lat: 12.9304, lng: 77.6224 } },
 { name: "Gopalan Arcade Mall", location: { lat: 12.9389, lng: 77.5195 } },
 ];
 // Custom disability-friendly locations data
 const disabilityFriendlyLocations = [
 { name: "Disability Friendly Children Park - Dr Ambedkar Road", location: { lat: 12.9756,
lng: 77.5938 } },
 { name: "Samarthanam Trust For The Disabled", location: { lat: 12.9217, lng: 77.6156 } },
 { name: "The Association Of People With Disability", location: { lat: 13.0184, lng:
77.5946 } },
 { name: "Aster Labs Kumara Park", location: { lat: 12.9888, lng: 77.5762 } },
 { name: "Snehadeep Trust For The Disabled", location: { lat: 13.0141, lng: 77.6306 } },
 { name: "Ability In Disability", location: { lat: 12.9602, lng: 77.6014 } },
 ];
 const initializeMap = (location) => {
 const loader = new Loader({
 apiKey: "YOUR_API_KEY", // Replace with your API key
 version: "weekly",
 });
loader.load().then(() => {
 const mapInstance = new window.google.maps.Map(document.getElementById("map"),
{
 center: location,
 zoom: 14,
 });
 setMap(mapInstance);
 setIsMapReady(true);
 });
 };
 useEffect(() => {
 if (!map) {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(
 (position) => {
 const location = {
 lat: position.coords.latitude,
 lng: position.coords.longitude,
 };
 initializeMap(location);
 },
 () => alert("Geolocation failed. Please enable location access.")
 );
 } else {
 alert("Geolocation is not supported by this browser.");
 }
 }
 }, [map]);
 const handleFilter = (type) => {
 if (!isMapReady) return;
 markers.forEach((marker) => marker.setMap(null));
 setMarkers([]);
  setPlaces([]);
 const dataMap = {
 disable_friendly_parks: parkData,
 disable_friendly_restaurants: restaurantData,
 disable_friendly_police_stations: policeStationData,
 wheelchair_friendly_malls: mallData,
 disability_friendly_locations: disabilityFriendlyLocations,
 };
 if (dataMap[type]) {
 const newMarkers = dataMap[type].map((place) => {
 const marker = new window.google.maps.Marker({
 position: place.location,
 map,
 title: place.name,
 });
 return marker;
 });
 setMarkers(newMarkers);
 setPlaces(dataMap[type]);
 }
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
 <div
 id="map"
 style={{ height: "500px", width: "100%", marginTop: "20px", borderRadius: "8px" }}
 ></div>
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
export default App;

   
