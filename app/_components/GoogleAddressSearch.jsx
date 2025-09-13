"use client";
import React from "react";
import { MapPin } from "lucide-react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

function GoogleAddressSearch({selectedAddress,setCoordinates}) {
  return (
    <div className="flex items-center w-full mt-0">
      <MapPin className="h-10 w-10 p-2 rounded-l-lg text-[#7f57f1] " />
      
      {/* <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full ",
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
      /> */}

<GooglePlacesAutocomplete
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
  selectProps={{
    placeholder: "Search Property Address",
    isClearable: true,
    className: "w-full",
    styles: {
      control: (provided) => ({
        ...provided,
        backgroundColor: "white", // input background
        color: "black",
      }),
      input: (provided) => ({
        ...provided,
        color: "black", // typing text
      }),
      singleValue: (provided) => ({
        ...provided,
        color: "black", // selected value
      }),
      placeholder: (provided) => ({
        ...provided,
        color: "gray", // placeholder text
      }),
      option: (provided, state) => ({
        ...provided,
        color: "black", // dropdown options text
        backgroundColor: state.isFocused ? "#f3f3f3" : "white",
      }),
    },
    onChange: (place) => {
      if (!place || !place.label) return;
      selectedAddress(place);

      geocodeByAddress(place.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setCoordinates({ lat, lng });
        })
        .catch((error) => console.error("Error getting geocode:", error));
    },
  }}
/>
    </div>
  );
}

export default GoogleAddressSearch;