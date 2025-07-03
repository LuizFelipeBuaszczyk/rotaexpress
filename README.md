# Como Rodar o Projeto localmente?

## 1. Clone este repositório
``` 
git clone https://github.com/uri-erechim/teams-whiletrue.git
```

## 2. Configure as variáveis de ambiente
Busque por arquivos **.env.example** e crie um arquivo .env e preencha com suas credenciais seguindo o padrão do example.

## 3. Subindo os containers Docker

### 3.1 Banco de Dados
Caso deseja utilizar um banco de dados em container, tem uma imagem disponível no repositório.

```
cd teams-whiletrue/backend/bd

docker-compose up -d
```

### 3.2 Subindo a aplicação
```
cd teams-whiletrue/ 

docker-compose up -d
```

---

O projeto roda na porta 80, então se acessar localhost no navegador sem especificar a porta o projeto aparecerá.