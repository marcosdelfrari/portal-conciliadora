// Exemplo de teste do serviço de cadastro
// Este arquivo pode ser executado no console do navegador para testar o serviço

import { CadastroService } from "./cadastroService";

// Dados de teste
const dadosTeste = {
  nome: "João Silva",
  email: "joao@exemplo.com",
  cnpj: "12.345.678/0001-90",
  nomeOrganizacao: "Empresa Teste LTDA",
  plano: "premium",
};

// Função para testar o serviço
export const testarServicoCadastro = async () => {
  console.log("🧪 Iniciando teste do serviço de cadastro...");

  try {
    // Teste de conectividade
    console.log("📡 Testando conectividade...");
    const conectividade = await CadastroService.testarConectividade();
    console.log("Conectividade:", conectividade ? "✅ OK" : "❌ FALHOU");

    // Teste de envio de dados
    console.log("📤 Enviando dados de teste...");
    const response = await CadastroService.enviarCadastro(dadosTeste);

    if (response.success) {
      console.log("✅ Sucesso!", response.message);
      console.log("📊 Dados retornados:", response.data);
    } else {
      console.log("❌ Erro:", response.message);
    }
  } catch (error) {
    console.error("💥 Erro no teste:", error);
  }
};

// Executar teste automaticamente se estiver no ambiente de desenvolvimento
if (process.env.NODE_ENV === "development") {
  console.log("🚀 Ambiente de desenvolvimento detectado");
  console.log("💡 Execute testarServicoCadastro() para testar o serviço");
}
