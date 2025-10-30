import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navigation from "@/components/Navigation";
import Chatbot from "@/components/Chatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Heart, Users, AlertCircle, Award, Calendar } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (roleData) {
        setUserRole(roleData.role);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getDashboardContent = () => {
    const commonStats = [
      { icon: Heart, label: "Total Donations", value: "1,234", color: "text-red-500" },
      { icon: Users, label: "Active Donors", value: "567", color: "text-blue-500" },
      { icon: Activity, label: "Requests Today", value: "23", color: "text-green-500" },
      { icon: AlertCircle, label: "Urgent Cases", value: "5", color: "text-orange-500" },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">
            {userRole === "donor" && "Track your donations and make a difference"}
            {userRole === "hospital" && "Manage blood requests and inventory"}
            {userRole === "blood_bank" && "Monitor inventory and fulfill requests"}
            {userRole === "expert" && "Manage consultations and appointments"}
            {userRole === "admin" && "Oversee platform operations"}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {commonStats.map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {userRole === "donor" && (
                <>
                  <Button className="w-full" onClick={() => navigate("/donor-search")}>
                    <Heart className="mr-2 h-4 w-4" />
                    Update Availability
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/emergency")}>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    View Urgent Requests
                  </Button>
                </>
              )}
              {userRole === "hospital" && (
                <>
                  <Button className="w-full" onClick={() => navigate("/emergency")}>
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Create Emergency Request
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Activity className="mr-2 h-4 w-4" />
                    View Inventory
                  </Button>
                </>
              )}
              {userRole === "expert" && (
                <>
                  <Button className="w-full" onClick={() => navigate("/experts")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    View Appointments
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Patient Consultations
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted">
                  <Award className="h-5 w-5 text-primary" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">Donation completed</p>
                    <p className="text-muted-foreground text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted">
                  <Heart className="h-5 w-5 text-primary" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">Profile updated</p>
                    <p className="text-muted-foreground text-xs">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-12">
        {getDashboardContent()}
      </main>
      <Chatbot />
    </div>
  );
};

export default Dashboard;
