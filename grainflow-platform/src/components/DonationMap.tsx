// src/components/DonationMap.tsx
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { haversineKm } from "../utils/distance";

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type LatLng = { lat: number; lng: number };

interface Props {
  donor: { lat: number; lng: number; name?: string };
  ngo: { lat: number; lng: number; name?: string };
  expiryTimeIso: string; // ISO string
  small?: boolean; // smaller footprint if needed
}

export const DonationMap: React.FC<Props> = ({
  donor,
  ngo,
  expiryTimeIso,
  small = false,
}) => {
  const center = {
    lat: (donor.lat + ngo.lat) / 2,
    lng: (donor.lng + ngo.lng) / 2,
  };
  const distanceKm = haversineKm(donor, ngo);
  const avgSpeedKmph = 25; // rough assumption
  const travelTimeMin = Math.max(
    1,
    Math.round((distanceKm / avgSpeedKmph) * 60)
  );
  const expiry = new Date(expiryTimeIso);
  const timeRemainingMin = Math.max(
    0,
    Math.round((expiry.getTime() - Date.now()) / 60000)
  );
  const safetyBufferMin = 10;
  const reachable = timeRemainingMin >= travelTimeMin + safetyBufferMin;

  const polylinePositions: [number, number][] = [
    [donor.lat, donor.lng],
    [ngo.lat, ngo.lng],
  ];

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong>Distance:</strong> {distanceKm.toFixed(2)} km
          </div>
          <div>
            <strong>ETA:</strong> {travelTimeMin} min
          </div>
          <div>
            <strong>Expires:</strong> {expiry.toLocaleString()}
          </div>
          <div>
            <span
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                color: "#fff",
                backgroundColor: reachable ? "#16a34a" : "#dc2626",
              }}
            >
              {reachable ? "Reachable" : "May not reach"}
            </span>
          </div>
        </div>
      </div>

      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{
          height: small ? 240 : 360,
          width: "100%",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[donor.lat, donor.lng]}>
          <Popup>
            <div>
              <strong>Donor</strong>
              <br />
              {donor.name || "Donor location"}
            </div>
          </Popup>
        </Marker>
        <Marker position={[ngo.lat, ngo.lng]}>
          <Popup>
            <div>
              <strong>NGO</strong>
              <br />
              {ngo.name || "NGO location"}
            </div>
          </Popup>
        </Marker>

        <Polyline
          positions={polylinePositions}
          color={reachable ? "#16a34a" : "#dc2626"}
        />
      </MapContainer>
    </div>
  );
};
