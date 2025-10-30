import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";
import heroImage from "@/assets/hero-image.jpg";
import { Heart, MapPin, Brain, Award, Shield, Users, Zap, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: MapPin, title: "Location-Based Search", desc: "Find donors near you instantly" },
    { icon: Brain, title: "AI Smart Matching", desc: "Intelligent donor-patient matching" },
    { icon: Zap, title: "Emergency Alerts", desc: "Real-time critical notifications" },
    { icon: Shield, title: "Verified Users", desc: "Secure and authenticated platform" },
    { icon: Award, title: "Reward System", desc: "Earn points and recognition" },
    { icon: Users, title: "Expert Consultation", desc: "Connect with medical professionals" },
    { icon: Heart, title: "Inventory Management", desc: "Track blood availability" },
    { icon: Clock, title: "24/7 Support", desc: "Always here to help" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Save Lives With
                <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> REDLINE</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                A Smart System for Improving Blood Availability and Communication. 
                Connect donors, hospitals, and blood banks in real-time.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => navigate("/help")}
                >
                  Learn More
                </Button>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Active Donors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Lives Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Partner Hospitals</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Blood Donation" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Blood Management Platform
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to manage blood donations efficiently
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Simple steps to start saving lives</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create your account as a donor, hospital, blood bank, or expert
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle>Get Matched</CardTitle>
                <CardDescription>
                  AI-powered system matches donors with requests based on location and urgency
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <CardTitle>Save Lives</CardTitle>
                <CardDescription>
                  Respond to requests, donate blood, and make a real difference
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of donors and healthcare providers on REDLINE
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate("/auth")}
            className="text-lg px-8"
          >
            Join REDLINE Today
          </Button>
        </div>
      </section>

      <Chatbot />
    </div>
  );
};

export default Index;
