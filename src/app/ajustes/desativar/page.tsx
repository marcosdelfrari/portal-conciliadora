"use client";

import React, { useState } from "react";
import { FloatButton } from "@/components/FloatButton";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Select } from "@/ui/forms/SelectCustom";
import Sucesso from "@/components/Sucesso";
import Header from "@/components/Header";

interface FormData {
  tipoId: string;
  empresaId: string;
  usuarioId: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    tipoId: "",
    empresaId: "",
    usuarioId: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [dadosGrupo, setDadosGrupo] = useState<FormData | null>(null);

  // Lista mockada de tipo para seleção (substituir por dados reais quando houver API)
  const tipoOptions = [
    { value: "1", label: "Empresa" },
    { value: "2", label: "Usuário" },
  ];

  // Lista mockada de empresas (substituir por dados reais quando houver API)
  const empresaOptions = [
    { value: "1", label: "Empresa ABC Ltda" },
    { value: "2", label: "Tech Solutions S.A." },
    { value: "3", label: "Inovação Digital Corp" },
    { value: "4", label: "Sistemas Integrados Ltda" },
  ];

  // Lista mockada de usuários (substituir por dados reais quando houver API)
  const usuarioOptions = [
    { value: "1", label: "João Silva" },
    { value: "2", label: "Maria Santos" },
    { value: "3", label: "Pedro Oliveira" },
    { value: "4", label: "Ana Costa" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.tipoId) {
      alert("Selecione o tipo.");
      return;
    }

    // Validação específica baseada no tipo selecionado
    if (formData.tipoId === "1" && !formData.empresaId) {
      alert("Selecione uma empresa.");
      return;
    }

    if (formData.tipoId === "2" && !formData.usuarioId) {
      alert("Selecione um usuário.");
      return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados
    console.log("Dados do formulário:", formData);

    // Salvar os dados e mostrar tela de sucesso
    setDadosGrupo({ ...formData });
    setShowSuccess(true);

    // Limpar formulário após sucesso
    setFormData({
      tipoId: "",
      empresaId: "",
      usuarioId: "",
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
    if (formData.tipoId === "1") {
      return formData.empresaId !== "";
    }

    if (formData.tipoId === "2") {
      return formData.usuarioId !== "";
    }

    return false;
  };

  // Função para reiniciar edição
  const handleCadastrarNovoGrupo = () => {
    setShowSuccess(false);
    setDadosGrupo(null);
    setFormData({
      tipoId: "",
      empresaId: "",
      usuarioId: "",
    });
  };

  // Se o envio foi realizado com sucesso, mostrar o componente Sucesso
  if (showSuccess && dadosGrupo) {
    return (
      <Sucesso
        titulo="Concluído!"
        subtitulo="Sua solicitação foi enviada com sucesso."
        descricao={``}
        textoBotaoPrincipal="Voltar ao Dashboard"
        linkBotaoPrincipal="/dashboard"
        textoBotaoSecundario="Editar outra tipo"
        onClickBotaoSecundario={handleCadastrarNovoGrupo}
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
            { label: "Ajustes", href: "/ajustes" },
            { label: "Desativar" },
          ]}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Tipo"
            options={tipoOptions}
            value={formData.tipoId}
            onChange={(value) => handleInputChange("tipoId", value)}
            required
          />

          {formData.tipoId === "1" && (
            <Select
              label="Empresa"
              options={empresaOptions}
              value={formData.empresaId}
              onChange={(value) => handleInputChange("empresaId", value)}
              required
            />
          )}

          {formData.tipoId === "2" && (
            <Select
              label="Usuário"
              options={usuarioOptions}
              value={formData.usuarioId}
              onChange={(value) => handleInputChange("usuarioId", value)}
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
                  : "bg-[#0a0a0a] border border-black/10 dark:border-white/20 text-gray-400 cursor-not-allowed dark:text-[#999999] opacity-50"
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
