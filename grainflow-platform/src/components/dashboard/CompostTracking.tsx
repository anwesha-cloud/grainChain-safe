import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const CompostTracking = () => {
  const [composted, setComposted] = useState([
    { id: 1, foodType: "Rice", weight: "5kg", date: "2025-09-20" },
    { id: 2, foodType: "Bread", weight: "10 loaves", date: "2025-09-21" },
  ]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compost Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {composted.length === 0 ? (
          <p className="text-muted-foreground">No compost batches recorded yet</p>
        ) : (
          <ul className="space-y-2">
            {composted.map(item => (
              <li key={item.id} className="border p-2 rounded">
                {item.foodType} – {item.weight} (Composted on {item.date})
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
