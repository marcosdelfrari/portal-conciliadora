"use client";

import Logo from "@/components/Logo";
import React, { useState } from "react";
import ThemeToggle from "@/app/ThemeToggle";
import { FloatButton } from "@/components/FloatButton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Text } from "@/ui/forms/Text";
import Sucesso from "@/components/Sucesso";

interface FormData {
  nome: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [dadosGrupo, setDadosGrupo] = useState<FormData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nome) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados
    console.log("Dados do formulário:", formData);

    // Salvar os dados do grupo e mostrar tela de sucesso
    setDadosGrupo({ ...formData });
    setShowSuccess(true);

    // Limpar formulário após sucesso
    setFormData({
      nome: "",
    });
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Verificar se um campo está visível baseado no preenchimento do anterior
  const isFieldVisible = (fieldName: keyof FormData) => {
    const fieldOrder: (keyof FormData)[] = ["nome"];
    const currentIndex = fieldOrder.indexOf(fieldName);

    // O primeiro campo sempre está visível
    if (currentIndex === 0) return true;

    // Verificar se o campo anterior está preenchido
    const previousField = fieldOrder[currentIndex - 1];
    const previousValue = formData[previousField];
    return previousValue && previousValue.trim() !== "";
  };

  // Verificar se todos os campos obrigatórios estão preenchidos
  const isFormComplete = () => {
    return formData.nome.trim() !== "";
  };

  // Função para cadastrar novo grupo
  const handleCadastrarNovoGrupo = () => {
    setShowSuccess(false);
    setDadosGrupo(null);
    setFormData({
      nome: "",
    });
  };

  // Se o cadastro foi realizado com sucesso, mostrar o componente Sucesso
  if (showSuccess && dadosGrupo) {
    return (
      <Sucesso
        titulo="Grupo Cadastrado!"
        subtitulo="O grupo foi cadastrado com sucesso"
        descricao={`O grupo ${dadosGrupo.nome} foi cadastrado com sucesso.`}
        textoBotaoPrincipal="Voltar ao Dashboard"
        linkBotaoPrincipal="/dashboard"
        textoBotaoSecundario="Cadastrar novo grupo"
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
            { label: "Cadastro de Grupo" },
          ]}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {isFieldVisible("nome") && (
            <Text
              label="Nome do Grupo"
              placeholder="Digite o nome do grupo"
              value={formData.nome}
              onChange={(value) => handleInputChange("nome", value)}
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
              Cadastrar Grupo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
