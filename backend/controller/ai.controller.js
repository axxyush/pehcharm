import dotenv from "dotenv";
dotenv.config();

import User from "../model/user.model.js";
import OpenAI from "openai";

// Add debug logging for API key
console.log("OpenAI API Key exists:", !!process.env.OPENAI_API_KEY);
console.log("OpenAI API Key length:", process.env.OPENAI_API_KEY?.length);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiFeedback = async (req, res) => {
  try {
    const { username } = req.params;
    console.log("Processing AI feedback for username:", username);

    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res.status(404).json({ message: "User not found" });
    }

    const portfolioText = `Name: ${user.name} 
        About: ${user.about || "[No about]"}

        Experience: ${(user.experience || [])
          .map(
            (exp) =>
              `- ${exp.jobtitle} at ${exp.company} (${exp.year}), ${exp.location} Description: ${exp.jobdescription}`
          )
          .join("\n")}

        Education: ${(user.education || [])
          .map(
            (edu) =>
              `- ${edu.clgname}, ${edu.degree}, Class of ${edu.year}. GPA: ${edu.gpa} Activities: ${edu.activities}`
          )
          .join("\n")}

        Skills:${(user.skills || []).join(", ")}

        Projects: ${(user.project || [])
          .map(
            (proj) =>
              `- ${proj.title} (${proj.time}) Skills: ${proj.skills}Description: ${proj.description} Link: ${proj.link}`
          )
          .join("\n")}

        Honors & Awards: ${user.honors || "[None]"}

        LinkedIn: ${user.linkedin || "[Not Provided]"}
        GitHub: ${user.github || "[Not Provided]"}
        Instagram: ${user.instagram || "[Not Provided]"}`;

    const messages = [
      {
        role: "system",
        content:
          "You are a seasoned, inclusive career coach and expert resume reviewer. " +
          "You write feedback that applies to people from any background.",
      },
      {
        role: "user",
        content: `Here is the user's portfolio data: ${portfolioText}

Please respond with a JSON object that has the following fields:

1. "professional_feedback": For each sentence or bullet in the portfolio that could be clearer, more concise, or more professional, output **only** your **rewritten** version of that sentence.  **Do not** repeat or restate sentences that are already clear and professional.  Provide your feedback from a field-agnostic perspective (assume the reader may come from any industry).

2. "rating": A number between 1 and 10 (up to one decimal point) evaluating the overall strength of the portfolio.

3. "missing_skills": An array of objects, each with:
    - "skill": the name of a skill they don't list but should consider.
    - "reason": a short sentence explanation of why they should learn it.
    - "courses": an array of up to 2-3 recommended online courses (by name + platform).

Make sure to output exactly valid JSON—no extraneous text. Example output:
\`\`\`json
{
  "professional_feedback": [
    " XYZ line can be changed to Led a team of five to implement a new inventory system, increasing tracking accuracy by 30% because of XYZ reason",
    "XYZ line can be changed to Collaborated cross-functionally with marketing and design to roll out user-facing feature because of XYZ reason"
  ],
  "rating": 8,
  "missing_skills": [
    {
      "skill": "Project Management",
      "reason": "Formal PM skills help you plan, track, and deliver on time across industries.",
      "courses": [
        "Google Project Management Professional Certificate (Coursera)",
        "Introduction to Project Management (edX)"
      ]
    }
  ]
}
`,
      },
    ];

    let completion;
    try {
      console.log("Attempting to call OpenAI API...");
      completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
      });
      console.log("OpenAI API call successful");
    } catch (openaiErr) {
      console.error("OpenAI API error details:", {
        message: openaiErr.message,
        status: openaiErr.status,
        type: openaiErr.type,
        code: openaiErr.code
      });
      return res
        .status(502)
        .json({ 
          message: "OpenAI API error", 
          details: openaiErr.toString(),
          error: openaiErr
        });
    }

    const assistantReply = completion.choices[0].message.content.trim();
    console.log("Raw AI response:", assistantReply);
    
    let parsed;
    try {
      parsed = JSON.parse(assistantReply);
      console.log("Successfully parsed AI response:", parsed);
    } catch (err) {
      console.error("Failed to parse AI response:", {
        error: err.message,
        rawResponse: assistantReply
      });
      return res.status(500).json({
        message: "AI did not return valid JSON response. Try again.",
        raw: assistantReply,
        error: err.message
      });
    }

    // Validate the parsed response has the required fields
    if (!parsed.professional_feedback || !parsed.rating || !parsed.missing_skills) {
      console.error("AI response missing required fields:", parsed);
      return res.status(500).json({
        message: "AI response missing required fields",
        received: parsed
      });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Server error in aiFeedback:", err);
    return res
      .status(500)
      .json({ 
        message: "Server error", 
        error: err.toString(),
        stack: err.stack 
      });
  }
};
