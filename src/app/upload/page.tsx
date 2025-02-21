import UploadForm from '@/components/UploadForm';

export default function UploadPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Subir PDF y Consultar ChatGPT</h1>
      <UploadForm />
    </div>
  );
}