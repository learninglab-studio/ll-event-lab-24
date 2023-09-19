import { NextResponse } from 'next/server'
const OpenAI = require("openai");


export async function GET( request, { params } ) {


  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
  const response = await openai.images.generate({
    prompt: `make an image to go with these words: ${params.prompt}`,
    n: 1,
    size: "256x256",
  });
  return NextResponse.json({ result: response.data, params: params.prompt})
}