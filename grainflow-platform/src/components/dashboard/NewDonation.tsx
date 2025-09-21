import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewDonationProps {
  onBack: () => void;
}

export const NewDonation = ({ onBack }: NewDonationProps) => {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [timeCooked, setTimeCooked] = useState("");
  const [storageMode, setStorageMode] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock submission - in real app, this would send to backend
    toast({
      title: "Donation Created!",
      description: "Your food donation has been listed and NGOs will be notified.",
    });
    
    // Reset form
    setFoodType("");
    setQuantity("");
    setTimeCooked("");
    setStorageMode("");
    
    // Go back to dashboard
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
              <CardTitle>New Donation</CardTitle>
              <CardDescription>
                Share your food with those in need
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="foodType">Food Type</Label>
              <Input
                id="foodType"
                type="text"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                placeholder="e.g., Rice, Vegetables, Bread"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (in kg)</Label>
              <Input
                id="quantity"
                type="number"
                step="0.1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 5.5"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeCooked">Time when food was prepared</Label>
              <Input
                id="timeCooked"
                type="datetime-local"
                value={timeCooked}
                onChange={(e) => setTimeCooked(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storageMode">Storage Mode</Label>
              <Select value={storageMode} onValueChange={setStorageMode} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select storage method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fridge">Fridge (Refrigerated)</SelectItem>
                  <SelectItem value="hotbox">Hot Box (Heated)</SelectItem>
                  <SelectItem value="open">Open (Room Temperature)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">AI Freshness Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Based on your inputs, our AI will calculate the optimal pickup time and freshness duration for this donation.
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Create Donation
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};