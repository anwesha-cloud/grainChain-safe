import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Clock, Package } from "lucide-react";

const NGODashboard = () => {
  const username = localStorage.getItem('username') || 'NGO';
  const fullName = localStorage.getItem('fullName') || 'Anonymous NGO';

  // Mock donation requests - in real app, this would come from API
  const donationRequests = [
    {
      id: 1,
      donor: "John Doe",
      foodType: "Rice",
      quantity: "5kg",
      timeCooked: "2 hours ago",
      storageMode: "Fridge",
      status: "Available",
      location: "Downtown Area"
    },
    {
      id: 2,
      donor: "Restaurant ABC",
      foodType: "Mixed Vegetables",
      quantity: "8kg",
      timeCooked: "1 hour ago",
      storageMode: "Hot Box",
      status: "Available",
      location: "City Center"
    },
    {
      id: 3,
      donor: "Sarah Wilson",
      foodType: "Bread",
      quantity: "3kg",
      timeCooked: "4 hours ago",
      storageMode: "Open",
      status: "Expiring Soon",
      location: "North District"
    }
  ];

  const getStorageBadgeColor = (mode: string) => {
    switch (mode) {
      case "Fridge": return "bg-blue-500/10 text-blue-500";
      case "Hot Box": return "bg-red-500/10 text-red-500";
      case "Open": return "bg-yellow-500/10 text-yellow-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Available": return "default";
      case "Expiring Soon": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">NGO Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {fullName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-muted-foreground">Available Donations</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">Total Received</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Building2 className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-bold">42</div>
                  <div className="text-sm text-muted-foreground">Active Donors</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Package className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">289kg</div>
                  <div className="text-sm text-muted-foreground">Food Rescued</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Available Donation Requests</CardTitle>
            <CardDescription>
              Food donations available for pickup from generous donors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {donationRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{request.foodType}</h3>
                      <p className="text-sm text-muted-foreground">
                        Donated by: {request.donor}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Location: {request.location}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant={getStatusBadgeVariant(request.status)}>
                        {request.status}
                      </Badge>
                      <Badge className={getStorageBadgeColor(request.storageMode)}>
                        {request.storageMode}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Quantity: {request.quantity}</span>
                      <span>Cooked: {request.timeCooked}</span>
                    </div>
                    <Button size="sm">
                      Request Pickup
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NGODashboard;