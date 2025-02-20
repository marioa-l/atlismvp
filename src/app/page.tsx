import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Sistema de Documentos</h1>
      <Link href="/upload" className="text-blue-500 underline">
        Subir un documento
      </Link>
    </div>
  );
}