import "dotenv/config";
import { runLLM } from "./src/llm";
import dotenv from "dotenv";
import { addMessages,getMessages } from "./src/memory";
import {z} from "zod";
import { runAgent } from "./src/agent";

dotenv.config();
const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}


const weatherTool = {
  name : "get_weather",
  description: "when weather is asked about certain location , use locationTool to get lat and long and then use this tool.",
  parameters: z.object({
    reasoning: z.string().describe("Why did you pick this tool?"),
  }),
}

const  locationTool = {
  name: "get_location",
  description: "use this get location's lat and long, and then pass it to weatherTool to get weather",
  parameters: z.object({
    reasoning: z.string().describe("Why did you pick this tool?"),
  }),
}

const carTool = {
  name: "get_carInformation",
  description: "use this tool to get car information",
  parameters: z.object({
    reasoning: z.string().describe("Why did you pick this tool?"),
  }),
} 


const response = await runAgent({userMessage, tools:[weatherTool, locationTool, carTool]})
console.log(response)

