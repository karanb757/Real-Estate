import { Button } from "../components/ui/button.jsx";
import Image from "next/image";
import ListingMapView from '../app/_components/ListingMapView.jsx'

export default function Home() {
  return (
    <div className="p-10">
      <ListingMapView type='sell'/>
    </div>
  );
}
