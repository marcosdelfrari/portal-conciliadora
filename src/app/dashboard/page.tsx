import ThemeToggle from "../ThemeToggle";
import Logo from "@/components/Logo";
import { Lista } from "@/components/Lista";
import { FloatButton } from "@/components/FloatButton";

export default function DashboardPage() {
  // Dados mock estruturados por grupos
  const dadosMock = [
    {
      nome: "Grupo Tecnologia",
      empresas: [
        { nome: "Tech Solutions Ltda", cnpj: "12.345.678/0001-90" },
        { nome: "Digital Innovation S.A.", cnpj: "23.456.789/0001-01" },
        { nome: "Cloud Computing Corp", cnpj: "34.567.890/0001-12" },
      ],
    },
    {
      nome: "Grupo Consultoria",
      empresas: [
        { nome: "Data Analytics Brasil", cnpj: "45.678.901/0001-23" },
        { nome: "Software Development Inc", cnpj: "56.789.012/0001-34" },
        { nome: "AI Technology Group", cnpj: "67.890.123/0001-45" },
      ],
    },
    {
      nome: "Grupo Desenvolvimento",
      empresas: [
        { nome: "Mobile Apps Solutions", cnpj: "78.901.234/0001-56" },
        { nome: "Web Development Pro", cnpj: "89.012.345/0001-67" },
        { nome: "Cybersecurity Experts", cnpj: "90.123.456/0001-78" },
      ],
    },
    {
      nome: "Grupo Inovação",
      empresas: [
        { nome: "DevOps Consulting", cnpj: "01.234.567/0001-89" },
        { nome: "Machine Learning Co", cnpj: "12.345.678/0001-90" },
        { nome: "Blockchain Solutions", cnpj: "23.456.789/0001-01" },
      ],
    },
  ];

  // Criando as listas usando os dados mock estruturados
  const listas = [];

  // Usando um loop for para gerar as listas
  for (let i = 0; i < dadosMock.length; i++) {
    const grupo = dadosMock[i];

    listas.push({
      titulo: grupo.nome,
      itens: grupo.empresas,
    });
  }

  return (
    <div className="min-h-screen p-4">
      <header className="w-full flex items-center justify-between pb-8 p-4">
        <Logo width={150} height={150} />
        <ThemeToggle />
      </header>
      <FloatButton />
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listas.map((lista, index) => (
            <Lista key={index} titulo={lista.titulo} itens={lista.itens} />
          ))}
        </div>
      </div>
    </div>
  );
}
