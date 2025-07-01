# Flask API with Swagger Documentation

Uma aplicação Flask bem estruturada com documentação automática usando Swagger/OpenAPI.

## Estrutura do Projeto

```
src/
├── app/
│   ├── config/          # Configurações da aplicação
│   ├── models/          # Modelos de dados
│   ├── routes/          # Rotas da API organizadas por namespace
│   ├── services/        # Lógica de negócio
│   └── utils/           # Utilitários e helpers
```

## Funcionalidades

- ✅ Estrutura organizacional modular
- ✅ Documentação automática com Swagger/OpenAPI
- ✅ Validação de dados
- ✅ Upload de arquivos
- ✅ Health check endpoint
- ✅ CORS configurado
- ✅ Logging estruturado

## Como executar

### Com uv (recomendado)

```bash
# Instalar dependências
uv sync

# Executar a aplicação
uv run python src/main.py
```

### Acessar a documentação

- API: http://localhost:5000/api/
- Documentação Swagger: http://localhost:5000/docs/

## Endpoints disponíveis

- `GET /api/health/ping` - Health check
- `POST /api/upload/file` - Upload de arquivo
- `GET /docs/` - Documentação Swagger/OpenAPI

## Configuração

As configurações estão em `src/app/config/settings.py` e podem ser ajustadas via variáveis de ambiente.

## Desenvolvimento

```bash
# Instalar dependências de desenvolvimento
uv sync --dev

# Formatar código
uv run black src/

# Verificar código
uv run flake8 src/
```
