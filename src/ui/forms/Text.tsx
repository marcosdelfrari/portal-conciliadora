import React, { useState, useRef, useEffect } from "react";

interface TextInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "password";
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Text: React.FC<TextInputProps> = ({
  label,
  placeholder = "Placeholder",
  value = "",
  onChange,
  type = "text",
  required = false,
  disabled = false,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  // Atualizar o conteúdo do div quando o valor externo mudar
  useEffect(() => {
    if (inputRef.current && value !== inputRef.current.innerText) {
      inputRef.current.innerText = value;
    }
  }, [value]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (disabled) return;

    const newValue = e.currentTarget.innerText || "";
    onChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    // Prevenir quebra de linha
    if (e.key === "Enter") {
      e.preventDefault();
    }

    // Para campos de email, validar formato básico
    if (type === "email" && e.key === " ") {
      e.preventDefault();
    }
  };

  const handleFocus = () => {
    if (!disabled) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
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

      <div
        ref={inputRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        className={`
          w-full px-4 py-3 border rounded-lg text-left text-sm
          ${
            disabled
              ? "bg-gray-50 dark:bg-[#0f0f0f] border border-black/10 dark:border-white/20 text-gray-400 dark:text-white cursor-not-allowed"
              : "bg-gray-100 dark:bg-[#1a1a1a] border border-black/10 dark:border-white/20 cursor-text"
          }
          ${
            disabled
              ? "text-gray-400 dark:text-gray-600"
              : "text-gray-400 dark:text-white"
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
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
        data-placeholder={showPlaceholder ? placeholder : ""}
      />
    </div>
  );
};
