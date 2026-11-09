# API Clínica Médica

## Descrição
API desenvolvida para gerenciar as informações de uma clínica médica, permitindo o cadastro, consulta, atualização e exclusão de pacientes, médicos e consultas.

## Tecnologias utilizadas
- Node.js
- JavaScript
- Express
- MySQL
- MySQL2

## Estrutura do projeto
- `controller/`: controla as requisições e respostas da API.
- `database/`: contém o arquivo de conexão com o banco de dados.
- `docs/testes/`: contém a documentação dos testes.
- `model/`: define as classes do sistema.
- `repository/`: realiza as operações no banco de dados.
- `routes/`: define as rotas da API.
- `app.js`: arquivo principal da aplicação.
- `banco.sql`: script de criação do banco de dados.
- `.env.example`: exemplo das variáveis de ambiente.

## Instalação

1. Clone o repositório:
   ```bash
   git clone LINK_DO_REPOSITORIO
   ```

2. Entre na pasta do projeto:
   ```bash
   cd API_clinica_medica
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente conforme o arquivo `.env.example`.

5. Execute o script `banco.sql` no MySQL Workbench para criar o banco de dados.

## Executar o projeto

```bash
npm start
```

O servidor será iniciado na porta 3001.

## Funcionalidades
- Gerenciamento de pacientes.
- Gerenciamento de médicos.
- Gerenciamento de consultas.

## Autores
- Lucas, Antonella e Amanda