import { CadastroRequest, CadastroResponse, ApiError } from "@/types/api";
import { getApiUrl, API_CONFIG } from "@/config/api";

/**
 * Serviço para gerenciar operações de cadastro
 */
export class CadastroService {
  /**
   * Envia os dados do formulário de cadastro para a API
   * @param dados - Dados do formulário de cadastro
   * @returns Promise com a resposta da API
   */
  static async enviarCadastro(
    dados: CadastroRequest
  ): Promise<CadastroResponse> {
    try {
      // Simular validação dos dados antes do envio
      this.validarDados(dados);

      // Preparar os dados para envio
      const dadosParaEnvio = {
        title: `Cadastro - ${dados.nome}`,
        body: JSON.stringify({
          nome: dados.nome,
          email: dados.email,
          cnpj: dados.cnpj,
          nomeOrganizacao: dados.nomeOrganizacao,
          plano: dados.plano,
          timestamp: new Date().toISOString(),
        }),
        userId: 1,
      };

      const apiUrl = getApiUrl();
      console.log("Enviando dados para:", apiUrl);
      console.log("Dados enviados:", dadosParaEnvio);

      // Fazer a requisição POST
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: API_CONFIG.DEFAULT_HEADERS,
        body: JSON.stringify(dadosParaEnvio),
      });

      if (!response.ok) {
        throw new Error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
      }

      const responseData = await response.json();

      // Simular resposta de sucesso com os dados do cadastro
      const cadastroResponse: CadastroResponse = {
        success: true,
        message: "Cadastro realizado com sucesso!",
        data: {
          id: responseData.id.toString(),
          nome: dados.nome,
          email: dados.email,
          cnpj: dados.cnpj,
          nomeOrganizacao: dados.nomeOrganizacao,
          plano: dados.plano,
          createdAt: new Date().toISOString(),
        },
      };

      console.log("Resposta da API:", cadastroResponse);
      return cadastroResponse;
    } catch (error) {
      console.error("Erro ao enviar cadastro:", error);

      const errorResponse: CadastroResponse = {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Erro desconhecido ao processar cadastro",
      };

      return errorResponse;
    }
  }

  /**
   * Valida os dados do formulário antes do envio
   * @param dados - Dados a serem validados
   * @throws Error se os dados forem inválidos
   */
  private static validarDados(dados: CadastroRequest): void {
    if (!dados.nome || dados.nome.trim() === "") {
      throw new Error("Nome é obrigatório");
    }

    if (!dados.email || dados.email.trim() === "") {
      throw new Error("E-mail é obrigatório");
    }

    if (!dados.cnpj || dados.cnpj.trim() === "") {
      throw new Error("CNPJ é obrigatório");
    }

    if (!dados.nomeOrganizacao || dados.nomeOrganizacao.trim() === "") {
      throw new Error("Nome da organização é obrigatório");
    }

    if (!dados.plano || dados.plano.trim() === "") {
      throw new Error("Plano é obrigatório");
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dados.email)) {
      throw new Error("E-mail inválido");
    }

    // Validação básica de CNPJ (apenas formato)
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    if (!cnpjRegex.test(dados.cnpj)) {
      throw new Error("CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX");
    }
  }

  /**
   * Simula um teste de conectividade com a API
   * @returns Promise<boolean> - true se a API estiver acessível
   */
  static async testarConectividade(): Promise<boolean> {
    try {
      const apiUrl = getApiUrl();
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: API_CONFIG.DEFAULT_HEADERS,
      });

      return response.ok;
    } catch (error) {
      console.error("Erro ao testar conectividade:", error);
      return false;
    }
  }
}
