
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Protocol {
  id: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  category: string;
  rating: number;
  forks: number;
  days: number;
  difficulty: string;
  status: string;
  is_public: boolean;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

export interface ProtocolWithElements extends Protocol {
  protocol_elements: {
    id: string;
    order_position: number;
    custom_dosage: string | null;
    notes: string | null;
    elements: {
      id: string;
      name: string;
      title: string;
      description: string;
      category: string;
      time: string;
      frequency: string;
    };
  }[];
}

export const useProtocols = () => {
  return useQuery({
    queryKey: ["protocols"],
    queryFn: async () => {
      console.log("Fetching protocols from Supabase...");
      const { data, error } = await supabase
        .from("protocols")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching protocols:", error);
        throw error;
      }

      console.log("Fetched protocols:", data?.length);
      return data as Protocol[];
    },
  });
};

export const useProtocol = (slug: string) => {
  return useQuery({
    queryKey: ["protocol", slug],
    queryFn: async () => {
      console.log("Fetching protocol by slug:", slug);
      const { data, error } = await supabase
        .from("protocols")
        .select(`
          *,
          protocol_elements (
            id,
            order_position,
            custom_dosage,
            notes,
            elements (
              id,
              name,
              title,
              description,
              category,
              time,
              frequency
            )
          )
        `)
        .eq("slug", slug)
        .eq("is_public", true)
        .single();

      if (error) {
        console.error("Error fetching protocol:", error);
        throw error;
      }

      console.log("Fetched protocol with elements:", data);
      return data as ProtocolWithElements;
    },
    enabled: !!slug,
  });
};
