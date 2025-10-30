import { useState } from "react";
import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, MapPin } from "lucide-react";

const Emergency = () => {
  const [patientName, setPatientName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState("");
  const [urgency, setUrgency] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Error", description: "Please login first", variant: "destructive" });
        return;
      }

      // Get hospital ID
      const { data: hospital } = await supabase
        .from("hospitals")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (!hospital) {
        toast({ title: "Error", description: "Hospital profile not found", variant: "destructive" });
        return;
      }

      const requiredBy = new Date();
      requiredBy.setHours(requiredBy.getHours() + (urgency === "critical" ? 1 : urgency === "high" ? 6 : 24));

      const { error } = await supabase.from("blood_requests").insert({
        hospital_id: hospital.id,
        patient_name: patientName,
        blood_type: bloodType as any,
        units_needed: parseInt(units),
        urgency: urgency as any,
        required_by: requiredBy.toISOString(),
        notes
      });

      if (error) throw error;

      toast({ title: "Success", description: "Emergency request created successfully!" });
      
      // Reset form
      setPatientName("");
      setBloodType("");
      setUnits("");
      setUrgency("");
      setNotes("");
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <div>
              <h1 className="text-3xl font-bold">Emergency Blood Request</h1>
              <p className="text-muted-foreground">Create urgent blood requirement requests</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
              <CardDescription>Fill in the patient and blood requirement information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="Enter patient name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodType">Blood Type</Label>
                    <Select value={bloodType} onValueChange={setBloodType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
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
                    <Label htmlFor="units">Units Required</Label>
                    <Input
                      id="units"
                      type="number"
                      min="1"
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      placeholder="Number of units"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select value={urgency} onValueChange={setUrgency} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical (1 hour)</SelectItem>
                        <SelectItem value="high">High (6 hours)</SelectItem>
                        <SelectItem value="medium">Medium (24 hours)</SelectItem>
                        <SelectItem value="low">Low (48+ hours)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requirements or medical conditions..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Creating..." : "Create Emergency Request"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {/* Add map feature */}}>
                    <MapPin className="mr-2 h-4 w-4" />
                    View on Map
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Emergency Requests</CardTitle>
              <CardDescription>Current urgent blood requirements in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">Patient: John Smith</p>
                    <p className="text-sm text-muted-foreground">Blood Type: O+ | Units: 2 | Critical</p>
                  </div>
                  <Button size="sm">Respond</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">Patient: Mary Johnson</p>
                    <p className="text-sm text-muted-foreground">Blood Type: A- | Units: 1 | High</p>
                  </div>
                  <Button size="sm">Respond</Button>
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

export default Emergency;
