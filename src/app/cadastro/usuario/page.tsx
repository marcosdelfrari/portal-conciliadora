"use client";

import React, { useState } from "react";
import { FloatButton } from "@/components/FloatButton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Select } from "@/ui/forms/SelectCustom";
import { Text } from "@/ui/forms/Text";
import Sucesso from "@/components/Sucesso";
import Header from "@/components/Header";

interface FormData {
  nome: string;
  email: string;
  tipo: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    tipo: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [dadosUsuario, setDadosUsuario] = useState<FormData | null>(null);

  const tipoOptions = [
    { value: "proprietario", label: "Proprietário" },
    { value: "administrador", label: "Administrador" },
    { value: "operador", label: "Operador" },
    { value: "visualizador", label: "Visualizador" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nome || !formData.email || !formData.tipo) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados
    console.log("Dados do formulário:", formData);

    // Salvar os dados do usuário e mostrar tela de sucesso
    setDadosUsuario({ ...formData });
    setShowSuccess(true);

    // Limpar formulário após sucesso
    setFormData({
      nome: "",
      email: "",
      tipo: "",
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
    const fieldOrder: (keyof FormData)[] = ["nome", "email", "tipo"];
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
    return (
      formData.nome.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.tipo.trim() !== ""
    );
  };

  // Função para cadastrar novo usuário
  const handleCadastrarNovoUsuario = () => {
    setShowSuccess(false);
    setDadosUsuario(null);
    setFormData({
      nome: "",
      email: "",
      tipo: "",
    });
  };

  // Se o cadastro foi realizado com sucesso, mostrar o componente Sucesso
  if (showSuccess && dadosUsuario) {
    return (
      <Sucesso
        titulo="Usuário Cadastrado!"
        subtitulo="O usuário foi cadastrado com sucesso"
        descricao={`O usuário ${dadosUsuario.nome} foi cadastrado com e-mail ${dadosUsuario.email} como ${dadosUsuario.tipo}.`}
        textoBotaoPrincipal="Voltar ao Dashboard"
        linkBotaoPrincipal="/dashboard"
        textoBotaoSecundario="Cadastrar novo usuário"
        onClickBotaoSecundario={handleCadastrarNovoUsuario}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col p-4">
      <Header />

      <FloatButton />

      <div className="w-full px-4 max-w-md mx-auto">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Cadastro de Usuário" },
          ]}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {isFieldVisible("nome") && (
            <Text
              label="Nome"
              placeholder="Digite o nome do usuário"
              value={formData.nome}
              onChange={(value) => handleInputChange("nome", value)}
              required
            />
          )}

          {isFieldVisible("email") && (
            <Text
              label="E-mail"
              placeholder="Digite o e-mail do usuário"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              type="email"
              required
            />
          )}

          {isFieldVisible("tipo") && (
            <Select
              label="Tipo"
              options={tipoOptions}
              value={formData.tipo}
              onChange={(value) => handleInputChange("tipo", value)}
              placeholder="Selecione o tipo de usuário"
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
              Criar acesso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
