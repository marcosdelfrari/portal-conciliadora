"use client";

import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { Select } from "@/ui/forms/SelectCustom";

interface Option {
  value: string;
  label: string;
}

interface EditPopupProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "select";
  options?: Option[];
  columnLabel?: string;
  rowData?: Record<string, unknown>;
}

export function EditPopup({
  isOpen,
  onClose,
  value,
  onChange,
  type = "text",
  options = [],
  columnLabel = "campo",
  rowData,
}: EditPopupProps) {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isOpen && type !== "select" && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isOpen, type]);

  const handleSave = () => {
    onChange(editValue);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const getTitle = () => {
    if (!rowData || !columnLabel) return "Editar valor";

    const empresaNome = (rowData.nome as string) || "empresa";

    if (columnLabel.toLowerCase().includes("plano")) {
      return `Editar Plano - ${empresaNome}`;
    } else if (columnLabel.toLowerCase().includes("faturamento")) {
      return `Editar tipo de faturamento - ${empresaNome}`;
    } else {
      return `Editar ${columnLabel.toLowerCase()} - ${empresaNome}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/20 rounded-md shadow-xl p-4 min-w-64 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
            {getTitle()}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {type === "select" && options.length > 0 ? (
            <Select
              label={columnLabel}
              value={editValue}
              onChange={setEditValue}
              options={options}
              placeholder="Selecionar..."
            />
          ) : (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#c8d300]"
            />
          )}

          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-[#c8d300] text-white dark:text-[#103239] cursor-pointer rounded hover:bg-[#c8d300] transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
