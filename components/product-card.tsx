import React from 'react';

// Definimos las propiedades tal cual vienen de tu widget
interface ProductCardProps {
  name: string;
  price: string;
  sku: string;
  stockLabel: string;
  stockColor: 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'discovery';
  url: string;
}

export const ProductCard = ({ name, price, sku, stockLabel, stockColor, url }: ProductCardProps) => {
  // Mapeo de tus colores del widget a estilos de Tailwind reales
  const colorStyles = {
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    discovery: 'bg-purple-100 text-purple-800',
  };

  // Fallback por si la IA alucina un color que no existe
  const badgeStyle = colorStyles[stockColor] || colorStyles.secondary;

  // Lógica de seguridad para el link: Si la URL viene vacía, busca en Google/Cedent
  const safeUrl = url && url.startsWith('http') 
    ? url 
    : `https://www.cedent.com.ar/listado/insumos-odontologicos/q_${encodeURIComponent(name)}`;

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden my-2 font-sans">
      <div className="p-4 flex flex-col gap-3">
        {/* Título */}
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {name}
        </h3>

        {/* Fila de Precio y Stock */}
        <div className="flex justify-between items-center">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyle}`}>
            {stockLabel}
          </span>
          <span className="text-lg font-semibold text-gray-900">
            {price}
          </span>
        </div>

        {/* SKU */}
        <div className="text-xs text-gray-500">
          SKU: {sku}
        </div>

        {/* Botón de Acción (Convertido a enlace real) */}
        <a 
          href={safeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-md transition-colors mt-2"
        >
          Ver producto
        </a>
      </div>
    </div>
  );
};
