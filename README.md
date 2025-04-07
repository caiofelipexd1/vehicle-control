
![Logo](./frontend/public/images/logo.png)

## 📂 Vehicle Control

Aplicativo desenvolvido para fins de estudos, com a proposta de registrar entrada e saída de veículos.











## Funcionalidades

- Multiplataforma
- Modulo de Administrador e Usuário
- Possibilidade de registrar imagens do porta-malas / carroceria
- Controle de locais
- Cadastrar diferentes tipos de veículos


## Demonstração

https://demo-app-01.caiofelipexd.dev/


## Implantação

Para fazer a implementação desse projeto siga as seguintes instruções.

* **Pré-requisitos**: Git, Docker (docker compose), NPM, yarn

* Clone o projeto

```bash
  git clone https://gitlab.com/caiofelipexd1/vehicle-control
```

* Entre no diretório do projeto

```bash
  cd vehicle-control
```

* Renomeie o arquivo .env-example (localizado na pasta frontend) para .env e altere o IP ou URL do backend no arquivo. **Importante** - Caso esteja rodando local, informe o IP da sua maquina.

```bash
  sudo cp frontend/.env-example frontend/.env && nano frontend/.env
```

* Vá até a pasta do frontend, instale as dependência e compile o porjeto.

```bash
  cd frontend/ && yarn install && yarn build
```

* Volte até a pasta raiz do projeto e suba os containers (nginx, mariadb, golang).

```bash
  cd .. && sudo docker compose up
```

* Abra seu navegador com o IP/URL da sua máquina/servidor na porta 7000 (caso não tenha realizado nenhuma alteração no docker-compose). ex: http://localhost:7000


## Stack utilizada

**Front-end:** React (https://react.dev/), Material UI (https://mui.com/)

**Back-end:** Golang (https://go.dev/), Fiber (https://docs.gofiber.io/)


