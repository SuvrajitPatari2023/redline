import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DonorSearch = () => {
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<any>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("donors")
        .select(`
          *,
          profiles:user_id (full_name, phone, email)
        `)
        .eq("available", true);

      if (error) throw error;
      setDonors(data || []);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("donors")
        .select(`
          *,
          profiles:user_id (full_name, phone, email)
        `)
        .eq("available", true);

      if (bloodType && bloodType !== "all") {
        query = query.eq("blood_type", bloodType as any);
      }
      if (city) {
        query = query.ilike("city", `%${city}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setDonors(data || []);
      toast({ title: "Success", description: `Found ${data?.length || 0} donors` });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleContactDonor = (donor: any) => {
    setSelectedDonor(donor);
    setContactDialogOpen(true);
  };

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
                  <Button className="w-full" onClick={handleSearch} disabled={loading}>
                    <Search className="mr-2 h-4 w-4" />
                    {loading ? "Searching..." : "Search Donors"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : donors.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No donors found. Try adjusting your search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {donors.map((donor) => (
                <Card key={donor.id}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {donor.profiles?.full_name || "Anonymous"}
                      <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                        Available
                      </span>
                    </CardTitle>
                    <CardDescription>Blood Type: {donor.blood_type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{donor.city}, {donor.state}</span>
                    </div>
                    {donor.profiles?.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{donor.profiles.phone}</span>
                      </div>
                    )}
                    <div className="pt-2">
                      <Button className="w-full" onClick={() => handleContactDonor(donor)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Donor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Donor</DialogTitle>
            <DialogDescription>
              Donor contact information
            </DialogDescription>
          </DialogHeader>
          {selectedDonor && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">{selectedDonor.profiles?.full_name || "Anonymous"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Blood Type</p>
                <p className="text-sm text-muted-foreground">{selectedDonor.blood_type}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{selectedDonor.city}, {selectedDonor.state}</p>
              </div>
              {selectedDonor.profiles?.email && (
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <a href={`mailto:${selectedDonor.profiles.email}`} className="text-sm text-primary hover:underline">
                    {selectedDonor.profiles.email}
                  </a>
                </div>
              )}
              {selectedDonor.profiles?.phone && (
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href={`tel:${selectedDonor.profiles.phone}`} className="text-sm text-primary hover:underline">
                    {selectedDonor.profiles.phone}
                  </a>
                </div>
              )}
              <Button className="w-full" onClick={() => {
                toast({ title: "Message sent", description: "The donor will be notified of your request." });
                setContactDialogOpen(false);
              }}>
                Send Message
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DonorSearch;
