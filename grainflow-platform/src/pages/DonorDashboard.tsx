import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, User, Plus } from "lucide-react";
import { NewDonation } from "@/components/dashboard/NewDonation";
import { ProfileUpdate } from "@/components/dashboard/ProfileUpdate";

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const username = localStorage.getItem('username') || 'Donor';
  const fullName = localStorage.getItem('fullName') || 'Anonymous Donor';

  // Mock data - in real app, this would come from API
  const stats = {
    points: 1250,
    ngosHelped: 8,
    kgsDonated: 45.5
  };

  const renderContent = () => {
    switch (activeTab) {
      case "newDonation":
        return <NewDonation onBack={() => setActiveTab("overview")} />;
      case "profile":
        return <ProfileUpdate onBack={() => setActiveTab("overview")} />;
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Welcome back, {fullName}!
                  </CardTitle>
                  <CardDescription>
                    Ready to make a difference today?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => setActiveTab("newDonation")}
                      className="h-20 flex flex-col items-center gap-2"
                    >
                      <Plus className="h-6 w-6" />
                      New Donation
                    </Button>
                    <Button
                      onClick={() => setActiveTab("profile")}
                      variant="outline"
                      className="h-20 flex flex-col items-center gap-2"
                    >
                      <User className="h-6 w-6" />
                      Update Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Rice donated to Hope NGO</p>
                        <p className="text-sm text-muted-foreground">2 hours ago • 5kg</p>
                      </div>
                      <Badge>+50 points</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Vegetables donated to Care Foundation</p>
                        <p className="text-sm text-muted-foreground">1 day ago • 3kg</p>
                      </div>
                      <Badge>+30 points</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary">{stats.points}</div>
                    <div className="text-sm text-muted-foreground">Points Earned</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Heart className="h-4 w-4 text-accent" />
                        <span className="text-2xl font-bold">{stats.ngosHelped}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">NGOs Helped</div>
                    </div>
                    
                    <div className="text-center p-3 bg-secondary/10 rounded-lg">
                      <div className="text-2xl font-bold">{stats.kgsDonated}</div>
                      <div className="text-xs text-muted-foreground">KGs Donated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      🌟 First Donation
                    </Badge>
                    <Badge variant="secondary" className="w-full justify-center py-2">
                      💚 10 Donations Made
                    </Badge>
                    <Badge variant="outline" className="w-full justify-center py-2">
                      🏆 50 KG Milestone (45.5/50)
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Donor Dashboard</h1>
          <p className="text-muted-foreground">Manage your donations and track your impact</p>
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default DonorDashboard;