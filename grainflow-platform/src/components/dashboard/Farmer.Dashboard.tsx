import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const FarmerDashboard = () => {
  const { toast } = useToast();

  // Mock expired donations
  const [expiredDonations, setExpiredDonations] = useState([
    { id: 1, foodType: "Rice", quantity: "5kg", expiredOn: "2025-09-20" },
    { id: 2, foodType: "Bread", quantity: "10 loaves", expiredOn: "2025-09-21" },
  ]);

  const handleCompost = (id: number) => {
    setExpiredDonations(expiredDonations.filter(item => item.id !== id));
    toast({
      title: "Marked as Composted",
      description: "This donation has been moved to compost tracking.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Farmer Dashboard</CardTitle>
          <CardDescription>
            Manage expired donations and convert them into compost or feed
          </CardDescription>
        </CardHeader>
        <CardContent>
          {expiredDonations.length === 0 ? (
            <p className="text-muted-foreground">No expired donations right now 🎉</p>
          ) : (
            <div className="space-y-4">
              {expiredDonations.map(item => (
                <div key={item.id} className="flex items-center justify-between border p-3 rounded-lg">
                  <div>
                    <p className="font-semibold">{item.foodType} ({item.quantity})</p>
                    <p className="text-sm text-muted-foreground">Expired on: {item.expiredOn}</p>
                  </div>
                  <Button size="sm" onClick={() => handleCompost(item.id)}>
                    Compost
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
