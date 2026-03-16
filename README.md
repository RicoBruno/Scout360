# Sistema de Controle de Performance de Jogadores de Futebol

## Sistema completo para monitoramento e análise da performance de jogadores de futebol, desenvolvido com Angular (frontend) e Spring Boot (backend).

## Tecnologias Utilizadas

## Backend
- **Spring Boot 3.2.0** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **Spring Web** - API REST
- **H2 Database** - Banco de dados em memória
- **Maven** - Gerenciamento de dependências

## Frontend
- **Angular 17** - Framework frontend
- **TypeScript** - Linguagem de programação
- **Chart.js** - Biblioteca de gráficos
- **SCSS** - Pré-processador CSS
- **Angular Reactive Forms** - Formulários reativos

## Funcionalidades

## Dashboard
- Estatísticas gerais (total de jogadores, sessões dos últimos 7 dias)
- Gráfico de evolução da distância percorrida
- Lista das últimas sessões com indicadores de intensidade

## Gestão de Jogadores
- Listagem com filtros por nome e posição
- Cadastro e edição de jogadores
- Validação de formulários
- Exclusão de jogadores

## Controle de Performance
- Registro de sessões de treino e jogos
- Cálculos automáticos:
  - Distância por minuto
  - Carga de trabalho
  - Sprints por minuto
  - Classificação de intensidade

## Estrutura do Projeto

```
Projeto TCC/
├── backend/                    # Spring Boot API
│   ├── src/main/java/
│   │   └── com/futebol/performance/
│   │       ├── model/          # Entidades JPA
│   │       ├── repository/     # Repositórios
│   │       ├── service/        # Serviços de negócio
│   │       └── controller/     # Controllers REST
│   └── src/main/resources/
│       ├── application.properties
│       └── data.sql           # Dados de exemplo
└── frontend/                  # Angular App
    └── performance-frontend/
        └── src/app/
            ├── components/    # Componentes Angular
            ├── services/      # Serviços HTTP
            └── models/        # Interfaces TypeScript
```

## Projeto acadêmico
