import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const _ = await req.json();
    // console.log("Prompt response on backend: ",prompt)

    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string.
                    Each question should be separated by '||' for an anonymous social messaging platform like Qooh.me.
                    Avoid personal or sensitive topics. Focus on universal themes that encourage friendly interaction.
                    Example: "What's your favorite book?||If you could visit anywhere, where would you go?||What's something new you learned recently?"`;
    

    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      system: 'You are a helpful assistant that generates engaging questions.',
      prompt
    });
    // console.log(result.toDataStreamResponse())

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate messages" },
      { status: 500 }
    );
  }
}
