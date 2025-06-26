export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      commercial_quotes: {
        Row: {
          admin_notes: string | null
          business_address: string
          business_name: string
          business_type: string
          contact_name: string
          created_at: string | null
          email: string
          estimated_weekly_volume: number | null
          frequency: string
          id: string
          phone: string
          preferred_delivery_time: string | null
          preferred_pickup_time: string | null
          quote_amount: number | null
          service_type: string
          special_requirements: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          business_address: string
          business_name: string
          business_type: string
          contact_name: string
          created_at?: string | null
          email: string
          estimated_weekly_volume?: number | null
          frequency: string
          id?: string
          phone: string
          preferred_delivery_time?: string | null
          preferred_pickup_time?: string | null
          quote_amount?: number | null
          service_type: string
          special_requirements?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          business_address?: string
          business_name?: string
          business_type?: string
          contact_name?: string
          created_at?: string | null
          email?: string
          estimated_weekly_volume?: number | null
          frequency?: string
          id?: string
          phone?: string
          preferred_delivery_time?: string | null
          preferred_pickup_time?: string | null
          quote_amount?: number | null
          service_type?: string
          special_requirements?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      laundry_orders: {
        Row: {
          created_at: string | null
          customer_id: string
          delivery_address: string | null
          estimated_weight: number | null
          id: string
          merchant_id: string | null
          pickup_address: string
          pickup_date: string
          pickup_time: string
          service_type: Database["public"]["Enums"]["service_type"]
          special_instructions: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          delivery_address?: string | null
          estimated_weight?: number | null
          id?: string
          merchant_id?: string | null
          pickup_address: string
          pickup_date: string
          pickup_time: string
          service_type: Database["public"]["Enums"]["service_type"]
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          delivery_address?: string | null
          estimated_weight?: number | null
          id?: string
          merchant_id?: string | null
          pickup_address?: string
          pickup_date?: string
          pickup_time?: string
          service_type?: Database["public"]["Enums"]["service_type"]
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "laundry_orders_merchant_id_fkey"
            columns: ["merchant_id"]
            isOneToOne: false
            referencedRelation: "merchants"
            referencedColumns: ["id"]
          },
        ]
      }
      merchants: {
        Row: {
          business_address: string
          business_name: string
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          is_approved: boolean | null
          phone: string
          service_areas: string[] | null
          services: Database["public"]["Enums"]["service_type"][] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_address: string
          business_name: string
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          phone: string
          service_areas?: string[] | null
          services?: Database["public"]["Enums"]["service_type"][] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_address?: string
          business_name?: string
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          phone?: string
          service_areas?: string[] | null
          services?: Database["public"]["Enums"]["service_type"][] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      service_pricing: {
        Row: {
          base_price: number
          bulk_discount_percentage: number | null
          bulk_discount_threshold: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          is_commercial: boolean | null
          pricing_type: string
          service_name: string
        }
        Insert: {
          base_price: number
          bulk_discount_percentage?: number | null
          bulk_discount_threshold?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_commercial?: boolean | null
          pricing_type: string
          service_name: string
        }
        Update: {
          base_price?: number
          bulk_discount_percentage?: number | null
          bulk_discount_threshold?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_commercial?: boolean | null
          pricing_type?: string
          service_name?: string
        }
        Relationships: []
      }
      shop_orders: {
        Row: {
          created_at: string | null
          customer_id: string
          delivery_address: string
          id: string
          items: Json
          status: string | null
          total_amount: number
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          delivery_address: string
          id?: string
          items: Json
          status?: string | null
          total_amount: number
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          delivery_address?: string
          id?: string
          items?: Json
          status?: string | null
          total_amount?: number
        }
        Relationships: []
      }
      shop_products: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: number
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_booking: {
        Args: {
          p_customer_id: string
          p_merchant_id: string
          p_laundry_order_id: string
          p_booking_date: string
          p_booking_time: string
          p_customer_address?: string
          p_notes?: string
        }
        Returns: string
      }
      get_user_bookings: {
        Args: { user_id: string }
        Returns: {
          id: string
          customer_id: string
          merchant_id: string
          laundry_order_id: string
          booking_date: string
          booking_time: string
          duration_minutes: number
          status: string
          customer_latitude: number
          customer_longitude: number
          customer_address: string
          estimated_distance_km: number
          estimated_travel_time_minutes: number
          notes: string
          created_at: string
          updated_at: string
          merchant: Json
        }[]
      }
      update_booking_status: {
        Args: { booking_id: string; new_status: string }
        Returns: boolean
      }
    }
    Enums: {
      order_status:
        | "pending"
        | "confirmed"
        | "picked_up"
        | "in_progress"
        | "ready"
        | "delivered"
        | "cancelled"
      service_type: "wash_fold" | "dry_cleaning" | "express" | "delicate"
      user_role: "customer" | "merchant" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status: [
        "pending",
        "confirmed",
        "picked_up",
        "in_progress",
        "ready",
        "delivered",
        "cancelled",
      ],
      service_type: ["wash_fold", "dry_cleaning", "express", "delicate"],
      user_role: ["customer", "merchant", "admin"],
    },
  },
} as const
