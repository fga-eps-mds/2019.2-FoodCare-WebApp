<p align="center">
    <img src="https://raw.githubusercontent.com/fga-eps-mds/2019.2-FoodCare/docs/docs/assets/images/id-visual/logo-green.png" alt="Logo">
</p>

<h1 align="center">FoodCare WebApp</h1>

<p align="center">
    <a href="https://travis-ci.org/fga-eps-mds/2019.2-FoodCare-WebApp" alt="Status da build" >
        <img src="https://travis-ci.org/fga-eps-mds/2019.2-FoodCare-WebApp.svg?branch=master" />
    </a>
    <a href="https://codeclimate.com/github/fga-eps-mds/2019.2-FoodCare-WebApp/maintainability" alt="Manutenibilidade" >
        <img src="https://api.codeclimate.com/v1/badges/b9c5cafaeb50c06656d7/maintainability" />
    </a>
    <a href="http://isitmaintained.com/project/fga-eps-mds/2019.2-FoodCare-WebApp" alt="Porcentagem de issues abertas" >
        <img src="http://isitmaintained.com/badge/open/fga-eps-mds/2019.2-FoodCare-WebApp.svg" />
    </a>
    <a href="https://isitmaintained.com/project/fga-eps-mds/2019.2-FoodCare-WebApp" alt="Tempo médio para fechar uma issue" >
        <img src="http://isitmaintained.com/badge/resolution/fga-eps-mds/2019.2-FoodCare-WebApp.svg" />
    </a>
    <a href="https://www.gnu.org/licenses/gpl-3.0" alt="Licença: GPL v3" >
        <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" />
    </a>
    <a href='https://coveralls.io/github/fga-eps-mds/2019.2-FoodCare-WebApp?branch=master'><img src='https://coveralls.io/repos/github/fga-eps-mds/2019.2-FoodCare-WebApp/badge.svg?branch=master' alt='Coverage Status' /></a>
</p>

<p align="center">
    <a href="https://github.com/fga-eps-mds/2019.2-FoodCare"><strong>Acesse FoodCare API</strong></a>
</p>

<p align="center">
    <a href="https://fga-eps-mds.github.io/2019.2-FoodCare"><strong>Acesse FoodCare Docs</strong></a>
</p>

## Sobre o projeto

**FoodCare** é um sistema online que gerencia o encontro entre doadores de alimento, com pessoas e ONGs que precisam desse alimento. Nosso propósito é evitar que pessoas, ou empresas, joguem fora alimentos que ainda são próprios para consumo, conectando-as com quem precisa desses alimentos, ajudando a combater a fome no Brasil.

## Funcionalidades principais

- Cadastro de Doadores
- Gerenciamento de Eventos
- Mapa e Lista de Eventos
- Notificação de Eventos

## Tecnologias utilizadas

**Desenvolvido com** [Angular](https://angular.io/)  
**Conteinerizado com** [Docker](https://www.docker.com/)  

## Instalação

É utilizado o docker como forma de configuração de ambiente. Para utilizar o docker basta executar a seguinte linha de código:

Faça o download do Docker CE no [site oficial](https://docs.docker.com/engine/installation/).
Faça o download do Docker Compose no [site oficial](https://docs.docker.com/compose/install/).

Para construir novamente o container caso tenha feito alguma alteração no código utilize o seguinte comando:

```bash
[sudo] docker-compose build
```

## Execução

Para subir a aplicação no endereço `0.0.0.0` e na porta 4200 utilize o seguinte comando:

```bash
[sudo] docker-compose up
```

A aplicação estará disponível em `http://localhost:4200`.

## Ambientes

### Homologação

`https://foodcarehomol.netlify.com/`

### Produção

`https://foodcare.netlify.com/`
<!-- ## Testes

Descreva e mostre como rodar testes. -->

<!-- ## Contribuição

Siga o [guia de contribuição](???) para entender os passos e regras para adicionar sua contribuição ao projeto. -->

<!-- ## Estilo do Código

If you're using any code style like xo, standard etc. That will help others while contributing to your project. Ex. -

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard) -->

## Licença

GPLv3 © FoodCare. Acesse a [licença](LICENSE) para mais detalhes.
