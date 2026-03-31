import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { budget, preference, location } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are Frizo, an Indian meal planning AI for college students. Generate a 7-day meal plan (Monday to Sunday) with breakfast, lunch, and dinner for each day.

Rules:
- Food preference: ${preference || 'veg'}
- Monthly budget: ₹${budget || 3000} (so daily ~₹${Math.round((budget || 3000) / 30)})
- Location/cuisine preference: ${location || 'All India'}
- All meals must be Indian, student-friendly, easy to cook
- Include emoji, calories, cost in INR, prep time, tags, ingredients list, and cooking steps
- Keep costs realistic for Indian students
- Variety across the week - don't repeat meals`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Generate a complete 7-day meal plan as JSON." }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_weekly_plan",
              description: "Generate a 7-day Indian meal plan for students",
              parameters: {
                type: "object",
                properties: {
                  days: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        day: { type: "string" },
                        breakfast: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                            emoji: { type: "string" },
                            calories: { type: "number" },
                            cost: { type: "number" },
                            prepTime: { type: "string" },
                            tags: { type: "array", items: { type: "string" } },
                            ingredients: { type: "array", items: { type: "string" } },
                            steps: { type: "array", items: { type: "string" } },
                            region: { type: "string" }
                          },
                          required: ["name", "emoji", "calories", "cost", "prepTime", "tags", "ingredients", "steps"]
                        },
                        lunch: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                            emoji: { type: "string" },
                            calories: { type: "number" },
                            cost: { type: "number" },
                            prepTime: { type: "string" },
                            tags: { type: "array", items: { type: "string" } },
                            ingredients: { type: "array", items: { type: "string" } },
                            steps: { type: "array", items: { type: "string" } },
                            region: { type: "string" }
                          },
                          required: ["name", "emoji", "calories", "cost", "prepTime", "tags", "ingredients", "steps"]
                        },
                        dinner: {
                          type: "object",
                          properties: {
                            name: { type: "string" },
                            emoji: { type: "string" },
                            calories: { type: "number" },
                            cost: { type: "number" },
                            prepTime: { type: "string" },
                            tags: { type: "array", items: { type: "string" } },
                            ingredients: { type: "array", items: { type: "string" } },
                            steps: { type: "array", items: { type: "string" } },
                            region: { type: "string" }
                          },
                          required: ["name", "emoji", "calories", "cost", "prepTime", "tags", "ingredients", "steps"]
                        }
                      },
                      required: ["day", "breakfast", "lunch", "dinner"]
                    }
                  }
                },
                required: ["days"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "generate_weekly_plan" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "No plan generated" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const plan = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(plan), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-meal-plan error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
