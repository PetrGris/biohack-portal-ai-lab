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
      elements: {
        Row: {
          category: string
          complexity: Database["public"]["Enums"]["complexity_level"]
          created_at: string
          description: string
          difficulty: string
          efficacy: number | null
          evidence: Json | null
          frequency: string | null
          goals: Json | null
          id: string
          mechanism: string | null
          name: string
          popularity: number | null
          risks: Json | null
          science_rating: number | null
          tags: Json | null
          time: string | null
          title: string
          type: Database["public"]["Enums"]["element_type"]
          updated_at: string
          usage: Json | null
        }
        Insert: {
          category: string
          complexity: Database["public"]["Enums"]["complexity_level"]
          created_at?: string
          description: string
          difficulty: string
          efficacy?: number | null
          evidence?: Json | null
          frequency?: string | null
          goals?: Json | null
          id?: string
          mechanism?: string | null
          name: string
          popularity?: number | null
          risks?: Json | null
          science_rating?: number | null
          tags?: Json | null
          time?: string | null
          title: string
          type: Database["public"]["Enums"]["element_type"]
          updated_at?: string
          usage?: Json | null
        }
        Update: {
          category?: string
          complexity?: Database["public"]["Enums"]["complexity_level"]
          created_at?: string
          description?: string
          difficulty?: string
          efficacy?: number | null
          evidence?: Json | null
          frequency?: string | null
          goals?: Json | null
          id?: string
          mechanism?: string | null
          name?: string
          popularity?: number | null
          risks?: Json | null
          science_rating?: number | null
          tags?: Json | null
          time?: string | null
          title?: string
          type?: Database["public"]["Enums"]["element_type"]
          updated_at?: string
          usage?: Json | null
        }
        Relationships: []
      }
      protocol_elements: {
        Row: {
          created_at: string
          custom_dosage: string | null
          element_id: string | null
          id: string
          notes: string | null
          order_position: number
          protocol_id: string | null
        }
        Insert: {
          created_at?: string
          custom_dosage?: string | null
          element_id?: string | null
          id?: string
          notes?: string | null
          order_position?: number
          protocol_id?: string | null
        }
        Update: {
          created_at?: string
          custom_dosage?: string | null
          element_id?: string | null
          id?: string
          notes?: string | null
          order_position?: number
          protocol_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "protocol_elements_element_id_fkey"
            columns: ["element_id"]
            isOneToOne: false
            referencedRelation: "elements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "protocol_elements_protocol_id_fkey"
            columns: ["protocol_id"]
            isOneToOne: false
            referencedRelation: "protocols"
            referencedColumns: ["id"]
          },
        ]
      }
      protocols: {
        Row: {
          author: string
          category: string
          created_at: string
          days: number
          description: string
          difficulty: Database["public"]["Enums"]["protocol_difficulty"]
          forks: number | null
          id: string
          is_public: boolean | null
          last_updated: string | null
          rating: number | null
          slug: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          created_at?: string
          days: number
          description: string
          difficulty: Database["public"]["Enums"]["protocol_difficulty"]
          forks?: number | null
          id?: string
          is_public?: boolean | null
          last_updated?: string | null
          rating?: number | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          created_at?: string
          days?: number
          description?: string
          difficulty?: Database["public"]["Enums"]["protocol_difficulty"]
          forks?: number | null
          id?: string
          is_public?: boolean | null
          last_updated?: string | null
          rating?: number | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      complexity_level: "low" | "medium" | "high"
      element_type:
        | "pharma"
        | "nutraceutical"
        | "physical"
        | "cognitive"
        | "environmental"
        | "tech"
        | "behavioral"
        | "recovery"
      evidence_level: "A" | "B" | "C" | "D"
      protocol_difficulty: "Легкая" | "Средняя" | "Сложная"
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
      complexity_level: ["low", "medium", "high"],
      element_type: [
        "pharma",
        "nutraceutical",
        "physical",
        "cognitive",
        "environmental",
        "tech",
        "behavioral",
        "recovery",
      ],
      evidence_level: ["A", "B", "C", "D"],
      protocol_difficulty: ["Легкая", "Средняя", "Сложная"],
    },
  },
} as const
