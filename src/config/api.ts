// Configurações da API
export const API_CONFIG = {
  // URL de teste para desenvolvimento
  CADASTRO_URL: "https://jsonplaceholder.typicode.com/posts",

  // URLs para diferentes ambientes
  ENDPOINTS: {
    DEVELOPMENT: "https://jsonplaceholder.typicode.com/posts",
    STAGING: "https://api-staging.exemplo.com/cadastro",
    PRODUCTION: "https://api.exemplo.com/cadastro",
  },

  // Configurações de timeout
  TIMEOUT: 10000, // 10 segundos

  // Headers padrão
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
};

// Função para obter a URL baseada no ambiente
export const getApiUrl = (): string => {
  const env = process.env.NODE_ENV || "development";

  switch (env) {
    case "production":
      return API_CONFIG.ENDPOINTS.PRODUCTION;
    case "test":
      return API_CONFIG.ENDPOINTS.STAGING;
    default:
      return API_CONFIG.ENDPOINTS.DEVELOPMENT;
  }
};
