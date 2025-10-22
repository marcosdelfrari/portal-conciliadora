"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Select } from "@/ui/forms/SelectCustom";

interface Option {
  value: string;
  label: string;
}

interface EmpresaEditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (plano: string, tipoFaturamento: string) => void;
  empresaNome: string;
  planoAtual: string;
  tipoFaturamentoAtual: string;
}

export function EmpresaEditPopup({
  isOpen,
  onClose,
  onSave,
  empresaNome,
  planoAtual,
  tipoFaturamentoAtual,
}: EmpresaEditPopupProps) {
  const [plano, setPlano] = useState(planoAtual);
  const [tipoFaturamento, setTipoFaturamento] = useState(tipoFaturamentoAtual);

  // Atualizar os estados quando os valores mudam
  useEffect(() => {
    setPlano(planoAtual);
    setTipoFaturamento(tipoFaturamentoAtual);
  }, [planoAtual, tipoFaturamentoAtual]);

  const handleSave = () => {
    onSave(plano, tipoFaturamento);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const planoOptions: Option[] = [
    { value: "Básico", label: "Básico" },
    { value: "Completo", label: "Completo" },
    { value: "Premium", label: "Premium" },
  ];

  const faturamentoOptions: Option[] = [
    { value: "PIX", label: "PIX" },
    { value: "Boleto", label: "Boleto" },
    { value: "Cartão de Crédito", label: "Cartão de Crédito" },
    { value: "Débito Automático", label: "Débito Automático" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/20 rounded-xl shadow-xl p-6 min-w-80 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Editar - {empresaNome}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
         
            <Select
              label="Plano"
              value={plano}
              onChange={setPlano}
              options={planoOptions}
              placeholder="Selecionar plano..."
            />
          </div>

          <div>
       
            <Select
              label="Tipo de Faturamento"
              value={tipoFaturamento}
              onChange={setTipoFaturamento}
              options={faturamentoOptions}
              placeholder="Selecionar tipo de faturamento..."
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-black/10 dark:border-white/20 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-[#c8d300] text-[#103239] dark:text-[#103239] cursor-pointer rounded-md hover:bg-[#c8d300]/90 transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
