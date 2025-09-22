import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

// Component for clicking on the map to pick location
function LocationPicker({
  setLatLng,
}: {
  setLatLng: (val: { lat: number; lng: number }) => void;
}) {
  useMapEvents({
    click(e) {
      setLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

interface ProfileUpdateProps {
  onBack: () => void;
}

export const ProfileUpdate = ({ onBack }: ProfileUpdateProps) => {
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || ""
  );
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [address, setAddress] = useState(localStorage.getItem("address") || "");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [latLng, setLatLng] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const { toast } = useToast();

  useEffect(() => {
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");
    if (lat && lng) {
      setLatLng({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save everything to localStorage (mock)
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("address", address);
    localStorage.setItem("bio", bio);
    if (latLng) {
      localStorage.setItem("lat", latLng.lat.toString());
      localStorage.setItem("lng", latLng.lng.toString());
    }

    toast({
      title: "Profile Updated!",
      description: "Your profile information has been successfully updated.",
    });

    setTimeout(() => {
      onBack();
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>Update Profile</CardTitle>
              <CardDescription>
                Keep your information up to date
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Your full address"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Optional)</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a bit about yourself and your motivation to help..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Update Location</Label>
              <div style={{ height: "250px" }}>
                <MapContainer
                  center={latLng || { lat: 28.7041, lng: 77.1025 }} // Default Delhi
                  zoom={12}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {latLng && <Marker position={[latLng.lat, latLng.lng]} />}
                  <LocationPicker setLatLng={setLatLng} />
                </MapContainer>
              </div>
              {latLng && (
                <p className="text-sm text-muted-foreground mt-1">
                  Picked Location: {latLng.lat.toFixed(4)},{" "}
                  {latLng.lng.toFixed(4)}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
