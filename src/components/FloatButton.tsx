"use client";

import {
  Plus,
  ChevronUp,
  Building2,
  FileText,
  User,
  Settings,
  CreditCard,
  Edit,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function FloatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const router = useRouter();

  const menuItems = [
    {
      label: "Cadastrar Empresa",
      icon: FileText,
      route: "/cadastro/empresa",
    },
    {
      label: "Criar Grupo de Empresas",
      icon: Building2,
      route: "/cadastro/grupo",
    },
    {
      label: "Criar Acesso",
      icon: User,
      route: "/cadastro/usuario",
    },
  ];

  const toolsMenuItems = [
    {
      label: "Dados de pagamento",
      icon: CreditCard,
      route: "/pagamento",
    },
    {
      label: "Editar ou Desativar",
      icon: Edit,
      route: "/ajustes",
    },
    {
      label: "Suporte",
      icon: HelpCircle,
      route: "/suporte",
    },
  ];

  const handleItemClick = (route: string) => {
    setIsOpen(false);
    setShowToolsMenu(false);
    router.push(route);
  };

  const handleToolsToggle = () => {
    setShowToolsMenu(!showToolsMenu);
  };

  return (
    <>
      {/* Overlay com desfoque quando ativo */}
      {isOpen && (
        <div
          className="float-button-overlay fixed inset-0 bg-black/20 backdrop-blur-sm z-[40] transition-all duration-300"
          onClick={() => {
            setIsOpen(false);
            setShowToolsMenu(false);
          }}
        />
      )}

      <div className="fixed bottom-4 right-4 z-[76]">
        {/* Menu Items */}
        <div
          className={`absolute bottom-16 right-0 space-y-2 transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {(showToolsMenu ? toolsMenuItems : menuItems).map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleItemClick(item.route)}
                className="flex shadow-lg font-light tracking-wide items-center gap-3 bg-white dark:bg-[#103239] text-gray-800 dark:text-[#c8d300] px-4 py-3 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 transform min-w-[240px] cursor-pointer"
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`float-button-main p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 cursor-pointer ${
            isOpen ? "bg-[#103239]" : "bg-[#103239] dark:bg-[#c8d300]"
          }`}
        >
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-[#c8d300]" />
          ) : (
            <Plus className="w-6 h-6 text-white dark:text-[#103239]" />
          )}
        </button>

        {/* Tools Button */}
        <button
          onClick={handleToolsToggle}
          className={`float-button-tools bg-[#103239] dark:bg-[#c8d300] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 cursor-pointer absolute bottom-0 right-16 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {showToolsMenu ? (
            <Plus className="w-6 h-6 text-white dark:text-[#103239]" />
          ) : (
            <Settings className="w-6 h-6 text-white dark:text-[#103239]" />
          )}
        </button>
      </div>
    </>
  );
}
