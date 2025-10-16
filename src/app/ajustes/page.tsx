import ThemeToggle from "../ThemeToggle";
import Logo from "@/components/Logo";
import { FloatButton } from "@/components/FloatButton";
import Blocos from "@/components/Blocos";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Building2, Users, User, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-4">
      <header className="w-full flex items-center justify-between pb-8 p-4">
       <Link href="/dashboard"><Logo width={150} height={150} /></Link>
        <ThemeToggle />
      </header>

      <FloatButton /> 
      <div className="max-w-7xl mx-auto p-4">
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {" "}
            <Blocos
              titulo="Empresa"
              href="/ajustes/editar/empresa"
              icone={Building2}
            />
            <Blocos titulo="Grupo" href="/ajustes/editar/grupo" icone={Users} />
            <Blocos
              titulo="Usuário"
              href="/ajustes/editar/usuario"
              icone={User}
            />{" "}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl hover:shadow-lg hover:shadow-gray-200/30 dark:hover:shadow-gray-800/20 transition-all duration-200 hover:scale-[1.02]">
              <Link href="/ajustes/desativar">
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="relative">
                    <Trash2 className="w-8 h-8 text-gray-600 dark:text-gray-400 mb-3" />
                  </div>
                  <h2 className="text-gray-700 dark:text-gray-300 font-medium text-base">
                    Desativar
                  </h2>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
