import DocumentUploader from '@/components/documents/DocumentUploader';

export default function UploadPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Subir Documento</h1>
      <DocumentUploader />
    </div>
  );
}