"use client";

import React, { useState, useCallback } from "react";
import Header from "@/components/Header";
import { Text } from "@/ui/forms/Text";
import { DataTable, Column } from "@/components/DataTable";
import { EmpresaEditPopup } from "@/components/EmpresaEditPopup";
import { Pencil, Search, Building2, Eye, EyeOff } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

interface BillingDetails {
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
  cnpjOrganizacional: string;
}

interface Empresa {
  nome: string;
  cnpj: string;
  grupo: string;
}

interface EmpresaPlano {
  nome: string;
  plano: string;
  tipoFaturamento: string;
}

export default function PagamentosPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Estados para o popup de edição
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);

  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    nome: "João Silva Santos",
    telefone: "(11) 99999-9999",
    email: "joao.silva@email.com",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP, 01234-567",
    cnpjOrganizacional: "12.345.678/0001-90",
  });

  // Dados mock das empresas com planos
  const empresasPlanoMock: EmpresaPlano[] = [
    {
      nome: "Tech Solutions Ltda",
      plano: "Básico",
      tipoFaturamento: "PIX",
    },
    {
      nome: "Digital Innovation S.A.",
      plano: "Completo",
      tipoFaturamento: "Boleto",
    },
    {
      nome: "Cloud Computing Corp",
      plano: "Premium",
      tipoFaturamento: "Cartão de Crédito",
    },
    {
      nome: "Data Analytics Brasil",
      plano: "Básico",
      tipoFaturamento: "PIX",
    },
    {
      nome: "Software Development Inc",
      plano: "Completo",
      tipoFaturamento: "Boleto",
    },
    {
      nome: "AI Technology Group",
      plano: "Premium",
      tipoFaturamento: "Cartão de Crédito",
    },
    {
      nome: "Mobile Apps Solutions",
      plano: "Básico",
      tipoFaturamento: "PIX",
    },
    {
      nome: "Web Development Pro",
      plano: "Completo",
      tipoFaturamento: "Boleto",
    },
    {
      nome: "Cybersecurity Experts",
      plano: "Premium",
      tipoFaturamento: "Cartão de Crédito",
    },
    {
      nome: "DevOps Consulting",
      plano: "Básico",
      tipoFaturamento: "PIX",
    },
    {
      nome: "Machine Learning Co",
      plano: "Completo",
      tipoFaturamento: "Boleto",
    },
    {
      nome: "Blockchain Solutions",
      plano: "Premium",
      tipoFaturamento: "Cartão de Crédito",
    },
  ];

  // Dados mock das empresas (mantido para compatibilidade)
  const empresasMock: Empresa[] = [
    {
      nome: "Tech Solutions Ltda",
      cnpj: "12.345.678/0001-90",
      grupo: "Grupo Tecnologia",
    },
    {
      nome: "Digital Innovation S.A.",
      cnpj: "23.456.789/0001-01",
      grupo: "Grupo Tecnologia",
    },
    {
      nome: "Cloud Computing Corp",
      cnpj: "34.567.890/0001-12",
      grupo: "Grupo Tecnologia",
    },
    {
      nome: "Data Analytics Brasil",
      cnpj: "45.678.901/0001-23",
      grupo: "Grupo Consultoria",
    },
    {
      nome: "Software Development Inc",
      cnpj: "56.789.012/0001-34",
      grupo: "Grupo Consultoria",
    },
    {
      nome: "AI Technology Group",
      cnpj: "67.890.123/0001-45",
      grupo: "Grupo Consultoria",
    },
    {
      nome: "Mobile Apps Solutions",
      cnpj: "78.901.234/0001-56",
      grupo: "Grupo Desenvolvimento",
    },
    {
      nome: "Web Development Pro",
      cnpj: "89.012.345/0001-67",
      grupo: "Grupo Desenvolvimento",
    },
    {
      nome: "Cybersecurity Experts",
      cnpj: "90.123.456/0001-78",
      grupo: "Grupo Desenvolvimento",
    },
    {
      nome: "DevOps Consulting",
      cnpj: "01.234.567/0001-89",
      grupo: "Grupo Inovação",
    },
    {
      nome: "Machine Learning Co",
      cnpj: "12.345.678/0001-90",
      grupo: "Grupo Inovação",
    },
    {
      nome: "Blockchain Solutions",
      cnpj: "23.456.789/0001-01",
      grupo: "Grupo Inovação",
    },
  ];

  // Estado para os dados da tabela
  const [empresasData, setEmpresasData] =
    useState<EmpresaPlano[]>(empresasPlanoMock);

  // Filtrar empresas baseado no termo de busca
  const empresasFiltradas = empresasMock.filter(
    (empresa) =>
      empresa.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.cnpj.includes(searchTerm)
  );

  // Função para atualizar dados da tabela
  const handleUpdateEmpresa = useCallback(
    (row: EmpresaPlano, field: keyof EmpresaPlano, value: string) => {
      setEmpresasData((prev) =>
        prev.map((empresa) =>
          empresa.nome === row.nome ? { ...empresa, [field]: value } : empresa
        )
      );
    },
    []
  );

  // Configuração das colunas da tabela
  const columns: Column<EmpresaPlano>[] = [
    {
      key: "nome",
      label: "Empresa",
      filterable: true,
    },
    {
      key: "plano",
      label: "Plano",
      editable: true,
      type: "select",
      options: [
        { value: "Básico", label: "Básico" },
        { value: "Completo", label: "Completo" },
        { value: "Premium", label: "Premium" },
      ],
    },
    {
      key: "tipoFaturamento",
      label: "Tipo de Faturamento",
      editable: true,
      type: "select",
      options: [
        { value: "PIX", label: "PIX" },
        { value: "Boleto", label: "Boleto" },
        { value: "Cartão de Crédito", label: "Cartão de Crédito" },
        { value: "Débito Automático", label: "Débito Automático" },
      ],
    },
  ];

  const handleBillingChange = (field: keyof BillingDetails, value: string) => {
    setBillingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleVisibilityToggle = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setIsEditing(false); // Reset editing when opening
    }
  };

  // Handlers para o popup de edição
  const handleOpenEditPopup = useCallback((empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setIsEditPopupOpen(true);
  }, []);

  const handleCloseEditPopup = useCallback(() => {
    setIsEditPopupOpen(false);
    setSelectedEmpresa(null);
  }, []);

  const handleSaveEdit = useCallback(
    (plano: string, tipoFaturamento: string) => {
      if (selectedEmpresa) {
        // Encontrar a empresa correspondente nos dados de plano
        const empresaPlano = empresasData.find(
          (emp) => emp.nome === selectedEmpresa.nome
        );
        if (empresaPlano) {
          // Atualizar ambos os campos
          handleUpdateEmpresa(empresaPlano, "plano", plano);
          handleUpdateEmpresa(empresaPlano, "tipoFaturamento", tipoFaturamento);
        }
      }
      handleCloseEditPopup();
    },
    [selectedEmpresa, empresasData, handleUpdateEmpresa, handleCloseEditPopup]
  );

  return (
    <div className="min-h-screen p-4">
      <Header />

      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Pagamentos" },
          ]}
        />
        {/* Card Billing Details */}
        <div className="bg-white dark:bg-[#0a0a0a] rounded-lg p-6 border  border-black/10 dark:border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              Dados de Cobrança
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleVisibilityToggle}
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors bg-white dark:hover:bg-[#1a1a1a] dark:bg-[#0a0a0a]  text-gray-700 dark:text-[#c8d300] hover:bg-gray-200 border border-black/10 dark:border-white/20"
              >
                {isVisible ? (
                  <>
                    <Eye className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {isVisible && (
            <div className="mt-4">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <Text
                      label="Nome Completo"
                      placeholder="Digite seu nome completo"
                      value={billingDetails.nome}
                      onChange={(value) => handleBillingChange("nome", value)}
                      className="text-gray-900 dark:text-white"
                    />
                    <Text
                      label="Telefone"
                      placeholder="(11) 99999-9999"
                      value={billingDetails.telefone}
                      onChange={(value) =>
                        handleBillingChange("telefone", value)
                      }
                      className="text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-4">
                    <Text
                      label="Endereço de Cobrança"
                      placeholder="Rua, número, bairro, cidade - UF, CEP"
                      value={billingDetails.endereco}
                      onChange={(value) =>
                        handleBillingChange("endereco", value)
                      }
                      className="text-gray-900 dark:text-white"
                    />
                    <Text
                      label="CNPJ Organizacional"
                      placeholder="00.000.000/0000-00"
                      value={billingDetails.cnpjOrganizacional}
                      onChange={(value) =>
                        handleBillingChange("cnpjOrganizacional", value)
                      }
                      className="text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex flex-col  ">
                      <span className="text-sm text-gray-600 dark:text-white ">
                        Nome:
                      </span>
                      <span className="text-gray-900 text-xs font-extralight tracking-wide dark:text-white">
                        {billingDetails.nome}
                      </span>
                    </div>
                    <div className="flex flex-col  ">
                      <span className="text-sm text-gray-600 dark:text-white ">
                        Telefone:
                      </span>
                      <span className="text-gray-900 text-xs font-extralight tracking-wide dark:text-white">
                        {billingDetails.telefone}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col  ">
                      <span className="text-sm text-gray-600 dark:text-white ">
                        Endereço:
                      </span>
                      <span className="text-gray-900 text-xs font-extralight tracking-wide dark:text-white">
                        {billingDetails.endereco}
                      </span>
                    </div>
                    <div className="flex flex-col  ">
                      <span className="text-sm text-gray-600 dark:text-white ">
                        CNPJ:
                      </span>
                      <span className="text-gray-900 text-xs font-extralight tracking-wide dark:text-white">
                        {billingDetails.cnpjOrganizacional}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleEditToggle}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isEditing
                      ? "bg-[#c8d300] dark:bg-[#c8d300] text-white dark:text-[#103239]"
                      : "bg-gray-100 dark:bg-[#0a0a0a] border border-black/10 dark:border-white/20 text-gray-700 dark:text-zinc-300 hover:bg-gray-200 dark:hover:bg-[#1a1a1a]"
                  }`}
                >
                  {isEditing ? "Salvar" : "Editar"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:block bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/20 rounded-lg p-6 ">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              Planos e Faturamento
            </h2>
          </div>

          <DataTable
            data={empresasData}
            columns={columns}
            onUpdate={handleUpdateEmpresa}
          />
        </div>

        {/* My List Section */}
        <div className="block md:hidden bg-white dark:bg-[#0a0a0a] rounded-lg p-6 border border-black/10 dark:border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl  font-semibold text-gray-900 dark:text-white">
              Planos e Faturamento
            </h2>
          </div>

          {/* Campo de Busca */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform text-xs -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Procurar empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-xs border border-black/10 dark:border-white/20 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white focus:ring-1 focus:ring-[#c8d300] focus:outline-none focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Lista de Empresas */}
          <div className="space-y-3">
            {empresasFiltradas.length > 0 ? (
              empresasFiltradas.map((empresa, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white dark:bg-[#0a0a0a] rounded-lg border border-black/10 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors duration-200"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-gray-900 dark:text-white">
                      {empresa.nome}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-[#999999]">
                      CNPJ: {empresa.cnpj}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditPopup(empresa)}
                      className="p-2 dark:bg-[#1a1a1a] text-[#103239] dark:text-[#c8d300] rounded-full cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-200"
                      title="Editar plano e faturamento"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-[#999999]">
                <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma empresa encontrada</p>
                <p className="text-sm">Tente ajustar os termos de busca</p>
              </div>
            )}
          </div>

          {/* Contador de resultados */}
          {searchTerm && (
            <div className="mt-4 text-sm text-gray-600 dark:text-[#999999]">
              {empresasFiltradas.length} empresa(s) encontrada(s)
            </div>
          )}
        </div>
      </div>

      {/* Popup de Edição */}
      {isEditPopupOpen && selectedEmpresa && (
        <EmpresaEditPopup
          isOpen={isEditPopupOpen}
          onClose={handleCloseEditPopup}
          onSave={handleSaveEdit}
          empresaNome={selectedEmpresa.nome}
          planoAtual={
            empresasData.find((emp) => emp.nome === selectedEmpresa.nome)
              ?.plano || ""
          }
          tipoFaturamentoAtual={
            empresasData.find((emp) => emp.nome === selectedEmpresa.nome)
              ?.tipoFaturamento || ""
          }
        />
      )}
    </div>
  );
}
