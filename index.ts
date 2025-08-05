import "dotenv/config";
import { runLLM } from "./src/llm";
import dotenv from "dotenv";

dotenv.config();
const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}


console.log("**Response**\n");

const response = await runLLM({userMessage});

console.log(" --> Gemini:\n");
console.log(response);