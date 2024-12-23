import { GenerateColorPalette } from "@/utils/features/GenerateColorPalette";
import { useState } from "react";
import { TailwindApiSection } from "../TailwindApiSection";
import useCopyToClipboard from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";

interface SinglePaletteCardProps {
  color: string;
}

export const SinglePaletteCard = ({ color }: SinglePaletteCardProps) => {
  const [copiedCardIndex, setCopiedCardIndex] = useState<number | null>(null);
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopyClick = (color: string, index: number) => {
    setCopiedCardIndex(index); // Registrar el card copiado
    copyToClipboard({ textToCopy: color });

    toast.success("Color copied to clipboard!", {
      className: "font-sf-display bg-white opacity-75 hidden xl:flex",
      position: "bottom-center",
      style: {
        border: `1px solid ${color}`,
      },
    });
    setTimeout(() => {
      setCopiedCardIndex(null); // Regresar al estado inicial después de 1.5 segundos
    }, 1000);
  };

  const palette = GenerateColorPalette({
    baseColor: color,
  }); // Generar paleta basada en el color recibido

  const colors: Record<number, string> = palette ? palette.colors.brand : {};

  return (
    <div className="w-full flex items-center pt-8 flex-col gap-3">
      <div className="grid grid-cols-12 xl:grid-cols-11 gap-2 w-full">
        {Object.entries(colors).map(([index, color]) => (
          <article
            className="flex flex-col gap-1 col-span-6 md:col-span-3 lg:col-span-2 xl:col-span-1"
            key={index}
          >
            <div
              className="w-full group relative rounded-lg shadow-flat flex items-center justify-center h-14 transition-all duration-150"
              style={{ backgroundColor: color }}
            >
              {/* Texto del color */}
              <span className="text-xs text-gray-800 px-2 py-1 rounded opacity-80 transition-transform duration-150 group-hover:translate-y-[-10px] font-sf-display">
                {color}
              </span>

              {/* Ícono de copiar */}
              {copiedCardIndex !== Number(index) && (
                <span
                  onClick={() => handleCopyClick(color, Number(index))}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-[10px] bottom-3 transition-all duration-150 text-gray-700 icon-[tabler--copy] absolute"
                ></span>
              )}

              {/* Texto "Copied" */}
              {copiedCardIndex === Number(index) && (
                <span className="opacity-80 font-bold translate-y-[-20px] -rotate-6 text-base-content/80 absolute bottom-2 transition-opacity duration-150 animate-chibolita-exit font-sf-display">
                  copied!
                </span>
              )}
            </div>
            <small className="font-sf-display opacity-50">{index}</small>
          </article>
        ))}
      </div>
      <TailwindApiSection colors={colors} />
    </div>
  );
};
