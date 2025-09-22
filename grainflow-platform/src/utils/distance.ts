// src/utils/distance.ts
export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371; // earth radius km
  const toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinHalfLat = Math.sin(dLat / 2);
  const sinHalfLon = Math.sin(dLon / 2);

  const c =
    2 *
    Math.asin(
      Math.sqrt(
        sinHalfLat * sinHalfLat +
          Math.cos(lat1) * Math.cos(lat2) * sinHalfLon * sinHalfLon
      )
    );
  return R * c;
}
