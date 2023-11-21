# Blogs API

API RESTful Node.js com sequelize utilizando a arquitetura em camadas e um banco de dados para a produção de conteúdo para um blog. 

## Instalação

🐳 Iniciando a aplicação no Docker Compose

> Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**
  

>  Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > Use o comando `docker exec -it blogs_api bash`

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)

#

🖥️ Iniciando a aplicação localmente

 > Instale as dependências [**Caso existam**] com `npm install`
  
  - Lembre-se de usar o prefixo `env $(cat .env)` ao rodar os comandos localmente para carregar as variáveis de ambiente do arquivo `.env`. Por exemplo:
  
    ```bash
    env $(cat .env) npm run dev
    ```

  -  Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  -  O avaliador espera que a versão do `node` utilizada seja a 16.

<details>
  <summary  id="diagrama">
    <strong>🎲 Diagrama ER e Entidades</strong>
  </summary>

#### Formato das entidades

  ![DER](./public/der.png)

  ---

 - #### Scripts prontos

    ---

    - Cria o banco e gera as tabelas:
    ```json
    "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
    ```

    - Insere dados/Popula a tabela:
    ```json
    "seed": "npx sequelize-cli db:seed:all"
    ```
</details>

## Principais Funcionalidades

### Login

  - Endpoint: `POST /login`
  - Retorna um token de acesso caso o usuário já esteja cadastrado no banco de dados.
  - O corpo da requisição deve conter o email e o password do usuário cadastrado seguindo o formato abaixo:

     ```json
    {
      "email": "lewishamilton@gmail.com",
      "password": "123456"
    }
    ```
  - Efetuando o login corretamente retornará um token neste formato:
  
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGlzcGxheU5hbWUiOiJMZXdpcyBIYW1pbHRvbiIsImVtYWlsIjoibGV3aXNoYW1pbHRvbkBnbWFpbC5jb20iLCJpYXQiOjE2OTk2MzY2NDR9.FagS0qw9Nv8uUQDaId7AWoCGIy8QAEVJxy2ZN_ZDWUM"
    }
    ```

    > Aviso: Para utilizar o restante das funcionalidades (exeto na criação de um novo usuário), é necessário utilizar esse token de acesso no header da requisição: </br>
     ![DER](./public/header-auth.png)

### User


- **Listar usuários:**

  - Endpoint: `GET /user`

- **Encontrar o usuário pelo Id:**
  - Endpoint: `GET /user/:id`

- **Criar Usuário:**
  - Endpoint: `POST /user`
  - O corpo da requisição deve estar neste formato abaixo:
  
     ```json
     {
     "displayName": "Brett Wiltshire",
     "email": "brett@email.com",
     "password": "123456",
     "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
    ```

- **Remover usuário:**
  - Endpoint: `DELETE user/me`
  - Remove os dados do usuário do banco de dados, apenas se pertencer ao usuário logado.

### Posts

- **Listar Posts:**
  - Endpoint: `GET /post`
  
- **Encontrar Post por ID:**
  - Endpoint: `GET /post/:id`
  - Retorna as informações detalhadas de um post específico com base no ID fornecido.

- **Criar Novo Post:**
  - Endpoint: `POST /post`
  - Permite a criação de um novo post. O corpo da requisição deve estar conforme o exemplo abaixo:

    ```json
    {
      "title": "Hello World",
      "content": "....",
      "categoryIds": [2,1]
    }
    ```

- **Pesquisar Posts:**
  - Endpoint: `GET /post/search?q=:searchTerm`
  - Mostra blogs posts que contenham em seu título ou conteúdo o termo passado na URL.

   **Update Posts:**
  - Endpoint: `PUT /post/:id`
  - Atualiza o post solicitado, apenas se o post pertencer ao usuário logado.
  - O corpo da requisição precisa estar neste formato abaixo:

     ```json
    {
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key"
    }
    ```
- **Deletar Post:**
  - Endpoint: `DELETE /post/:id`
  - Deleta um blog post baseado no id do banco de dados se ele existir, e se pertencer ao usuário logado.

### Categories

- **Listar Categorias:**
  - Endpoint: `GET /categories`
  
- **Criar Categoria:**
  - Endpoint: `POST /categories`
  - Para criar uma nova categoria o corpo da requisição precisa estar neste formato abaixo:

     ```json
    {
       "name": "Typescript"
    }
    ```

> <strong>OBS:</strong> Na raiz do projeto, você encontrará um arquivo Thunder Client (thunder-collection-blogs-api.json) que pode ser importado no Thunder Client para facilitar as requisições.

## Contribuição

Este projeto está aberto para contribuições. Se você deseja contribuir, siga estas etapas:

1. Faça um fork do projeto
2. Crie uma nova branch (`git checkout -b feature/sua-feature`)
3. Faça commit das alterações (`git commit -m 'Adicione sua feature'`)
4. Faça push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

## Contato

Se você deseja entrar em contato comigo, sinta-se à vontade para enviar um e-mail para [jonataslaguna.js@email.com](mailto:jonataslaguna.js@email.com).

