import { NextResponse } from 'next/server'
import OpenAI from "openai";

export async function POST(request) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    const data = await request.json()
    console.log(`got a request: ${JSON.stringify(data, null, 4)}`)
    const response = await openai.images.generate({
        prompt: `make an image to go with these words: ${data.prompt}`,
        n: 1,
        size: "256x256",
    });
    return NextResponse.json({ result: response.data, params: data})
}