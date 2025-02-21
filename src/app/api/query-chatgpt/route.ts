import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { text, question } = await request.json();

  try {
    const prompt = `Basándote en el siguiente texto del PDF:
    
${text}

Responde a esta pregunta: ${question}

Por favor, proporciona una respuesta clara y concisa basada únicamente en la información contenida en el texto del PDF.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: 'system', 
          content: 'Eres un asistente experto en analizar documentos y responder preguntas específicas sobre su contenido. Utiliza solo la información proporcionada en el documento para responder.' 
        },
        { 
          role: 'user', 
          content: prompt 
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error al procesar la pregunta con ChatGPT' }, { status: 500 });
  }
}