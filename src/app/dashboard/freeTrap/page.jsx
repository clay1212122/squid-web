'use client'
import Mapita from "../components/Map";
import { useState } from "react";

export default function Page() {
  const [markers, setMarkers] = useState([]);
  return (
      <main className="w-full">
        <Mapita markers={markers} setMarkers={setMarkers} />
      </main>
  )
}

