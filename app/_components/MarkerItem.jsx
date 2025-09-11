// import React, { useState } from 'react'
// import { MarkerF, OverlayView } from '@react-google-maps/api'
// import MarkerListingItem from './MarkerListingItem'

// function MarkerItem({item}) {
//     const [selectedListing,setSelectedListing]=useState()
//   return (
//     <div>
//         item.coordinates &&
//         item.coordinates.lat &&
//         item.coordinates.lng && (
//         <MarkerF
//             position={{
//             lat: item.coordinates.lat,
//             lng: item.coordinates.lng,
//             }}
//             onClick={()=>setSelectedListing(item)}
//             icon={{
//                 url: '/gps.png', // ✅ No import needed
//                 scaledSize: {
//                   width: 60,
//                   height: 60,
//                 },
//               }}
//         />
//     )

//     {selectedListing && <OverlayView
//         position={selectedListing.coordinates}
//         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//         >
//             <div>
//                 <MarkerListingItem 
//                 closeHandler={()=>setSelectedListing(null)}
//                 item={selectedListing}/>
//             </div>
//     </OverlayView>}

//     </div>
//   )
// }

// export default MarkerItem


import React, { useState } from 'react'
import { MarkerF, OverlayView } from '@react-google-maps/api'
import MarkerListingItem from './MarkerListingItem'

function MarkerItem({ item }) {
  const [selectedListing, setSelectedListing] = useState(null)

  const hasCoordinates =
    item?.coordinates &&
    item.coordinates?.lat !== undefined &&
    item.coordinates?.lng !== undefined

  return (
    <>
      {hasCoordinates && (
        <MarkerF
          position={{
            lat: item.coordinates.lat,
            lng: item.coordinates.lng,
          }}
          onClick={() => setSelectedListing(item)}
          icon={{
            url: '/pin.png',
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      )}

      {selectedListing && (
        <OverlayView
          position={selectedListing.coordinates}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div>
            <MarkerListingItem
              closeHandler={() => setSelectedListing(null)}
              item={selectedListing}
            />
          </div>
        </OverlayView>
      )}
    </>
  )
}

export default MarkerItem
