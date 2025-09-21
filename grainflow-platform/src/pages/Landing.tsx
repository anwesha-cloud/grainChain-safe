import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Login } from "@/components/auth/Login";
import { SignUp } from "@/components/auth/SignUp";
import backgroundImage from "@/assets/background.jpg";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleBack = () => {
    setShowLogin(false);
    setShowSignUp(false);
  };

  if (showLogin) {
    return <Login onBack={handleBack} />;
  }

  if (showSignUp) {
    return <SignUp onBack={handleBack} />;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-background/60" />
      
      <Card className="w-full max-w-md relative z-10 bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary mb-2">
            GrainChain
          </CardTitle>
          <CardDescription className="text-lg">
            Connecting donors with NGOs to reduce food waste
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Join our community to make a difference in fighting hunger and reducing food waste.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={() => setShowSignUp(true)}
              className="w-full"
              size="lg"
            >
              Sign Up
            </Button>
            <Button 
              onClick={() => setShowLogin(true)}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Landing;