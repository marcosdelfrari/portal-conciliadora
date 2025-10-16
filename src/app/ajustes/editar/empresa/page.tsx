"use client";

import Logo from "@/components/Logo";
import React, { useState } from "react";
import ThemeToggle from "@/app/ThemeToggle";
import { FloatButton } from "@/components/FloatButton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Select } from "@/ui/forms/Select";
import { Text } from "@/ui/forms/Text";
import Sucesso from "@/components/Sucesso";

interface FormData {
  empresaId: string;
  novoNome: string;
}

export default function page() {
  const [formData, setFormData] = useState<FormData>({
    empresaId: "",
    novoNome: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [dadosGrupo, setDadosGrupo] = useState<FormData | null>(null);

  // Lista mockada de empresas para seleção (substituir por dados reais quando houver API)
  const empresasOptions = [
    { value: "", label: "Selecione a empresa" },
    { value: "1", label: "Empresa Alpha" },
    { value: "2", label: "Empresa Beta" },
    { value: "3", label: "Empresa Gama" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.empresaId || !formData.novoNome.trim()) {
      alert("Selecione a empresa e informe o novo nome.");
      return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados
    console.log("Dados do formulário:", formData);

    // Salvar os dados e mostrar tela de sucesso
    setDadosGrupo({ ...formData });
    setShowSuccess(true);

    // Limpar formulário após sucesso
    setFormData({
      empresaId: "",
      novoNome: "",
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Verificar se todos os campos obrigatórios estão preenchidos
  const isFormComplete = () => {
    return formData.empresaId !== "" && formData.novoNome.trim() !== "";
  };

  // Função para reiniciar edição
  const handleCadastrarNovoGrupo = () => {
    setShowSuccess(false);
    setDadosGrupo(null);
    setFormData({
      empresaId: "",
      novoNome: "",
    });
  };

  // Se o envio foi realizado com sucesso, mostrar o componente Sucesso
  if (showSuccess && dadosGrupo) {
    return (
      <Sucesso
        titulo="Empresa atualizada!"
        subtitulo="Os dados foram salvos com sucesso"
        descricao={`A empresa selecionada foi renomeada para \"${dadosGrupo.novoNome}\".`}
        textoBotaoPrincipal="Voltar ao Dashboard"
        linkBotaoPrincipal="/dashboard"
        textoBotaoSecundario="Editar outra empresa"
        onClickBotaoSecundario={handleCadastrarNovoGrupo}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col p-4">
      <header className="w-full flex items-center justify-between pb-8 p-4">
        <Logo width={150} height={150} />
        <ThemeToggle />
      </header>

      <FloatButton />

      <div className="w-full px-4 max-w-md mx-auto">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Ajustes", href: "/ajustes" },
            { label: "Editar Empresa" },
          ]}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Empresa"
            options={empresasOptions}
            value={formData.empresaId}
            onChange={(value) => handleInputChange("empresaId", value)}
            required
          />

          {formData.empresaId && (
            <Text
              label="Novo nome da empresa"
              placeholder="Digite o novo nome"
              value={formData.novoNome}
              onChange={(value) => handleInputChange("novoNome", value)}
              required
            />
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isFormComplete()}
              className={`font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#c8d300] focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
                isFormComplete()
                  ? "bg-[#103239] hover:bg-[#c8d300] dark:bg-[#c8d300] dark:hover:bg-[#c8d300] text-white dark:text-[#103239]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 opacity-50"
              }`}
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
