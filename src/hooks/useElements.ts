
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Element {
  id: string;
  name: string;
  title: string;
  description: string;
  type: string;
  goals: string[];
  mechanism: string;
  usage: {
    dose?: string;
    method?: string;
    freq?: string;
    schedule?: string[];
    duration?: string;
    stop_if?: string;
  };
  complexity: string;
  efficacy: number;
  evidence: {
    level?: string;
    studies?: string[];
  };
  risks?: {
    common?: string[];
    critical?: string[];
  };
  tags: string[];
  category: string;
  popularity: number;
  difficulty: string;
  science_rating: number;
  time: string;
  frequency: string;
  created_at: string;
  updated_at: string;
}

export const useElements = () => {
  return useQuery({
    queryKey: ["elements"],
    queryFn: async () => {
      console.log("Fetching elements from Supabase...");
      const { data, error } = await supabase
        .from("elements")
        .select("*")
        .order("popularity", { ascending: false });

      if (error) {
        console.error("Error fetching elements:", error);
        throw error;
      }

      console.log("Fetched elements:", data?.length);
      return data as Element[];
    },
  });
};

export const useElement = (id: string) => {
  return useQuery({
    queryKey: ["element", id],
    queryFn: async () => {
      console.log("Fetching element by id:", id);
      const { data, error } = await supabase
        .from("elements")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching element:", error);
        throw error;
      }

      console.log("Fetched element:", data);
      return data as Element;
    },
    enabled: !!id,
  });
};
