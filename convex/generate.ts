"use node";
import TextServiceClient from "../src/lib/google-generative-language";
import GoogleAuth from "../src/lib/google-auth";
import { internalAction } from "./_generated/server";
import { v } from "convex/values";

const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.NEXT_PUBLIC_PALM_API_KEY!;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

export const generate = internalAction({
  args: {
    userPrompt: v.string(),
    date: v.string(),
  },
  async handler(ctx, args) {
    const prompt = `
        Oragnize tasks into a weekly planner for the week of ${args.date} with the following prompt:
        ${args.userPrompt}.
        Try to organize your tasks in a way that makes sense to you. If the user inputes different days of the week, 
        use them in the output. Also avoid assigning too many tasks on one day.
        After you have organized your tasks, return the output in a JSON array as such.
        DO NOT copy the data as-is, but rather use the data to generate your own output:
            [
                {
                    "title": "task 1",
                    "date":"Tuesday, September 19"
                }
            ]
            Note that there may be more than one task in that array, this is just an example.
            
            Look for keywords like tomorrow and today to help you organize the tasks.
        `;

    const result = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });
    return result[0].candidates![0].output;
  },
});
