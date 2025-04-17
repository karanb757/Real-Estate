"use client";
import React from "react";
import { MapPin } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

function GoogleAddressSearch({selectedAddress,setCoordinates}) {
  return (
    <div className="flex items-center w-full">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-[#7f57f1] bg-purple-300" />
      
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            if (!place || !place.label) return;
            selectedAddress(place);
          
            geocodeByAddress(place.label)
              .then((results) => getLatLng(results[0]))
              .then(({ lat, lng }) => {
                setCoordinates({ lat, lng });
                // console.log("Latitude:", lat);
                // console.log("Longitude:", lng);
              })
              .catch((error) =>
                console.error("Error getting geocode:", error)
              );
          }
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
