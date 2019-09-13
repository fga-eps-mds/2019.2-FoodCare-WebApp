# FoodCare WebApp

[![Maintainability](https://api.codeclimate.com/v1/badges/b9c5cafaeb50c06656d7/maintainability)](https://codeclimate.com/github/fga-eps-mds/2019.2-FoodCare-WebApp/maintainability)

[![Build Status](https://travis-ci.org/fga-eps-mds/2019.2-FoodCare-WebApp.svg?branch=master)](https://travis-ci.org/fga-eps-mds/2019.2-FoodCare-WebApp)

[Link](https://github.com/fga-eps-mds/2019.2-FoodCare) do repositório contendo o backend.

## Configuração do ambiente
### Instalação

É utilizado o docker como forma de configuração de ambiente. Para utilizar o docker basta executar a seguinte linha de código:

Faça o download do Docker CE no [site oficial](https://docs.docker.com/engine/installation/).
Faça o download do Docker Compose no [site oficial](https://docs.docker.com/compose/install/).

Para construir novamente o container caso tenha feito alguma alteração no código utilize o seguinte comando

```
$ [sudo] docker-compose build
```

### Subindo o servidor

Para subir a aplicação no endereço `0.0.0.0` e na porta 4200 utilize o seguinte comando:

```
$ [sudo] docker-compose up
```

A aplicação estará disponível em `http://localhost:4200`.
