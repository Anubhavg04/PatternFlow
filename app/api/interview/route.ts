export async function POST(request: Request) {
  const { pattern, difficulty, timeLeft, messages } = await request.json()
  
  if (!pattern) {
    return Response.json({ error: "Pattern is required" }, { status: 400 })
  }

  // In a real app we'd verify the token or use Clerk auth. 

  const systemPrompt = `You are a STRICT, professional tech interviewer from a top FAANG company (Google/Amazon). 
You are conducting a voice-to-voice mock interview with a candidate.
The focus pattern for today's interview is: ${pattern}.
The requested difficulty level is: ${difficulty || "Medium"}.

RULES:
1. ALWAYS keep your responses concise (1 to 3 sentences maximum). This will be spoken out loud via text-to-speech, so long paragraphs are terrible.
2. DO NOT use markdown, code blocks, or special characters (like asterisks or hashtags). Speak entirely in plain English text.
3. Start by warmly greeting them. DO NOT ask a generic, textbook algorithm question (e.g. "Given an array..."). Instead, frame the question dynamically as a real-world engineering problem or a unique, creative scenario that requires the ${pattern} pattern to solve. Make it feel authentic.
4. As they answer, BE STRICT AND REALISTIC. If they give a superficial, one-word, or lazy answer (like just saying "yes" or "I would use a loop"), DO NOT praise them. Push back immediately and demand a detailed step-by-step explanation, including time and space complexity.
5. If their logic is flawed, point it out directly and ask them to fix it.
6. Act like a human conversationalist. Use words like "Got it," "That makes sense," "Hmm," or "Okay."
7. TIME MANAGEMENT: You have ${timeLeft} seconds remaining. If this is less than 60 seconds, you MUST wrap up the interview immediately. Do not ask any more questions. Instead, give a quick verbal feedback summary covering exactly these points:
   - Their communication skills.
   - The best part of their performance.
   - What they need to focus on or improve.
   - Name 1 or 2 top companies that frequently ask this exact type of question.
   Explicitly say "We are out of time, let's end here" at the very end.`

  // Format messages for OpenRouter
  // If messages is empty, we just pass the system prompt to trigger the opening question
  const openRouterMessages = [
    { role: "system", content: systemPrompt },
    ...messages
  ]
  
  // If it's the very first call, we need to prompt the AI to start
  if (messages.length === 0) {
    openRouterMessages.push({ role: "user", content: "Hi, I'm ready to start the interview." })
  }

  try {
    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: openRouterMessages,
        max_tokens: 300, // Keep it short for voice
      }),
    })

    let aiData;
    try {
      aiData = await aiResponse.json();
    } catch (e) {
      console.error("Failed to parse OpenRouter JSON:", e);
      return Response.json({ error: "AI response format error" }, { status: 500 });
    }

    if (!aiResponse.ok) {
      console.error("OpenRouter API Error:", aiData);
      return Response.json({ error: `AI API error` }, { status: 500 });
    }

    const rawText = aiData.choices?.[0]?.message?.content || "I'm sorry, I didn't catch that. Could you repeat?"
    
    // Clean up any stray markdown that the AI might have hallucinated despite instructions
    const cleanText = rawText.replace(/[*#`_]/g, "").trim()

    return Response.json({ reply: cleanText })
  } catch (error) {
    console.error("API error", error)
    return Response.json({ error: "Failed to generate reply" }, { status: 500 })
  }
}
