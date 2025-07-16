// app/not-authorized/page.tsx
'use client';

export default function NotAuthorizedPage() {
  return (
    <div className="text-center p-10 min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Acceso denegado</h1>
      <p>No tienes permiso para ver esta página.</p>
    </div>
  );
}