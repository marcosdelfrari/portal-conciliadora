import React, { useState, useRef } from "react";

type MaskType = "cnpj" | "cpf" | "phone" | "cep" | "currency" | "none";

interface NumericInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  maskType?: MaskType;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
}

// Funções de máscara
const applyMask = (value: string, maskType: MaskType): string => {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, "");

  switch (maskType) {
    case "cnpj":
      return numericValue
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .substring(0, 18);

    case "cpf":
      return numericValue
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2")
        .substring(0, 14);

    case "phone":
      if (numericValue.length <= 10) {
        return numericValue
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2")
          .substring(0, 14);
      } else {
        return numericValue
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{5})(\d)/, "$1-$2")
          .substring(0, 15);
      }

    case "cep":
      return numericValue.replace(/^(\d{5})(\d)/, "$1-$2").substring(0, 9);

    case "currency":
      return numericValue
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        .replace(/^/, "R$ ");

    case "none":
    default:
      return numericValue;
  }
};

// Função para obter o placeholder baseado no tipo de máscara
const getPlaceholder = (
  maskType: MaskType,
  customPlaceholder?: string
): string => {
  if (customPlaceholder) return customPlaceholder;

  switch (maskType) {
    case "cnpj":
      return "00.000.000/0000-00";
    case "cpf":
      return "000.000.000-00";
    case "phone":
      return "(00) 00000-0000";
    case "cep":
      return "00000-000";
    case "currency":
      return "R$ 0,00";
    default:
      return "Digite apenas números";
  }
};

// Função para obter o comprimento máximo baseado no tipo de máscara
const getMaxLength = (maskType: MaskType, customMaxLength?: number): number => {
  if (customMaxLength) return customMaxLength;

  switch (maskType) {
    case "cnpj":
      return 18; // 14 dígitos + 4 caracteres de formatação
    case "cpf":
      return 14; // 11 dígitos + 3 caracteres de formatação
    case "phone":
      return 15; // 11 dígitos + 4 caracteres de formatação
    case "cep":
      return 9; // 8 dígitos + 1 hífen
    case "currency":
      return 20; // Valor flexível para moeda
    default:
      return 50;
  }
};

export const NumericInput: React.FC<NumericInputProps> = ({
  label,
  placeholder,
  value = "",
  onChange,
  maskType = "none",
  required = false,
  disabled = false,
  className = "",
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const effectiveMaxLength = getMaxLength(maskType, maxLength);
  const effectivePlaceholder = getPlaceholder(maskType, placeholder);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    let newValue = e.target.value;

    // Aplicar máscara se não for "none"
    if (maskType !== "none") {
      newValue = applyMask(newValue, maskType);
    }

    // Limitar comprimento
    if (newValue.length > effectiveMaxLength) {
      newValue = newValue.substring(0, effectiveMaxLength);
    }

    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    // Permitir apenas números e algumas teclas especiais
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Control",
      "Meta",
      "Alt",
    ];

    if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const numericText = pastedText.replace(/\D/g, "");

    let processedValue = numericText;
    if (maskType !== "none") {
      processedValue = applyMask(numericText, maskType);
    }

    // Limitar comprimento
    if (processedValue.length > effectiveMaxLength) {
      processedValue = processedValue.substring(0, effectiveMaxLength);
    }

    onChange?.(processedValue);
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const showPlaceholder = !isFocused && (!value || value.trim() === "");

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        className={`font-light tracking-wide text-base ${
          disabled
            ? "text-gray-400 dark:text-gray-600"
            : "text-black dark:text-gray-200"
        }`}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder=""
          maxLength={effectiveMaxLength}
          className={`
            w-full px-4 py-3 border rounded-lg text-left text-sm
            ${
              disabled
                ? "bg-gray-50 dark:bg-[#0f0f0f] border-gray-100 dark:border-[#1a1a1a] text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "bg-gray-100 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#2a2a2a] cursor-text"
            }
            ${
              disabled
                ? "text-gray-400 dark:text-gray-600"
                : "text-gray-400 dark:text-gray-500"
            }
            transition-all duration-200 min-h-[48px] flex items-center
            ${
              isFocused && !disabled
                ? "ring-2 ring-[#c8d300] border-transparent"
                : ""
            }
          `}
          style={{
            outline: "none",
          }}
        />

        {showPlaceholder && (
          <div className="absolute inset-0 px-4 py-3 flex items-center pointer-events-none">
            <span className="text-gray-400 dark:text-gray-500 text-sm">
              {effectivePlaceholder}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
