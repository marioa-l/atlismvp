import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import { Buffer } from 'buffer';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const data = await pdfParse(buffer);

    return NextResponse.json({ text: data.text });
  } catch (error) {
    console.error('Error processing PDF:', error);s
    return NextResponse.json({ error: 'Error extracting text' }, { status: 500 });
  }
}