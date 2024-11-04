import Groq from "groq-sdk";
import { LinkedInProfile, EmailTemplate } from "../types";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are an expert email copywriter specializing in creating funny, creative, and highly personalized outreach emails for link-building services. Your emails should be engaging, humorous, and tailored to the prospect's background while maintaining professionalism.

Focus on:
1. Creative, attention-grabbing subject lines
2. Personalized opening lines referencing the prospect's background
3. Clear value proposition about link-building
4. Natural humor that doesn't feel forced
5. Clear call-to-action

Keep the tone friendly but professional, and ensure the email highlights Linkcoasters' value proposition for high-authority backlinks.`;

export async function generateEmail(profile: LinkedInProfile): Promise<EmailTemplate> {
  try {
    const prompt = `Generate a personalized outreach email for a prospect with the following LinkedIn profile:

Name: ${profile.name}
Job Title: ${profile.jobTitle}
Company: ${profile.company}
Recent Activities: ${profile.recentActivities}
Interests: ${profile.interests}
Achievements: ${profile.achievements}

The email should promote Linkcoasters' high-authority backlink services. Make it creative, funny, and engaging while maintaining professionalism.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response received from Groq API');
    }

    // Split the response into preview and body
    const lines = response.split('\n');
    const preview = lines[0];
    const body = lines.slice(1).join('\n');

    return {
      preview,
      body
    };
  } catch (error) {
    console.error('Email generation error:', error);
    throw new Error('Failed to generate email. Please try again.');
  }
}