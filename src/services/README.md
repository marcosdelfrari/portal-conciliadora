# Serviço de Cadastro

Este serviço gerencia o envio de dados do formulário de cadastro para a API.

## Estrutura

```
src/
├── services/
│   └── cadastroService.ts    # Serviço principal
├── types/
│   └── api.ts               # Tipos TypeScript
└── config/
    └── api.ts               # Configurações da API
```

## Como usar

### 1. Importar o serviço

```typescript
import { CadastroService } from "@/services/cadastroService";
import { CadastroRequest } from "@/types/api";
```

### 2. Preparar os dados

```typescript
const dados: CadastroRequest = {
  nome: "João Silva",
  email: "joao@exemplo.com",
  cnpj: "12.345.678/0001-90",
  nomeOrganizacao: "Empresa Exemplo",
  plano: "premium",
};
```

### 3. Enviar os dados

```typescript
const response = await CadastroService.enviarCadastro(dados);

if (response.success) {
  console.log("Sucesso:", response.message);
  console.log("Dados:", response.data);
} else {
  console.error("Erro:", response.message);
}
```

## Funcionalidades

### Validação Automática

- Nome obrigatório
- E-mail válido
- CNPJ no formato correto
- Nome da organização obrigatório
- Plano obrigatório

### Tratamento de Erros

- Validação de dados antes do envio
- Tratamento de erros de rede
- Mensagens de erro personalizadas

### Configuração Flexível

- URLs diferentes para cada ambiente
- Headers configuráveis
- Timeout configurável

## Configuração da API

Para alterar a URL da API, edite o arquivo `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  ENDPOINTS: {
    DEVELOPMENT: "https://sua-api-dev.com/cadastro",
    STAGING: "https://sua-api-staging.com/cadastro",
    PRODUCTION: "https://sua-api.com/cadastro",
  },
};
```

## Teste de Conectividade

```typescript
const isConnected = await CadastroService.testarConectividade();
console.log("API acessível:", isConnected);
```

## Exemplo Completo

```typescript
import { CadastroService } from "@/services/cadastroService";

const handleSubmit = async (formData) => {
  try {
    const response = await CadastroService.enviarCadastro(formData);

    if (response.success) {
      alert("Cadastro realizado com sucesso!");
      // Limpar formulário ou redirecionar
    } else {
      alert(`Erro: ${response.message}`);
    }
  } catch (error) {
    alert("Erro inesperado. Tente novamente.");
  }
};
```
