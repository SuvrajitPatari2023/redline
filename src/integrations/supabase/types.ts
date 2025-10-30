export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          created_at: string | null
          expert_id: string
          id: string
          notes: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          expert_id: string
          id?: string
          notes?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          expert_id?: string
          id?: string
          notes?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_expert_id_fkey"
            columns: ["expert_id"]
            isOneToOne: false
            referencedRelation: "experts"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_banks: {
        Row: {
          address: string
          bank_name: string
          city: string
          contact_person: string | null
          created_at: string | null
          id: string
          latitude: number | null
          longitude: number | null
          registration_number: string
          state: string
          user_id: string
        }
        Insert: {
          address: string
          bank_name: string
          city: string
          contact_person?: string | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          registration_number: string
          state: string
          user_id: string
        }
        Update: {
          address?: string
          bank_name?: string
          city?: string
          contact_person?: string | null
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          registration_number?: string
          state?: string
          user_id?: string
        }
        Relationships: []
      }
      blood_inventory: {
        Row: {
          blood_bank_id: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          hospital_id: string | null
          id: string
          last_updated: string | null
          units_available: number
        }
        Insert: {
          blood_bank_id?: string | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          hospital_id?: string | null
          id?: string
          last_updated?: string | null
          units_available?: number
        }
        Update: {
          blood_bank_id?: string | null
          blood_type?: Database["public"]["Enums"]["blood_type"]
          hospital_id?: string | null
          id?: string
          last_updated?: string | null
          units_available?: number
        }
        Relationships: [
          {
            foreignKeyName: "blood_inventory_blood_bank_id_fkey"
            columns: ["blood_bank_id"]
            isOneToOne: false
            referencedRelation: "blood_banks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_inventory_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      blood_requests: {
        Row: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at: string | null
          fulfilled_by: string | null
          hospital_id: string
          id: string
          notes: string | null
          patient_name: string
          required_by: string
          status: Database["public"]["Enums"]["request_status"] | null
          units_needed: number
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_level"]
        }
        Insert: {
          blood_type: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          fulfilled_by?: string | null
          hospital_id: string
          id?: string
          notes?: string | null
          patient_name: string
          required_by: string
          status?: Database["public"]["Enums"]["request_status"] | null
          units_needed: number
          updated_at?: string | null
          urgency: Database["public"]["Enums"]["urgency_level"]
        }
        Update: {
          blood_type?: Database["public"]["Enums"]["blood_type"]
          created_at?: string | null
          fulfilled_by?: string | null
          hospital_id?: string
          id?: string
          notes?: string | null
          patient_name?: string
          required_by?: string
          status?: Database["public"]["Enums"]["request_status"] | null
          units_needed?: number
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"]
        }
        Relationships: [
          {
            foreignKeyName: "blood_requests_fulfilled_by_fkey"
            columns: ["fulfilled_by"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blood_requests_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      donors: {
        Row: {
          address: string | null
          available: boolean | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          city: string
          created_at: string | null
          date_of_birth: string
          id: string
          last_donation_date: string | null
          latitude: number | null
          longitude: number | null
          state: string
          total_donations: number | null
          user_id: string
          weight: number | null
        }
        Insert: {
          address?: string | null
          available?: boolean | null
          blood_type: Database["public"]["Enums"]["blood_type"]
          city: string
          created_at?: string | null
          date_of_birth: string
          id?: string
          last_donation_date?: string | null
          latitude?: number | null
          longitude?: number | null
          state: string
          total_donations?: number | null
          user_id: string
          weight?: number | null
        }
        Update: {
          address?: string | null
          available?: boolean | null
          blood_type?: Database["public"]["Enums"]["blood_type"]
          city?: string
          created_at?: string | null
          date_of_birth?: string
          id?: string
          last_donation_date?: string | null
          latitude?: number | null
          longitude?: number | null
          state?: string
          total_donations?: number | null
          user_id?: string
          weight?: number | null
        }
        Relationships: []
      }
      experts: {
        Row: {
          available: boolean | null
          consultation_fee: number | null
          created_at: string | null
          experience_years: number | null
          id: string
          qualification: string
          specialization: string
          user_id: string
        }
        Insert: {
          available?: boolean | null
          consultation_fee?: number | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          qualification: string
          specialization: string
          user_id: string
        }
        Update: {
          available?: boolean | null
          consultation_fee?: number | null
          created_at?: string | null
          experience_years?: number | null
          id?: string
          qualification?: string
          specialization?: string
          user_id?: string
        }
        Relationships: []
      }
      hospitals: {
        Row: {
          address: string
          city: string
          contact_person: string | null
          created_at: string | null
          hospital_name: string
          id: string
          latitude: number | null
          longitude: number | null
          registration_number: string
          state: string
          user_id: string
        }
        Insert: {
          address: string
          city: string
          contact_person?: string | null
          created_at?: string | null
          hospital_name: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          registration_number: string
          state: string
          user_id: string
        }
        Update: {
          address?: string
          city?: string
          contact_person?: string | null
          created_at?: string | null
          hospital_name?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          registration_number?: string
          state?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          related_request_id: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          related_request_id?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          related_request_id?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_request_id_fkey"
            columns: ["related_request_id"]
            isOneToOne: false
            referencedRelation: "blood_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rewards: {
        Row: {
          badges: Json | null
          created_at: string | null
          donor_id: string
          id: string
          level: number | null
          points: number
          updated_at: string | null
        }
        Insert: {
          badges?: Json | null
          created_at?: string | null
          donor_id: string
          id?: string
          level?: number | null
          points?: number
          updated_at?: string | null
        }
        Update: {
          badges?: Json | null
          created_at?: string | null
          donor_id?: string
          id?: string
          level?: number | null
          points?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rewards_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
          verified: boolean | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
          verified?: boolean | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "donor" | "hospital" | "blood_bank" | "expert"
      blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      request_status: "pending" | "matched" | "fulfilled" | "cancelled"
      urgency_level: "low" | "medium" | "high" | "critical"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "donor", "hospital", "blood_bank", "expert"],
      blood_type: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      request_status: ["pending", "matched", "fulfilled", "cancelled"],
      urgency_level: ["low", "medium", "high", "critical"],
    },
  },
} as const
