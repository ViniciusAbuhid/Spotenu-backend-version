<p align="center">
<img src="./assets/Labenu.png" alt="slogan Labenu" width="200px">
</p>

<p align="center">Curso Web Full Stack - 13/01/2020 a 17/07/20020</p>


<h1 align="center">
Projeto semanas n°20: Spotenu
</h1>

<p align="center">O Spotenu é um projeto que visa facilitar o acesso a músicas pelo mundo. Bandas e usuários ouvintes podem se cadastrar e compartilhar suas paixões</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
    <img src="https://img.shields.io/badge/tests-15%20tests%2015%20passed-green">
  </a>
</p>

## Ferramentas :wrench:
Principais ferramentas utilizadas na construção da aplicação

- **Node Js** — Plataforma para construir aplicações web escaláveis
- **Typescript** - TypeScript é um superconjunto de JavaScript que adiciona linguagem a linguagem
- **Express** - Framework para Node.js que permite à aplicação lidar com multiplas e diferentes requisições http à uma URL específica
- **Knex** - Construtor de SQL querys para Node.js, que dentre outras funciolnalidades, propicia a criação de pool de conexao e propagação

## Escopo do projeto :pushpin:
Vamos finalizar o módulo de Backend com chave de ouro fazendo uma API para simular o Spotify. Anteriormente, simplificamos muito a o projeto lidando somente com usuários, músicas e playlists. Dessa vez, tentaremos chegar bem mais próximo do comportamento original. Apresentamos a vocês o Spotenu:

O Spotenu é um projeto que visa facilitar o acesso a músicas pelo mundo. Para isso, vamos dar suporte para dois tipos de usuários: as bandas (ou músicos) e os ouvintes (usuários que consomem as músicas). Além disso, nós vamos montar uma operação com funcionários próprios que precisam gerenciar os dados que circulam no nosso sistema. Eles serão os nossos administradores.

#### Requisitos obrigatórios ####
Você tem que definir os detalhes técnicos dos endpoints: o verbo; os inputs; se serão passados pelo body, path ou outros; os outputs e tudo mais. Serão resumidas algumas informações e dicas nos endpoints abaixo:

- **1. Signup de usuário ouvinte**

    Um usuário ouvinte tem que fornecer o nome, o email, o nickname uma senha. Faça as validações básicas e garanta que a senha tenha, no mínimo, 6 caracteres. **Em todos os cadastros e logins**, vamos usar somente o *access token*

    - Dicas

        Guarde todos os usuários em uma tabela só e crie 4 tipos: banda, ouvinte pagante, ouvinte não pagante e administradores

- **2. Cadastro de administrador**

    Os administradores também se cadastram com nome, email, nickname e senha. Aqui, a senha tem que possuir, no mínimo, 10 carácteres. Somente um usuário administrador pode adicionar outro (ou seja, esse endpoint deve ser autenticado e verificar se o token é de um administrador)

    - Dicas

        Você pode criar um administrador no banco antes para possuir um usuário disponível para logar

- **3. Signup de bandas**

    A banda precisa informar o seu nome, o nickname, o email, a sua descrição e uma senha, com, no mínimo 6 caracteres. Uma banda deve começar com o status de não aprovada (ou seja, não retorne um *access token* nesse endpoint)

    - Dicas

        Represente a aprovação com uma flag booleana no banco 

     

- **4. Ver todas as bandas**

    Esse endpoint deve retornar uma lista com todas as bandas registradas no banco, com as informações: nome, email,  nickname e um booleano indicando se está aprovado ou não. Somente administradores podem ter acesso a essa funcionalidade

- **5. Aprovação de bandas**

    Um administrador pode aprovar uma banda, para que ela, então, consiga se logar. Caso um administrador tente aprovar uma banda que já tinha sido aprovada, um erro deve ser retornado (e, obviamente, se a banda não existir também).

- **6. Login**

    Todos os usuários (ouvintes, administradores ou bandas) devem se logar pelo mesmo endpoint. Eles podem fornecer o email ou o nickname e a senha correta. 

- **7. Adicionar Gênero**

    Somente um administrador pode adicionar gêneros na nossa aplicação. Para isso, deve fornecer um nome. Caso já exista um gênero com esse nome, um erro deve ser retornado

    - Dicas

        Um gênero deve possuir um id no banco de dados, gerado pelo UUID

- **8. Ver gêneros músicias**

    Tanto um administrador como um usuário banda podem ver todos os gêneros músicas. Retorne uma lista com id e nome

- **9. Criação de álbuns**

    Uma banda pode criar um álbum para colocar as suas músicas. Deve fornecer o nome e uma lista de gêneros. Quando o álbum for criado, ele deve ser diretamente atrelado à banda que estiver autenticada na aplicação. Só bandas podem criar álbuns.

    - Dicas
        - Uma banda pode ter mais de um álbum, representando uma relação 1:N (que indicamos com uma chave estrangeira)
        - Um álbum pode ter mais de um gênero, representando uma relação N:M, já que uma banda pode ter mais de um gênero e um gênero pode estar atrelado a mais de uma banda (crie uma tabela de junção para isso)

- **10. Criação de músicas**

    Para criar uma música, um nome e um álbum devem ser informados. Caso o álbum não exista, um erro deve ser informado. Se já existir uma música com esse nome no álbum, outro erro deve ser retornado. 

    - Dicas
        - Uma banda pode ter mais de uma música, ou seja, relação 1:N (representada por uma chave estrangeira)

## Como rodar os testes :microscope:

No terminal, na pasta raíz do projeto, rode o seguinte comando:

```
$ npm test 
```

## Como rodar a aplicação :arrow_forward:

No terminal, clone o repositório onde está o projeto:
```
git clone 
```
Entre na pasta do projeto:
```
cd 'spotenu'
```
Instale as dependências:
```
npm install
```
Execute a aplicação:
```
npm start 
```

... 

## Licença :page_with_curl:

Desenvolvido por [Vinícius Abuhid](https://github.com/ViniciusAbuhid), sob a licençaX11, MIT - [Clique aqui](https://opensource.org/licenses/MIT) para mais detelhes.
