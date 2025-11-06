"use client"
import {
  GoogleGenerativeAI,
} from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model=genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
};

export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Generate A Course Tutorial on Following Detail with field as Course Name, Description, Along with Chapter Name, about, Duration"
                }
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: "```json\n{\n  \"Course Name\": \"...\",\n  \"Description\": \"...\",\n  \"Chapters\": [\n    {\n      \"Chapter Name\": \"...\",\n      \"About\": \"...\",\n      \"Duration\": \"2 hours\"\n    },\n    {\n      \"Chapter Name\": \"...\",\n      \"About\": \"...\",\n      \"Duration\": \"3 hours\"\n    }\n  ]\n}\n```"
                }
            ],
        },
    ],
});

export const GenerateChapterContent_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "\nExplain the concept in Detail on Topic: Python Basic, chapter: Introduction to Python in JSON Format with list of array with fields as title, description in detail, Code Example (code field in <precode> format) if applicable"
                }
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: "```json\n{\n  \"title\": \"Introduction to Python\",\n  \"description\": \"Python is a high-level, interpreted programming language known for its readability and versatility.\",\n  \"code\": \"<precode>print('Hello, World!')</precode>\"\n}\n```"
                }
            ],
        }
    ]
});
