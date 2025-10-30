-- Create enum types
CREATE TYPE app_role AS ENUM ('admin', 'donor', 'hospital', 'blood_bank', 'expert');
CREATE TYPE blood_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
CREATE TYPE request_status AS ENUM ('pending', 'matched', 'fulfilled', 'cancelled');
CREATE TYPE urgency_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Profiles table (basic user info)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User roles table (separate for security)
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Donors table
CREATE TABLE donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  blood_type blood_type NOT NULL,
  date_of_birth DATE NOT NULL,
  weight DECIMAL,
  last_donation_date DATE,
  address TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  available BOOLEAN DEFAULT TRUE,
  total_donations INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hospitals table
CREATE TABLE hospitals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  hospital_name TEXT NOT NULL,
  registration_number TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  contact_person TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blood banks table
CREATE TABLE blood_banks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  bank_name TEXT NOT NULL,
  registration_number TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  contact_person TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experts table (medical experts for consultations)
CREATE TABLE experts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  specialization TEXT NOT NULL,
  qualification TEXT NOT NULL,
  experience_years INTEGER,
  consultation_fee DECIMAL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blood inventory table
CREATE TABLE blood_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blood_bank_id UUID REFERENCES blood_banks(id) ON DELETE CASCADE,
  hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE,
  blood_type blood_type NOT NULL,
  units_available INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  CHECK ((blood_bank_id IS NOT NULL AND hospital_id IS NULL) OR (blood_bank_id IS NULL AND hospital_id IS NOT NULL))
);

-- Blood requests table
CREATE TABLE blood_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE NOT NULL,
  patient_name TEXT NOT NULL,
  blood_type blood_type NOT NULL,
  units_needed INTEGER NOT NULL,
  urgency urgency_level NOT NULL,
  status request_status DEFAULT 'pending',
  required_by TIMESTAMPTZ NOT NULL,
  fulfilled_by UUID REFERENCES donors(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  related_request_id UUID REFERENCES blood_requests(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages/Chat table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rewards table
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES donors(id) ON DELETE CASCADE NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  badges JSONB DEFAULT '[]'::jsonb,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Expert appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  expert_id UUID REFERENCES experts(id) ON DELETE CASCADE NOT NULL,
  appointment_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE experts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can view all profiles, update their own
CREATE POLICY "Profiles viewable by all authenticated users" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- User roles: Security definer function for role checking
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON user_roles FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'));

-- Donors policies
CREATE POLICY "Donors viewable by authenticated users" ON donors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Donors can update own data" ON donors FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Donors can insert own data" ON donors FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Hospitals policies  
CREATE POLICY "Hospitals viewable by authenticated users" ON hospitals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Hospitals can update own data" ON hospitals FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Hospitals can insert own data" ON hospitals FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Blood banks policies
CREATE POLICY "Blood banks viewable by authenticated users" ON blood_banks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Blood banks can update own data" ON blood_banks FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Blood banks can insert own data" ON blood_banks FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Experts policies
CREATE POLICY "Experts viewable by all" ON experts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Experts can update own data" ON experts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Experts can insert own data" ON experts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Blood inventory policies
CREATE POLICY "Inventory viewable by all authenticated" ON blood_inventory FOR SELECT TO authenticated USING (true);
CREATE POLICY "Blood banks can manage inventory" ON blood_inventory FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM blood_banks WHERE user_id = auth.uid() AND id = blood_inventory.blood_bank_id)
);
CREATE POLICY "Hospitals can manage inventory" ON blood_inventory FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM hospitals WHERE user_id = auth.uid() AND id = blood_inventory.hospital_id)
);

-- Blood requests policies
CREATE POLICY "Requests viewable by all authenticated" ON blood_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Hospitals can create requests" ON blood_requests FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM hospitals WHERE user_id = auth.uid() AND id = blood_requests.hospital_id)
);
CREATE POLICY "Hospitals can update own requests" ON blood_requests FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM hospitals WHERE user_id = auth.uid() AND id = blood_requests.hospital_id)
);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON notifications FOR INSERT TO authenticated WITH CHECK (true);

-- Messages policies
CREATE POLICY "Users can view own messages" ON messages FOR SELECT TO authenticated USING (
  auth.uid() = sender_id OR auth.uid() = receiver_id
);
CREATE POLICY "Users can send messages" ON messages FOR INSERT TO authenticated WITH CHECK (auth.uid() = sender_id);

-- Rewards policies
CREATE POLICY "Donors can view own rewards" ON rewards FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM donors WHERE user_id = auth.uid() AND id = rewards.donor_id)
);
CREATE POLICY "System can manage rewards" ON rewards FOR ALL TO authenticated USING (true);

-- Appointments policies
CREATE POLICY "Users can view own appointments" ON appointments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create appointments" ON appointments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Experts can view their appointments" ON appointments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM experts WHERE user_id = auth.uid() AND id = appointments.expert_id)
);

-- Trigger for profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blood_requests_updated_at BEFORE UPDATE ON blood_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rewards_updated_at BEFORE UPDATE ON rewards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();