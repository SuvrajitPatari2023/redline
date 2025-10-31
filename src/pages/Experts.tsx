import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Star, Clock, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Experts = () => {
  const [experts, setExperts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const { toast } = useToast();

  // Sample data for demonstration
  const sampleExperts = [
    {
      id: "sample-1",
      profiles: { full_name: "Dr. Sarah Patel", email: "sarah.patel@redline.com" },
      specialization: "Hematology",
      qualification: "MD, MBBS",
      experience_years: 15,
      consultation_fee: 500,
      available: true
    },
    {
      id: "sample-2",
      profiles: { full_name: "Dr. Rajesh Kumar", email: "rajesh.kumar@redline.com" },
      specialization: "Blood Banking",
      qualification: "MD, DCP",
      experience_years: 12,
      consultation_fee: 600,
      available: true
    },
    {
      id: "sample-3",
      profiles: { full_name: "Dr. Priya Sharma", email: "priya.sharma@redline.com" },
      specialization: "Transfusion Medicine",
      qualification: "MD, DNB",
      experience_years: 10,
      consultation_fee: 450,
      available: false
    },
    {
      id: "sample-4",
      profiles: { full_name: "Dr. Amit Verma", email: "amit.verma@redline.com" },
      specialization: "Clinical Pathology",
      qualification: "MD, FRCPath",
      experience_years: 18,
      consultation_fee: 550,
      available: true
    },
    {
      id: "sample-5",
      profiles: { full_name: "Dr. Meera Reddy", email: "meera.reddy@redline.com" },
      specialization: "Immunohematology",
      qualification: "MD, PhD",
      experience_years: 14,
      consultation_fee: 650,
      available: true
    },
    {
      id: "sample-6",
      profiles: { full_name: "Dr. Vikram Singh", email: "vikram.singh@redline.com" },
      specialization: "Pediatric Hematology",
      qualification: "MD, DCH",
      experience_years: 9,
      consultation_fee: 480,
      available: true
    }
  ];

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("experts")
        .select(`
          *,
          profiles:user_id (full_name, email)
        `);

      if (error) throw error;
      // If no real experts, use sample data
      setExperts(data && data.length > 0 ? data : sampleExperts);
    } catch (error: any) {
      // On error, fallback to sample data
      setExperts(sampleExperts);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (expert: any) => {
    setSelectedExpert(expert);
    setBookingDialogOpen(true);
  };

  const submitAppointment = async () => {
    if (!appointmentDate) {
      toast({ title: "Error", description: "Please select a date and time", variant: "destructive" });
      return;
    }

    setBookingLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Error", description: "Please login first", variant: "destructive" });
        setBookingLoading(false);
        return;
      }

      // Check if this is a sample expert
      if (selectedExpert.id.startsWith('sample-')) {
        toast({ 
          title: "Demo Mode", 
          description: "This is a sample expert. In production, your appointment would be confirmed and the expert notified.",
          duration: 5000
        });
        setBookingDialogOpen(false);
        setAppointmentDate("");
        setNotes("");
        setBookingLoading(false);
        return;
      }

      const { error } = await supabase.from("appointments").insert({
        user_id: session.user.id,
        expert_id: selectedExpert.id,
        appointment_date: appointmentDate,
        notes,
        status: "scheduled"
      });

      if (error) throw error;

      toast({ title: "Success", description: "Appointment booked successfully! The expert will contact you soon." });
      setBookingDialogOpen(false);
      setAppointmentDate("");
      setNotes("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setBookingLoading(false);
    }
  };

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

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : experts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No experts available at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {experts.map((expert) => (
                <Card key={expert.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{expert.profiles?.full_name || "Expert"}</span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-normal text-foreground">4.8</span>
                      </div>
                    </CardTitle>
                    <CardDescription>{expert.specialization || "Medical Expert"}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>{expert.qualification || "Certified"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{expert.experience_years || 0} years experience</span>
                      </div>
                      {expert.consultation_fee && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">₹{expert.consultation_fee}</span>
                          <span className="text-muted-foreground">consultation fee</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 space-y-2">
                      <Button 
                        className="w-full" 
                        disabled={!expert.available}
                        onClick={() => handleBookAppointment(expert)}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {expert.available ? "Book Appointment" : "Not Available"}
                      </Button>
                      {expert.available && expert.profiles?.email && (
                        <Button variant="outline" className="w-full" asChild>
                          <a href={`mailto:${expert.profiles.email}`}>
                            View Profile
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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

      <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Schedule a consultation with {selectedExpert?.profiles?.full_name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Date & Time</Label>
              <Input
                id="appointmentDate"
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointmentNotes">Notes (Optional)</Label>
              <Textarea
                id="appointmentNotes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific concerns or questions..."
                rows={3}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={submitAppointment}
              disabled={bookingLoading}
            >
              {bookingLoading ? "Booking..." : "Confirm Appointment"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Experts;
