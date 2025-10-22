"use client";

import React, { useState } from "react";
import { FloatButton } from "@/components/FloatButton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Select } from "@/ui/forms/SelectCustom";
import { Text } from "@/ui/forms/Text";
import { NumericInput } from "@/ui/forms/NumericInput";
import Sucesso from "@/components/Sucesso";
import Header from "@/components/Header";

interface FormData {
  grupo: string;
  nome: string;
  cnpj: string;
  plano: string;
  tipoFaturamento: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    grupo: "",
    nome: "",
    cnpj: "",
    plano: "",
    tipoFaturamento: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [dadosEmpresa, setDadosEmpresa] = useState<FormData | null>(null);

  const grupoOptions = [
    { value: "grupo1", label: "Grupo 1" },
    { value: "grupo2", label: "Grupo 2" },
    { value: "grupo3", label: "Grupo 3" },
    { value: "grupo4", label: "Grupo 4" },
    { value: "grupo5", label: "Grupo 5" },
    { value: "grupo6", label: "Grupo 6" },
    { value: "grupo7", label: "Grupo 7" },
    { value: "grupo8", label: "Grupo 8" },
    { value: "grupo9", label: "Grupo 9" },
    { value: "grupo10", label: "Grupo 10" },
  ];

  const planoOptions = [
    { value: "basico", label: "Básico" },
    { value: "completo", label: "Completo" },
    { value: "premium", label: "Premium" },
  ];

  const tipoFaturamentoOptions = [
    { value: "pix", label: "PIX" },
    { value: "boleto", label: "Boleto" },
    { value: "cartao_credito", label: "Cartão de Crédito" },
    { value: "cartao_debito", label: "Cartão de Débito" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (
      !formData.grupo ||
      !formData.nome ||
      !formData.cnpj ||
      !formData.plano ||
      !formData.tipoFaturamento
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados
    console.log("Dados do formulário:", formData);

    // Salvar os dados da empresa e mostrar tela de sucesso
    setDadosEmpresa({ ...formData });
    setShowSuccess(true);

    // Limpar formulário após sucesso
    setFormData({
      grupo: "",
      nome: "",
      cnpj: "",
      plano: "",
      tipoFaturamento: "",
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
    const fieldOrder: (keyof FormData)[] = [
      "grupo",
      "nome",
      "cnpj",
      "plano",
      "tipoFaturamento",
    ];
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
      formData.grupo.trim() !== "" &&
      formData.nome.trim() !== "" &&
      formData.cnpj.trim() !== "" &&
      formData.plano.trim() !== "" &&
      formData.tipoFaturamento.trim() !== ""
    );
  };

  // Função para cadastrar nova empresa
  const handleCadastrarNovaEmpresa = () => {
    setShowSuccess(false);
    setDadosEmpresa(null);
    setFormData({
      grupo: "",
      nome: "",
      cnpj: "",
      plano: "",
      tipoFaturamento: "",
    });
  };

  // Se o cadastro foi realizado com sucesso, mostrar o componente Sucesso
  if (showSuccess && dadosEmpresa) {
    return (
      <Sucesso
        titulo="Empresa Cadastrada!"
        subtitulo="A empresa foi cadastrada com sucesso"
        descricao={`A empresa ${dadosEmpresa.nome} foi cadastrada no grupo ${dadosEmpresa.grupo} com CNPJ ${dadosEmpresa.cnpj}, plano ${dadosEmpresa.plano} e tipo de faturamento ${dadosEmpresa.tipoFaturamento}.`}
        textoBotaoPrincipal="Voltar ao Dashboard"
        linkBotaoPrincipal="/dashboard"
        textoBotaoSecundario="Cadastrar nova empresa"
        onClickBotaoSecundario={handleCadastrarNovaEmpresa}
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
            { label: "Cadastro de Empresa" },
          ]}  
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {isFieldVisible("grupo") && (
            <Select
              label="Grupo"
              options={grupoOptions}
              value={formData.grupo}
              onChange={(value) => handleInputChange("grupo", value)}
              placeholder="Selecione o grupo"
              required
            />
          )}

          {isFieldVisible("nome") && (
            <Text
              label="Nome"
              placeholder="Digite o nome da empresa"
              value={formData.nome}
              onChange={(value) => handleInputChange("nome", value)}
              required
            />
          )}

          {isFieldVisible("cnpj") && (
            <NumericInput
              label="CNPJ"
              placeholder="Digite o CNPJ"
              value={formData.cnpj}
              onChange={(value) => handleInputChange("cnpj", value)}
              maskType="cnpj"
              required
            />
          )}

          {isFieldVisible("plano") && (
            <Select
              label="Plano"
              options={planoOptions}
              value={formData.plano}
              onChange={(value) => handleInputChange("plano", value)}
              placeholder="Selecione o plano"
              required
            />
          )}

          {isFieldVisible("tipoFaturamento") && (
            <Select
              label="Tipo de Faturamento"
              options={tipoFaturamentoOptions}
              value={formData.tipoFaturamento}
              onChange={(value) => handleInputChange("tipoFaturamento", value)}
              placeholder="Selecione o tipo de faturamento"
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
              Cadastrar Empresa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
