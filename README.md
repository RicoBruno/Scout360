# Sistema de Controle de Performance de Jogadores de Futebol

Sistema completo para monitoramento e análise da performance de jogadores de futebol, desenvolvido com Angular (frontend) e Spring Boot (backend).

Tecnologias Utilizadas

### Backend
- **Spring Boot 3.2.0** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **Spring Web** - API REST
- **H2 Database** - Banco de dados em memória
- **Maven** - Gerenciamento de dependências

### Frontend
- **Angular 17** - Framework frontend
- **TypeScript** - Linguagem de programação
- **Chart.js** - Biblioteca de gráficos
- **SCSS** - Pré-processador CSS
- **Angular Reactive Forms** - Formulários reativos

## 📊 Funcionalidades

### Dashboard
- Estatísticas gerais (total de jogadores, sessões dos últimos 7 dias)
- Gráfico de evolução da distância percorrida
- Lista das últimas sessões com indicadores de intensidade

### Gestão de Jogadores
- Listagem com filtros por nome e posição
- Cadastro e edição de jogadores
- Validação de formulários
- Exclusão de jogadores

### Controle de Performance
- Registro de sessões de treino e jogos
- Cálculos automáticos:
  - Distância por minuto
  - Carga de trabalho
  - Sprints por minuto
  - Classificação de intensidade

## 🏗️ Estrutura do Projeto

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

## 🚀 Como Executar

### Pré-requisitos
- Java 17+
- Node.js 18+
- Maven 3.6+
- Angular CLI

### Backend (Spring Boot)

1. Navegue até o diretório do backend:
```bash
cd backend
```

2. Execute a aplicação:
```bash
mvn spring-boot:run
```

A API estará disponível em: `http://localhost:8080`

### Frontend (Angular)

1. Navegue até o diretório do frontend:
```bash
cd frontend/performance-frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
ng serve
```

A aplicação estará disponível em: `http://localhost:4200`

## 📡 Endpoints da API

### Jogadores
- `GET /api/jogadores` - Lista todos os jogadores
- `GET /api/jogadores/{id}` - Busca jogador por ID
- `POST /api/jogadores` - Cria novo jogador
- `PUT /api/jogadores/{id}` - Atualiza jogador
- `DELETE /api/jogadores/{id}` - Remove jogador

### Sessões de Performance
- `GET /api/sessoes` - Lista todas as sessões
- `GET /api/sessoes/{id}` - Busca sessão por ID
- `GET /api/sessoes/jogador/{jogadorId}` - Sessões de um jogador
- `POST /api/sessoes` - Cria nova sessão
- `PUT /api/sessoes/{id}` - Atualiza sessão
- `DELETE /api/sessoes/{id}` - Remove sessão

### Dashboard
- `GET /api/dashboard/stats` - Estatísticas do dashboard

## 🧪 Testes

### Backend
```bash
cd backend
mvn test
```

### Frontend
```bash
cd frontend/performance-frontend
ng test
```

## 📊 Dados de Exemplo

O sistema vem com dados pré-carregados:
- 5 jogadores de exemplo
- 8 sessões de performance
- Diferentes posições e tipos de sessão (treino/jogo)

## 🎯 Cálculos de Performance

### Distância por Minuto
```
Fórmula: distanciaPercorridaMetros / duracaoMinutos
```

### Carga de Trabalho
```
Fórmula: duracaoMinutos * batimentosMedios
Classificação:
- Baixa: < 5000
- Média: 5000 a 10000
- Alta: > 10000
```

### Sprints por Minuto
```
Fórmula: numeroSprints / duracaoMinutos
```

## 🔧 Configurações

### CORS
O backend está configurado para aceitar requisições do frontend Angular (`http://localhost:4200`).

### Banco de Dados
Utilizando H2 em memória para desenvolvimento. Console disponível em: `http://localhost:8080/h2-console`
- URL: `jdbc:h2:mem:testdb`
- User: `sa`
- Password: `password`

## 📱 Responsividade

O frontend é totalmente responsivo, adaptando-se a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Próximos Passos

- Implementar autenticação JWT
- Adicionar mais tipos de gráficos
- Exportação de relatórios em PDF
- Notificações em tempo real
- Integração com dispositivos wearables

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos (TCC).
