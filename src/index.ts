import fs from "fs";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Load API key from environment variables
const apiKey = process.env.NK_OPEN_AI_KEY;

if (!apiKey) {
  throw new Error(
    "API key not found. Make sure to set NK_OPEN_AI_KEY in your .env file."
  );
}

const openai = new OpenAI({ apiKey });

const speechFile = path.resolve('speech',"./speech.mp3");

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "Today is a wonderful day to build something people love!",
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
  console.log(`file write completed : ${speechFile}`);
}
main();