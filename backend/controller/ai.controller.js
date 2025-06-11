import dotenv from "dotenv";
dotenv.config();

import User from "../model/user.model.js";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const aiFeedback = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
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

Please respond with a string that has the following :

1. professional_feedback: For each sentence or bullet in the portfolio that could be clearer (mention where that line is coming from - which experience,project, about etc), more concise, or more professional, output **only** your **rewritten** version of that sentence.  **Do not** repeat or restate sentences that are already clear and professional.  Provide your feedback from a field-agnostic perspective (assume the reader may come from any industry).

2. rating: A number between 1 and 10 (up to one decimal point) evaluating the overall strength of the portfolio.

3. missing_skills: 
    - "skill": the name of a skill they don’t list but should consider.
    - "reason": a short sentence explanation of why they should learn it.
    - "courses": an array of up to 2-3 recommended online courses (by name + platform).
    - Link: link to the course if possible

Make sure to output exactly valid string—no extraneous text. Example output:

professional_feedback -
    " XYZ line can be changed to Led a team of five to implement a new inventory system, increasing tracking accuracy by 30% because of XYZ reason"
    "XYZ line can be changed to Collaborated cross-functionally with marketing and design to roll out user-facing feature because of XYZ reason"
  
rating - 8/10,

missing_skills -
  skill - "Project Management",
  reason - "Formal PM skills help you plan, track, and deliver on time across industries.",
  courses - 
        "Google Project Management Professional Certificate (Coursera)" link if possible,
        "Introduction to Project Management (edX) link if possible"
`,
      },
    ];

    // // let completion;
    // // try {
    // //   completion = await openai.chat.completions.create({
    // //     model: "gpt-3.5-turbo",
    // //     messages,
    // //     temperature: 0.7,
    // //   });
    // // } catch (openaiErr) {
    // //   return res
    // //     .status(502)
    // //     .json({ message: "OpenAI API error", details: openaiErr.toString() });
    // // }

    // // const assistantReply = completion.choices[0].message.content.trim();
    // // let parsed;
    // // try {
    // //   parsed = JSON.parse(assistantReply);
    // // } catch (err) {
    // //   return res.status(500).json({
    // //     message: "AI did not return valid response. Try again.",
    // //     raw: assistantReply,
    // //   });
    // // }

    // return res.status(200).json(parsed);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
    });
    const assistantReply = completion.choices[0].message.content.trim();

    return res.status(200).send(assistantReply);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.toString() });
  }
};
