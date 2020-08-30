# To Do App
App de tarefas com React, Material-UI, Express e MongoDB

[https://todo-app-94465.herokuapp.com/](https://todo-app-94465.herokuapp.com/)

## Instalação
```bash
git clone https://github.com/jeffersondenilson/todo-app.git
cd todo-app
# Você talvez use yarn ao invés de npm
npm install
cd client
npm install
```

## Uso
Crie o arquivo .env e preencha o valor de MONGO_URI (ver [.env.example](.env.example)) ou mongoDB local será usado por padrão.

* **Iniciar servidor (com nodemon):**
```bash
npm run server
```
* **Iniciar cliente:**
```bash
npm run client
```

* **Cliente e servidor (com concurrently):**
```bash
npm run dev
```

* **Gerar build de produção:**
```bash
cd client
npm run build
```

* **Rodar versão de produção localmente:**
```bash
npm run start
```
ou com heroku cli:
```bash
heroku local web
```

* **Deploy no Heroku:**
```bash
heroku create
git push heroku master
```