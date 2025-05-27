
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { elementId } = await req.json();

    // Получаем элемент из базы данных
    const { data: element, error } = await supabaseClient
      .from('elements')
      .select('*')
      .eq('id', elementId)
      .single();

    if (error || !element) {
      throw new Error('Element not found');
    }

    // Формируем промпт для ИИ анализа
    const prompt = `
Проанализируй следующий элемент для протокола здоровья и дополни недостающую информацию:

Название: ${element.name}
Описание: ${element.description}
Тип: ${element.type}
Механизм: ${element.mechanism || 'не указан'}

Пожалуйста, дополни следующую информацию в формате JSON:
{
  "mechanism": "детальный механизм действия",
  "goals": ["цель 1", "цель 2"],
  "usage": {
    "dose": "рекомендуемая дозировка",
    "method": "способ применения",
    "freq": "частота применения",
    "duration": "длительность курса",
    "schedule": ["время приема"]
  },
  "efficacy": число от 1 до 10,
  "evidence": {
    "level": "A, B, C или D",
    "studies": ["ссылка на исследование"]
  },
  "risks": {
    "common": ["частые побочные эффекты"],
    "critical": ["серьезные риски"]
  },
  "tags": ["тег1", "тег2"],
  "category": "категория",
  "popularity": число от 0 до 100,
  "science_rating": число от 1 до 5,
  "time": "время на выполнение",
  "frequency": "частота применения",
  "difficulty": "Легкая, Средняя или Сложная"
}
`;

    // Запрос к OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Ты эксперт в области здоровья и биохакинга. Анализируй элементы протоколов и дополняй их научно обоснованной информацией.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
      }),
    });

    const aiData = await response.json();
    const analysis = JSON.parse(aiData.choices[0].message.content);

    // Обновляем элемент в базе данных
    const { error: updateError } = await supabaseClient
      .from('elements')
      .update({
        ...analysis,
        ai_analysis: {
          analyzed_at: new Date().toISOString(),
          model: 'gpt-4o-mini',
          confidence: 0.8
        },
        status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('id', elementId);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ success: true, analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-element function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
