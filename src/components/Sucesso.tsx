"use client";

import React from "react";
import Header from "./Header";
import { Check, CheckCircleIcon } from "lucide-react";

interface SucessoProps {
  // Configurações básicas
  titulo?: string;
  subtitulo?: string;
  descricao?: string;

  // Configurações do ícone
  icone?: React.ReactNode;
  corIcone?: "green" | "blue" | "purple" | "orange";

  // Configurações do botão principal
  textoBotaoPrincipal?: string;
  linkBotaoPrincipal?: string;

  // Configurações do botão secundário
  textoBotaoSecundario?: string;
  linkBotaoSecundario?: string;
  onClickBotaoSecundario?: () => void;
}

export default function Sucesso({
  titulo = "Título",
  subtitulo = "Legenda",
  descricao = "Descrição",
  textoBotaoPrincipal = "Inicie sua jornada",
  linkBotaoPrincipal = "/",
  textoBotaoSecundario,
  linkBotaoSecundario,
  onClickBotaoSecundario,
}: SucessoProps) {
  const iconePadrao = <Check className="w-20 h-20" />;

  return (
    <div className="bg-white dark:bg-[#0a0a0a] flex flex-col p-4 min-h-screen">
      <Header />

      <div className="w-full max-w-md mx-auto px-4">
        {/* Ícone de sucesso */}
        <div className="text-center mb-8">
          <div
            className={`w-40 h-40 mx-auto mb-4 rounded-lg flex items-center justify-center `}
          >
            {iconePadrao}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {titulo}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{subtitulo}</p>
          <p className="text-gray-600 dark:text-gray-300 text-left">
            {descricao}
          </p>

          {/* Botões */}
          <div className="flex flex-col gap-3 mt-6">
            {/* Botão principal */}
            {textoBotaoPrincipal && linkBotaoPrincipal && (
              <button
                onClick={() => (window.location.href = linkBotaoPrincipal)}
                className="border border-[#1a1a1a] text-[#1a1a1a] dark:text-[#c8d300] dark:border-[#c8d300] px-4 py-2 rounded-lg transition-colors duration-200"
              >
                {textoBotaoPrincipal}
              </button>
            )}

            {/* Botão secundário */}
            {textoBotaoSecundario &&
              (linkBotaoSecundario || onClickBotaoSecundario) && (
                <button
                  onClick={() => {
                    if (onClickBotaoSecundario) {
                      onClickBotaoSecundario();
                    } else if (linkBotaoSecundario) {
                      window.location.href = linkBotaoSecundario;
                    }
                  }}
                  className="bg-[#1a1a1a] hover:bg-[#c8d300] dark:bg-[#c8d300] dark:hover:bg-[#c8d300] text-white dark:text-[#1a1a1a] px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  {textoBotaoSecundario}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
