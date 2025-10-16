"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Text } from "@/ui/forms/Text";
import { Select } from "@/ui/forms/Select";
import { NumericInput } from "@/ui/forms/NumericInput";
import ThemeToggle from "../ThemeToggle";
import Logo from "@/components/Logo";
import { CadastroService } from "@/services/cadastroService";
import { CadastroRequest } from "@/types/api";
import Sucesso from "@/components/Sucesso";

interface FormData {
  nome: string;
  email: string;
  cnpj: string;
  nomeOrganizacao: string;
  plano: string;
}

const planosOptions = [
  { value: "basico", label: "Básico" },
  { value: "complemento", label: "Complemento" },
  { value: "premium", label: "Premium" },
];

function CadastroForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    cnpj: "",
    nomeOrganizacao: "",
    plano: "basico",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dadosCadastro, setDadosCadastro] = useState<FormData | null>(null);

  // Detectar parâmetro de plano da URL
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam) {
      // Verificar se o plano é válido
      const validPlans = planosOptions.map((option) => option.value);
      if (validPlans.includes(planParam)) {
        setFormData((prev) => ({
          ...prev,
          plano: planParam,
        }));
      }
    }
  }, [searchParams]);

  // Verificar se um campo está visível baseado no preenchimento do anterior
  const isFieldVisible = (fieldName: keyof FormData) => {
    const fieldOrder: (keyof FormData)[] = [
      "nome",
      "email",
      "cnpj",
      "nomeOrganizacao",
      "plano",
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
      formData.nome.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.cnpj.trim() !== "" &&
      formData.nomeOrganizacao.trim() !== "" &&
      formData.plano.trim() !== ""
    );
  };

  const handleInputChange = (field: keyof FormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete()) {
      setMessage({
        type: "error",
        text: "Por favor, preencha todos os campos obrigatórios.",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const dadosParaEnvio: CadastroRequest = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        cnpj: formData.cnpj.trim(),
        nomeOrganizacao: formData.nomeOrganizacao.trim(),
        plano: formData.plano.trim(),
      };

      const response = await CadastroService.enviarCadastro(dadosParaEnvio);

      if (response.success) {
        // Salvar os dados do cadastro e mostrar tela de sucesso
        setDadosCadastro({ ...formData });
        setShowSuccess(true);

        // Limpar o formulário após sucesso
        setFormData({
          nome: "",
          email: "",
          cnpj: "",
          nomeOrganizacao: "",
          plano: "basico",
        });
      } else {
        setMessage({
          type: "error",
          text:
            response.message || "Erro ao processar cadastro. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro no handleSubmit:", error);
      setMessage({
        type: "error",
        text: "Erro inesperado. Verifique sua conexão e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Se o cadastro foi realizado com sucesso, mostrar o componente Sucesso
  if (showSuccess && dadosCadastro) {
    return (
      <Sucesso
        titulo="Cadastro Realizado!"
        subtitulo="Seus dados foram cadastrados com sucesso"
        descricao=""
        textoBotaoPrincipal="Iniciar Jornada"
        linkBotaoPrincipal="/dashboard"
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col p-4">
      <header className="w-full flex items-center justify-between pb-8 p-4">
        <Logo width={150} height={150} />
        <ThemeToggle />
      </header>
      <div className="w-full px-4">
        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isFieldVisible("nome") && (
            <Text
              label="Insira seu nome "
              placeholder="Seu nome"
              value={formData.nome}
              onChange={handleInputChange("nome")}
              required
            />
          )}

          {isFieldVisible("email") && (
            <Text
              label="E-mail"
              placeholder="Email corporativo"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              required
            />
          )}

          {isFieldVisible("cnpj") && (
            <NumericInput
              label="CNPJ"
              placeholder="CNPJ de cobrança"
              value={formData.cnpj}
              onChange={handleInputChange("cnpj")}
              maskType="cnpj"
              required
            />
          )}

          {isFieldVisible("nomeOrganizacao") && (
            <Text
              label="Nome da Organização"
              placeholder="Nome da organização"
              value={formData.nomeOrganizacao}
              onChange={handleInputChange("nomeOrganizacao")}
              required
            />
          )}

          {isFieldVisible("plano") && (
            <Select
              label="Plano"
              options={planosOptions}
              value={formData.plano}
              onChange={handleInputChange("plano")}
              required
            />
          )}

          {/* Mensagens de feedback */}
          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Botão Continuar */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={!isFormComplete() || isLoading}
              className={`font-medium px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#c8d300] focus:ring-offset-2 ${
                isFormComplete() && !isLoading
                  ? "bg-[#103239] hover:bg-[#c8d300] dark:bg-[#c8d300] dark:hover:bg-[#c8d300] text-white dark:text-[#103239]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 opacity-50"
              }`}
            >
              {isLoading ? "Enviando..." : "Continuar"}
            </button>
          </div>
        </form>{" "}
      </div>
    </div>
  );
}

export default function CadastroPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <CadastroForm />
    </Suspense>
  );
}
