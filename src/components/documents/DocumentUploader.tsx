import { Storage } from 'aws-amplify';
import { useState } from 'react';

const DocumentUploader = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (file) {
      try {
        await Storage.put(file.name, file);
        alert('Documento subido con éxito');
      } catch (error) {
        console.error('Error subiendo el documento:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload}>Subir</button>
    </div>
  );
};

export default DocumentUploader;