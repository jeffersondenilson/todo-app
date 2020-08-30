# To Do App
[Português do Brasil](README.md)

To Do App with React, Material-UI, Express and MongoDB

[https://todo-app-94465.herokuapp.com/](https://todo-app-94465.herokuapp.com/)

## Installation
```bash
git clone https://github.com/jeffersondenilson/todo-app.git
cd todo-app
# You may use yarn instead of npm
npm install
cd client
npm install
```

## Usage
Create the .env file and fill the MONGO_URI value (see [.env.example](.env.example)) or local mongoDB will be used by default.

* **Start server (with nodemon):**
```bash
npm run server
```
* **Start client:**
```bash
npm run client
```

* **Client and server (with concurrently):**
```bash
npm run dev
```

* **Generate production build:**
```bash
cd client
npm run build
```

* **Run production locally:**
```bash
npm run start
```
or with heroku cli:
```bash
heroku local web
```

* **Deploy to Heroku:**
```bash
heroku create
git push heroku master
```