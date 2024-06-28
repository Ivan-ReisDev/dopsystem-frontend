# DOPSystem

Unifique seu capital humano com eficiência e precisão: HRMS, o poder da gestão de pessoas em suas mãos!

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Visão Geral

DOPsystem é um projeto inovador da empresa fictícia no jogo Habbo Hotel, projetado para otimizar a gestão de uma equipe numerosa. Este micro HRMS foi desenvolvido para facilitar a administração eficiente de todos os funcionários da organização.

## Funcionalidades

- **Controle de permissões**: O sistema identifica a patente de cada funcionário para gerar permissões específicas, como promoções, rebaixamentos, advertências, entre outras. Além disso, existem permissões especiais, conhecidas como roles, que conferem acessos adicionais aos usuários designados como Recursos Humanos, Diretor e Admin. Para usuários padrão, prevalecem as permissões básicas correspondentes à sua patente.

- **Histórico do funcionário**: Do primeiro dia até o último momento de sua jornada na empresa, todos os registros do colaborador são mantidos no DOPsystem. Isso permite acessar o histórico completo do funcionário, incluindo passagens anteriores, proporcionando uma visão detalhada de sua trajetória na organização.

- **Operações CRUD**: O sistema oferece diversos CRUDs, permitindo aos usuários criar novos documentos ou publicações, tanto públicas para todos os usuários quanto privadas com personalização de CSS, utilizando um editor de texto integrado.

- **Gerenciamento de Equipes**: O DOPsystem permite a criação dinâmica de equipes por usuários com permissões de Diretor ou Admin. Cada equipe pode estabelecer sua própria hierarquia interna pré-definida, scripts personalizados pelos líderes ou por Diretores/Admins, membros e histórico de atividades.

- **Criação de Conta**: Para criar uma conta, o usuário deve se inscrever dentro do jogo e completar a primeira aula. O instrutor utiliza um script disponibilizado no DOPSystem para registrar a aula no formulário, iniciando assim a jornada do aluno. Ao enviar o formulário, a API realiza uma requisição para uma terceira API (Habbo Hotel) para verificar a existência do usuário postado. Se o usuário existir, a conta é criada com sucesso.

- **Ativação de Conta**: Nosso sistema de ativação de conta utiliza um modelo de autenticação inovador. Ao iniciar o processo de ativação, o sistema (front-end) gera um código que o usuário deve inserir na missão do jogo, juntamente com sua senha. Em seguida, o front-end envia esses dados para a API do sistema, que compara o código gerado com o código presente na missão do usuário no jogo. Se os códigos coincidirem, a condição é validada e a conta do usuário é ativada com sucesso.

- **Registro de Logs**: Cada operação, desde o primeiro login até cada postagem, é registrada para garantir a segurança do usuário e a integridade do sistema.

- **Segurança em Primeiro Lugar**: O DOPSystem utiliza a biblioteca DOMPurify para prevenir ataques XSS e injeções de HTML, garantindo a integridade e segurança dos dados.

Estas são algumas das principais funções, entre várias outras funcionalidades integradas no projeto.

## Instalação

Segue as instruções para instação:

Vale lembrar que como se trata de um projeto React e Express, será necessário que você tenha o node.js instalado.

1 - Clone do projeto:
Em seu terminal use o comando `git clone https://github.com/Ivan-ReisDev/dopsystem-frontend.git` para clonar o repositório.

2 - Instalando pacotes:
Você deverá abrir a pasta do projeto usando o comando: `cd dopsystem-frontend`.
Após você deverá instalar os pacotes usando o comando: `npm install` (Aqui usamos o npm como gerenciador de pacotes, porém, você pode usar o de sua preferência);

3 - Inicialização do projeto: 
Em seu terminal use o comando `npm run dev` para iniciar o projeto.

Este projeto é dependente de uma API. Recomendamos o uso da API do próprio projeto para testes:

## Repositório da API

Para mais detalhes sobre a API utilizada neste projeto, visite o repositório:

- [Repositório da API](https://github.com/Ivan-ReisDev/dopsystem-backend)

## Contribuição

O projeto não teve contribuição externa no código.

## Licença

Este projeto é disponibilizado sob os termos da Licença MIT, exceto quando explicitamente declarado de outra forma. Você é livre para utilizar, modificar e distribuir o código, desde que os créditos no rodapé sejam mantidos. Qualquer uso indevido do código é de inteira responsabilidade do usuário.

Para mais detalhes, consulte o arquivo [LICENSE](LICENSE).

## Interface


Página de login:
![Login](https://raw.githubusercontent.com/Ivan-ReisDev/dopsystem-frontend/main/public/login.jpg)

Página Home:
![Home](https://raw.githubusercontent.com/Ivan-ReisDev/dopsystem-frontend/main/public/home.jpg)

Página de Equipes:
![Equipe](https://github.com/Ivan-ReisDev/dopsystem-frontend/blob/main/public/team.jpg)

Página de Formulário:
![Formulários](https://raw.githubusercontent.com/Ivan-ReisDev/dopsystem-frontend/main/public/form.jpg)



