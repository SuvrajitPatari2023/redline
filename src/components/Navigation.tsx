import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import logo from "@/assets/redline-logo.png";
import { Menu, X, Bell } from "lucide-react";

const Navigation = () => {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="REDLINE" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition">
                  Dashboard
                </Link>
                <Link to="/emergency" className="text-sm font-medium hover:text-primary transition">
                  Emergency
                </Link>
                <Link to="/donor-search" className="text-sm font-medium hover:text-primary transition">
                  Find Donors
                </Link>
                <Link to="/experts" className="text-sm font-medium hover:text-primary transition">
                  Experts
                </Link>
                <Link to="/help" className="text-sm font-medium hover:text-primary transition">
                  Help
                </Link>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/help" className="text-sm font-medium hover:text-primary transition">
                  Help
                </Link>
                <Button onClick={() => navigate("/auth")} variant="outline">
                  Login
                </Button>
                <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {user ? (
              <>
                <Link to="/dashboard" className="block text-sm font-medium hover:text-primary transition py-2">
                  Dashboard
                </Link>
                <Link to="/emergency" className="block text-sm font-medium hover:text-primary transition py-2">
                  Emergency
                </Link>
                <Link to="/donor-search" className="block text-sm font-medium hover:text-primary transition py-2">
                  Find Donors
                </Link>
                <Link to="/experts" className="block text-sm font-medium hover:text-primary transition py-2">
                  Experts
                </Link>
                <Link to="/help" className="block text-sm font-medium hover:text-primary transition py-2">
                  Help
                </Link>
                <Button onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/help" className="block text-sm font-medium hover:text-primary transition py-2">
                  Help
                </Link>
                <Button onClick={() => navigate("/auth")} className="w-full" variant="outline">
                  Login
                </Button>
                <Button onClick={() => navigate("/auth")} className="w-full bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
