const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.port || 3000;

//mongoose connection
mongoose.connect('mongodb://localhost/tasks', {useNewUrlParser: true, useUnifiedTopology: true})
	//handle error on first connection
	.catch(err=>console.log(err));
const db = mongoose.connection;
//handle error after first connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>console.log('mongoose connected'));

//schema and model
const taskSchema = new mongoose.Schema({
  title: {type: String, required: true},
  details: String,
  done: {type: Boolean, default: false}
});
const Task = mongoose.model('Task', taskSchema);

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//endpoints
app.get('/api/getAllTasks', (req, res) => {
  Task.find(function(err, tasks){
    if(err) res.status(500).send(err);
    res.json(tasks);
  });
});

app.listen(PORT, ()=> {
  console.log(`app listening on port ${PORT}`);
});