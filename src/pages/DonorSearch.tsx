import { useState } from "react";
import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Phone, Mail } from "lucide-react";

const DonorSearch = () => {
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");

  const mockDonors = [
    { name: "Alice Johnson", bloodType: "O+", city: "Mumbai", phone: "+91-9876543210", available: true },
    { name: "Bob Smith", bloodType: "A+", city: "Delhi", phone: "+91-9876543211", available: true },
    { name: "Carol Williams", bloodType: "B-", city: "Bangalore", phone: "+91-9876543212", available: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Search className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Find Blood Donors</h1>
              <p className="text-muted-foreground">Search for available donors by location and blood type</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Search Filters</CardTitle>
              <CardDescription>Narrow down your search criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="searchBloodType">Blood Type</Label>
                  <Select value={bloodType} onValueChange={setBloodType}>
                    <SelectTrigger id="searchBloodType">
                      <SelectValue placeholder="All blood types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="citySearch">City</Label>
                  <Input
                    id="citySearch"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                  />
                </div>

                <div className="flex items-end">
                  <Button className="w-full">
                    <Search className="mr-2 h-4 w-4" />
                    Search Donors
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockDonors.map((donor, idx) => (
              <Card key={idx} className={!donor.available ? "opacity-60" : ""}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {donor.name}
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      donor.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}>
                      {donor.available ? "Available" : "Unavailable"}
                    </span>
                  </CardTitle>
                  <CardDescription>Blood Type: {donor.bloodType}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{donor.city}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{donor.phone}</span>
                  </div>
                  <div className="pt-2">
                    <Button className="w-full" disabled={!donor.available}>
                      {donor.available ? "Contact Donor" : "Not Available"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Location-Based Map View</CardTitle>
              <CardDescription>Visual representation of nearby donors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Map integration coming soon</p>
                  <p className="text-sm text-muted-foreground">Interactive map showing donor locations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Chatbot />
    </div>
  );
};

export default DonorSearch;
