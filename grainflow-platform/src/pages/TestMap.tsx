import React from "react";
import { DonationMap } from "../components/DonationMap.tsx";

export default function TestMapPage() {
  const donor = { lat: 28.7041, lng: 77.1025, name: "Donor A" };
  const ngo = { lat: 28.6139, lng: 77.209, name: "NGO X" };
  const expiryIso = new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(); // 2 hours from now

  return (
    <div style={{ padding: 20 }}>
      <h2>Map test</h2>
      <DonationMap donor={donor} ngo={ngo} expiryTimeIso={expiryIso} />
    </div>
  );
}
