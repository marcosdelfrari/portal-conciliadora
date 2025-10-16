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
  usuarioId: string;
  novoNome: string;
  nivelAcesso: string;
}

export default function page() {
  const [formData, setFormData] = useState<FormData>({
    usuarioId: "",
    novoNome: "",
    nivelAcesso: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [dadosGrupo, setDadosGrupo] = useState<FormData | null>(null);

  // Lista mockada de usuarios para seleção (substituir por dados reais quando houver API)
  const usuariosOptions = [
    { value: "", label: "Selecione a usuario" },
    { value: "1", label: "usuario Alpha" },
    { value: "2", label: "usuario Beta" },
    { value: "3", label: "usuario Gama" },
  ];

  // Opções de nível de acesso
  const nivelAcessoOptions = [
    { value: "", label: "Selecione o nível de acesso" },
    { value: "admin", label: "Administrador" },
    { value: "gerente", label: "Gerente" },
    { value: "operador", label: "Operador" },
    { value: "visualizador", label: "Visualizador" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (
      !formData.usuarioId ||
      !formData.novoNome.trim() ||
      !formData.nivelAcesso
    ) {
      alert("Selecione a usuario, informe o novo nome e o nível de acesso.");
      return;
    }

    // Aqui você pode adicionar a lógica para enviar os dados
    console.log("Dados do formulário:", formData);

    // Salvar os dados e mostrar tela de sucesso
    setDadosGrupo({ ...formData });
    setShowSuccess(true);

    // Limpar formulário após sucesso
    setFormData({
      usuarioId: "",
      novoNome: "",
      nivelAcesso: "",
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
    return (
      formData.usuarioId !== "" &&
      formData.novoNome.trim() !== "" &&
      formData.nivelAcesso !== ""
    );
  };

  // Função para reiniciar edição
  const handleCadastrarNovoGrupo = () => {
    setShowSuccess(false);
    setDadosGrupo(null);
    setFormData({
      usuarioId: "",
      novoNome: "",
      nivelAcesso: "",
    });
  };

  // Se o envio foi realizado com sucesso, mostrar o componente Sucesso
  if (showSuccess && dadosGrupo) {
    return (
      <Sucesso
        titulo="Usuário atualizado!"
        subtitulo="Os dados foram salvos com sucesso"
        descricao={`O usuário selecionado foi renomeado para \"${dadosGrupo.novoNome}\" com nível de acesso \"${dadosGrupo.nivelAcesso}\".`}
        textoBotaoPrincipal="Voltar ao Dashboard"
        linkBotaoPrincipal="/dashboard"
        textoBotaoSecundario="Editar outro usuário"
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
            { label: "Editar Usuário" },
          ]}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <Select
            label="Usuário"
            options={usuariosOptions}
            value={formData.usuarioId}
            onChange={(value) => handleInputChange("usuarioId", value)}
            required
          />

          {formData.usuarioId && (
            <>
              <Text
                label="Novo nome do usuário"
                placeholder="Digite o novo nome"
                value={formData.novoNome}
                onChange={(value) => handleInputChange("novoNome", value)}
                required
              />

              <Select
                label="Nível de acesso"
                options={nivelAcessoOptions}
                value={formData.nivelAcesso}
                onChange={(value) => handleInputChange("nivelAcesso", value)}
                required
              />
            </>
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
