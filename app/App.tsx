"use client";

import { useCallback, useState } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ProductCard } from "@/components/product-card";

// Tipo para el producto - coincide con el tool create_product_summary
type ProductData = {
  name: string;
  price: string;
  sku: string;
  stockLabel: string;
  stockColor: 'success' | 'warning' | 'danger' | 'secondary';
  url: string;
};

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  // Estado para el producto dinámico - null por defecto, no se muestra hasta que el agente lo invoque
  const [product, setProduct] = useState<ProductData | null>(null);

  // Simulación: función para mostrar/actualizar el producto dinámicamente
  // En la práctica, aquí pondrías los datos que llegan del agente
  const updateProduct = () => {
    setProduct({
      name: "Nuevo producto IA",
      price: "Consultar en web",
      sku: "CED-1234",
      stockLabel: "Agotado",
      stockColor: "danger",
      url: "https://www.cedent.com.ar/producto/nuevo",
    });
  };

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-end bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-5xl">
        <ChatKitPanel
          theme={scheme}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
        />
        {/* Widget dinámico: muestra el producto solo cuando hay datos */}
        {product && <ProductCard {...product} />}
      </div>
    </main>
  );
}