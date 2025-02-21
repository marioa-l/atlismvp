"use client";

import { useState } from 'react';

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [pdfText, setPdfText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Extraer texto del PDF
      const extractResponse = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });
      
      const responseData = await extractResponse.json();
      const { text } = responseData;
      setPdfText(text); // Guardamos el texto del PDF
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error al procesar el PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfText || !question) return;

    setIsLoading(true);
    try {
      const chatResponse = await fetch('/api/query-chatgpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: pdfText,
          question: question 
        }),
      });
      const { result } = await chatResponse.json();
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error al procesar la pregunta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? 'Procesando PDF...' : 'Cargar PDF'}
        </button>
      </form>

      {pdfText && (
        <form onSubmit={handleQuestion} className="mb-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            placeholder="Escribe tu pregunta sobre el PDF..."
            rows={3}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? 'Procesando pregunta...' : 'Hacer pregunta'}
          </button>
        </form>
      )}

      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Respuesta de ChatGPT:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;