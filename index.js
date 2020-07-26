const express = require('express');
const app = express();
const mongoose = require('mongoose');
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
  done: {type: Boolean, default: false},
  modified: {type: Date, default: Date.now}//call Date.now() when no value is passed
});
const Task = mongoose.model('Task', taskSchema);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//endpoints
app.get('/api/getAllTasks', (req, res) => {
  Task.find(function(err, tasks){
    if(err) res.status(500).send(err.message);
    res.send(tasks);
  });
});

app.get('/api/getTask/:id', (req, res)=>{
  Task.findOne({_id: req.params.id}, function(err, task){
    if(err) res.status(500).send(err.message);
    res.send(task);
  });
});

app.post('/api/createTask', (req, res)=>{
  const task = new Task({
    title: req.body.title, 
    details: req.body.details
  });

  task.save(function(err, task){
    if(err) res.status(500).send(err.message);
    res.send(task);
  });
});

app.put('/api/updateTask/:id', (req, res)=>{
  const {title, details, done} = req.body;
 
  Task.findOneAndUpdate({_id: req.params.id},//find 
    {title, details, done, modified: Date.now()},//set 
    //return updated document, run schema validations
    {new: true, runValidators: true}, 
    function(err, task){
      if(err) res.status(500).send(err.message);
      res.send(task);
    });
});

app.delete('/api/deleteTask/:id', (req, res)=>{
  Task.findOneAndDelete({_id: req.params.id}, function(err, task){
    if(err) res.status(500).send(err.message);
    res.send(task);
  });
});

app.listen(PORT, ()=>console.log(`app listening on port ${PORT}`));