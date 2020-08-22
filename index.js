const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.port || 3001;

//mongoose connection
mongoose.connect('mongodb://localhost/tasks', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
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
  complete: {type: Boolean, default: false},
  modified: {type: Date, default: Date.now}//call Date.now() when no value is passed
});
const Task = mongoose.model('Task', taskSchema);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//endpoints
app.get('/api/getAllTasks', (req, res) => {
  Task.find(function(err, tasks){
    if(err) handleError(err, res);
    res.send(tasks);
  });
});

//CHANGE TO SEARCH WITH QUERY
app.get('/api/getTask/:id', (req, res)=>{
  Task.findOne({_id: req.params.id}, function(err, task){
    if(err) handleError(err, res);
    if(task === null) res.status(400).send(`Could not find task ${req.params.id}`);
    res.send(task);
  });
});

app.post('/api/createTask', (req, res)=>{
  const task = new Task({
    title: req.body.title, 
    details: req.body.details
  });

  task.save(function(err, task){
    if(err) handleError(err, res);
    res.send(task);
  });
});

app.put('/api/updateTask/:id', (req, res)=>{
  const {title, details, complete} = req.body;
  
  Task.findOneAndUpdate({_id: req.params.id},//find 
    {title, details, complete, modified: Date.now()},//set 
    //return updated document, run schema validations
    {new: true, runValidators: true}, 
    function(err, task){
      if(err) handleError(err, res);
      if(task === null) res.status(400).send(`Could not find task ${req.params.id}`);
      res.send(task);
    });
});

app.delete('/api/deleteTask/:id', (req, res)=>{
  Task.findOneAndDelete({_id: req.params.id}, function(err, task){
    if(err) handleError(err, res);
    if(task === null) res.status(400).send(`Could not find task ${req.params.id}`);
    res.send(task);
  });
});

app.listen(PORT, ()=>console.log(`app listening on port ${PORT}`));

function handleError(err, res){
  if(err._message === 'Task validation failed'){
    res.status(400).send(err.message);
  }else if(err._message === 'Validation failed'){
    res.status(400).send(err.message);
  }else{
    res.status(500).send(err.message);
  }
}