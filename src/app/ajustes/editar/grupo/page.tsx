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
  grupoId: string;
  novoNome: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    grupoId: "",
    novoNome: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [dadosGrupo, setDadosGrupo] = useState<FormData | null>(null);

  // Lista mockada de grupos para seleção (substituir por dados reais quando houver API)
  const gruposOptions = [
    { value: "", label: "Selecione a grupo" },
    { value: "1", label: "grupo Alpha" },
    { value: "2", label: "grupo Beta" },
    { value: "3", label: "grupo Gama" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.grupoId || !formData.novoNome.trim()) {
      alert("Selecione a grupo e informe o novo nome.");
      return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados
    console.log("Dados do formulário:", formData);

    // Salvar os dados e mostrar tela de sucesso
    setDadosGrupo({ ...formData });
    setShowSuccess(true);

    // Limpar formulário após sucesso
    setFormData({
      grupoId: "",
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
    return formData.grupoId !== "" && formData.novoNome.trim() !== "";
  };

  // Função para reiniciar edição
  const handleCadastrarNovoGrupo = () => {
    setShowSuccess(false);
    setDadosGrupo(null);
    setFormData({
      grupoId: "",
      novoNome: "",
    });
  };

  // Se o envio foi realizado com sucesso, mostrar o componente Sucesso
  if (showSuccess && dadosGrupo) {
    return (
      <Sucesso
        titulo="grupo atualizada!"
        subtitulo="Os dados foram salvos com sucesso"
        descricao={`A grupo selecionada foi renomeada para \"${dadosGrupo.novoNome}\".`}
        textoBotaoPrincipal="Voltar ao Dashboard"
        linkBotaoPrincipal="/dashboard"
        textoBotaoSecundario="Editar outra grupo"
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
            { label: "Editar Grupo" },
          ]}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Grupo"
            options={gruposOptions}
            value={formData.grupoId}
            onChange={(value) => handleInputChange("grupoId", value)}
            required
          />

          {formData.grupoId && (
            <Text
              label="Novo nome da grupo"
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
