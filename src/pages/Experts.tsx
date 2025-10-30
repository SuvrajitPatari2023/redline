import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Clock, Award } from "lucide-react";

const Experts = () => {
  const mockExperts = [
    {
      name: "Dr. Sarah Patel",
      specialization: "Hematology",
      qualification: "MD, MBBS",
      experience: 15,
      rating: 4.8,
      fee: 500,
      available: true
    },
    {
      name: "Dr. Rajesh Kumar",
      specialization: "Blood Banking",
      qualification: "MD, DCP",
      experience: 12,
      rating: 4.9,
      fee: 600,
      available: true
    },
    {
      name: "Dr. Priya Sharma",
      specialization: "Transfusion Medicine",
      qualification: "MD, DNB",
      experience: 10,
      rating: 4.7,
      fee: 450,
      available: false
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Award className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Medical Experts</h1>
              <p className="text-muted-foreground">Consult with certified blood donation specialists</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockExperts.map((expert, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{expert.name}</span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-normal text-foreground">{expert.rating}</span>
                    </div>
                  </CardTitle>
                  <CardDescription>{expert.specialization}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>{expert.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{expert.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">₹{expert.fee}</span>
                      <span className="text-muted-foreground">consultation fee</span>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Button className="w-full" disabled={!expert.available}>
                      <Calendar className="mr-2 h-4 w-4" />
                      {expert.available ? "Book Appointment" : "Not Available"}
                    </Button>
                    {expert.available && (
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Why Consult an Expert?</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold">Pre-Donation Consultation</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized advice on preparation, eligibility, and health requirements before donating blood.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Post-Donation Care</h3>
                <p className="text-sm text-muted-foreground">
                  Learn about recovery, nutrition, and when it's safe to donate again.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Medical Queries</h3>
                <p className="text-sm text-muted-foreground">
                  Get answers to any health-related questions about blood donation and transfusion.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Emergency Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Receive immediate expert advice for urgent blood requirement situations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Chatbot />
    </div>
  );
};

export default Experts;
