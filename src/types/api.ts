// Tipos para as requisições da API

export interface CadastroRequest {
  nome: string;
  email: string;
  cnpj: string;
  nomeOrganizacao: string;
  plano: string;
}

export interface CadastroResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    nome: string;
    email: string;
    cnpj: string;
    nomeOrganizacao: string;
    plano: string;
    createdAt: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
